import { ComponentFixture } from '@angular/core/testing';
import { byText, createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { SearchGiphyImagesStateModel, SearchGiphyImagesStateModelState } from '../../state/search-giphy-images.state-model';
import { GiphyImagesGridPaginationComponent } from './giphy-images-grid-pagination.component';

describe('GiphyImagesGridPaginationComponent', () => {
  let component: GiphyImagesGridPaginationComponent;
  let spectator: Spectator<GiphyImagesGridPaginationComponent>;
  let fixture: ComponentFixture<GiphyImagesGridPaginationComponent>;

  const createComponent = createComponentFactory({
    component: GiphyImagesGridPaginationComponent,
    declarations: [],
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
    fixture = spectator.fixture;
  });

  describe('Given a state with first page and one page results', () => {
    const state: SearchGiphyImagesStateModel = {
      state: SearchGiphyImagesStateModelState.SearchSucceeded,
      searchParams: {
        limit: 9,
        offset: 0,
        tags: ['test', 'test2'],
      },
      searchResult: {
        gifs: [],
        totalCount: 7,
        error: undefined,
      },
    };

    beforeEach(() => {
      component.params = state.searchParams;
      component.result = state.searchResult;
      fixture.detectChanges();
    });

    it('Then it should render corresponding components', () => {
      expect(spectator.query(byText(`Showing 0 - 9 of 7`, { trim: true }))).toExist();
      expect(spectator.query(byText('Previous'))).not.toExist();
      expect(spectator.query(byText('Next'))).not.toExist();
    });
  });

  describe('Given a state with first page and many page results', () => {
    const state: SearchGiphyImagesStateModel = {
      state: SearchGiphyImagesStateModelState.SearchSucceeded,
      searchParams: {
        limit: 9,
        offset: 0,
        tags: ['test', 'test2'],
      },
      searchResult: {
        gifs: [],
        totalCount: 100,
        error: undefined,
      },
    };

    beforeEach(() => {
      component.params = state.searchParams;
      component.result = state.searchResult;
      fixture.detectChanges();
    });

    it('Then it should render corresponding components', () => {
      expect(spectator.query(byText(`Showing 0 - 9 of 100`, { trim: true }))).toExist();
      expect(spectator.query(byText('Previous'))).not.toExist();
      expect(spectator.query(byText('Next'))).toExist();
    });
  });

  describe('Given a state with intermediate page and many page results', () => {
    const state: SearchGiphyImagesStateModel = {
      state: SearchGiphyImagesStateModelState.SearchSucceeded,
      searchParams: {
        limit: 9,
        offset: 9,
        tags: ['test', 'test2'],
      },
      searchResult: {
        gifs: [],
        totalCount: 100,
        error: undefined,
      },
    };

    beforeEach(() => {
      component.params = state.searchParams;
      component.result = state.searchResult;
      fixture.detectChanges();
    });

    it('Then it should render corresponding components', () => {
      expect(spectator.query(byText(`Showing 9 - 18 of 100`, { trim: true }))).toExist();
      expect(spectator.query(byText('Previous'))).toExist();
      expect(spectator.query(byText('Next'))).toExist();
    });
  });

  describe('Given a state with last page and many page results', () => {
    const state: SearchGiphyImagesStateModel = {
      state: SearchGiphyImagesStateModelState.SearchSucceeded,
      searchParams: {
        limit: 9,
        offset: 91,
        tags: ['test', 'test2'],
      },
      searchResult: {
        gifs: [],
        totalCount: 100,
        error: undefined,
      },
    };

    beforeEach(() => {
      component.params = state.searchParams;
      component.result = state.searchResult;
      fixture.detectChanges();
    });

    it('Then it should render corresponding components', () => {
      expect(spectator.query(byText(`Showing 91 - 100 of 100`, { trim: true }))).toExist();
      expect(spectator.query(byText('Previous'))).toExist();
      expect(spectator.query(byText('Next'))).not.toExist();
    });
  });

  describe('Given a onPreviousButtonClick event', () => {
    beforeEach(() => {
      component.previousButtonClick.emit = jest.fn();
      component.onPreviousButtonClick();
    });

    it('Then it should emit the event', () => {
      expect(component.previousButtonClick.emit).toHaveBeenCalled();
    });
  });

  describe('Given a onNextButtonClick event', () => {
    beforeEach(() => {
      component.nextButtonClick.emit = jest.fn();
      component.onNextButtonClick();
    });

    it('Then it should emit the event', () => {
      expect(component.nextButtonClick.emit).toHaveBeenCalled();
    });
  });
});
