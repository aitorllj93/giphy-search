import { ComponentFixture } from '@angular/core/testing';
import { byText, createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { NgxsModule, Store } from '@ngxs/store';
import { MockComponent } from 'ng-mocks';
import { of } from 'rxjs';
import { GiphyImagesGridPaginationComponent } from '../../components/giphy-images-grid-pagination/giphy-images-grid-pagination.component';
import { GiphyImagesGridComponent } from '../../components/giphy-images-grid/giphy-images-grid.component';
import { GiphyImagesSearchbarComponent } from '../../components/giphy-images-searchbar/giphy-images-searchbar.component';
import { SearchGiphyImages } from '../../state/search-giphy-images.actions';
import { SearchGiphyImagesStateModel, SearchGiphyImagesStateModelState } from '../../state/search-giphy-images.state-model';
import { SearchGiphyImagesPage } from './search-giphy-images.page';

describe('SearchGiphyImagesPage', () => {
  let component: SearchGiphyImagesPage;
  let spectator: Spectator<SearchGiphyImagesPage>;
  let fixture: ComponentFixture<SearchGiphyImagesPage>;
  let store: Store;

  const createComponent = createComponentFactory({
    component: SearchGiphyImagesPage,
    imports: [NgxsModule.forRoot([])],
    declarations: [
      MockComponent(GiphyImagesSearchbarComponent),
      MockComponent(GiphyImagesGridComponent),
      MockComponent(GiphyImagesGridPaginationComponent),
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
    fixture = spectator.fixture;
    store = spectator.inject(Store);
    store.dispatch = jest.fn();
  });

  describe('Given an Idle state', () => {
    const state: SearchGiphyImagesStateModel = {
      state: SearchGiphyImagesStateModelState.Idle,
      searchParams: {
        limit: 9,
        offset: 0,
        tags: [],
      },
      searchResult: {
        gifs: [],
        totalCount: 0,
        error: undefined,
      },
    };

    beforeEach(() => {
      Object.defineProperty(component, 'state$', { writable: true, value: of(state.state) });
      Object.defineProperty(component, 'params$', { writable: true, value: of(state.searchParams) });
      Object.defineProperty(component, 'result$', { writable: true, value: of(state.searchResult) });
      fixture.detectChanges();
    });

    it('Then it should render idle components', () => {
      expect(component).toBeTruthy();

      expect(spectator.query(GiphyImagesSearchbarComponent)).toExist();
      expect(spectator.query(byText('Insert tags and click on search to start'))).toExist();
    });
  });

  describe('Given a Searching state', () => {
    const state: SearchGiphyImagesStateModel = {
      state: SearchGiphyImagesStateModelState.Searching,
      searchParams: {
        limit: 9,
        offset: 0,
        tags: ['test', 'test2'],
      },
      searchResult: {
        gifs: [],
        totalCount: 0,
        error: new Error('Error fetching the api'),
      },
    };

    beforeEach(() => {
      Object.defineProperty(component, 'state$', { writable: true, value: of(state.state) });
      Object.defineProperty(component, 'params$', { writable: true, value: of(state.searchParams) });
      Object.defineProperty(component, 'result$', { writable: true, value: of(state.searchResult) });
      fixture.detectChanges();
    });

    it('Then it should render searching components', () => {
      expect(component).toBeTruthy();

      expect(spectator.query(GiphyImagesSearchbarComponent)).toExist();
      expect(spectator.query(byText(`Searching for: ${state.searchParams?.tags?.join(',')}`, { trim: true }))).toExist();
    });
  });

  describe('Given a SearchSucceeded state', () => {
    const state: SearchGiphyImagesStateModel = {
      state: SearchGiphyImagesStateModelState.SearchSucceeded,
      searchParams: {
        limit: 9,
        offset: 0,
        tags: [],
      },
      searchResult: {
        gifs: [],
        totalCount: 0,
        error: undefined,
      },
    };

    beforeEach(() => {
      Object.defineProperty(component, 'state$', { writable: true, value: of(state.state) });
      Object.defineProperty(component, 'params$', { writable: true, value: of(state.searchParams) });
      Object.defineProperty(component, 'result$', { writable: true, value: of(state.searchResult) });
      fixture.detectChanges();
    });

    it('Then it should render search succeeded components', () => {
      expect(component).toBeTruthy();

      expect(spectator.query(GiphyImagesSearchbarComponent)).toExist();
      expect(spectator.query(GiphyImagesGridComponent)).toExist();
      expect(spectator.queryAll(GiphyImagesGridPaginationComponent)).toHaveLength(2);
    });
  });

  describe('Given a SearchFailed state', () => {
    const state: SearchGiphyImagesStateModel = {
      state: SearchGiphyImagesStateModelState.SearchFailed,
      searchParams: {
        limit: 9,
        offset: 0,
        tags: [],
      },
      searchResult: {
        gifs: [],
        totalCount: 0,
        error: new Error('Error fetching the api'),
      },
    };

    beforeEach(() => {
      Object.defineProperty(component, 'state$', { writable: true, value: of(state.state) });
      Object.defineProperty(component, 'params$', { writable: true, value: of(state.searchParams) });
      Object.defineProperty(component, 'result$', { writable: true, value: of(state.searchResult) });
      fixture.detectChanges();
    });

    it('Then it should render search succeeded components', () => {
      expect(component).toBeTruthy();

      expect(spectator.query(GiphyImagesSearchbarComponent)).toExist();
      expect(spectator.query(byText(`Search failed, please try again Reason: ${state.searchResult.error}`, { trim: true }))).toExist();
    });
  });

  describe('Given a onSearchSubmit event', () => {
    const event = {
      payload: {
        tags: ['test', 'test2'],
      },
    };

    beforeEach(() => {
      component.onSearchSubmit(event.payload);
    });

    it('Then it should call store dispatch', () => {
      expect(store.dispatch).toHaveBeenCalledWith(new SearchGiphyImages.SearchSubmitted(event.payload.tags));
    });
  });

  describe('Given a onPaginationNextButtonClick event', () => {
    beforeEach(() => {
      component.onPaginationNextButtonClick();
    });

    it('Then it should call store dispatch', () => {
      expect(store.dispatch).toHaveBeenCalledWith(new SearchGiphyImages.PaginationNextButtonClicked());
    });
  });

  describe('Given a onPaginationPreviousButtonClick event', () => {
    beforeEach(() => {
      component.onPaginationPreviousButtonClick();
    });

    it('Then it should call store dispatch', () => {
      expect(store.dispatch).toHaveBeenCalledWith(new SearchGiphyImages.PaginationPreviousButtonClicked());
    });
  });
});
