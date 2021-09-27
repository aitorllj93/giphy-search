import { ComponentFixture } from '@angular/core/testing';
import { IGif } from '@giphy/js-types';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { SearchGiphyImagesStateModel, SearchGiphyImagesStateModelState } from '../../state/search-giphy-images.state-model';
import { GiphyImagesGridComponent } from './giphy-images-grid.component';

describe('GiphyImagesGridComponent', () => {
  let component: GiphyImagesGridComponent;
  let spectator: Spectator<GiphyImagesGridComponent>;
  let fixture: ComponentFixture<GiphyImagesGridComponent>;

  const createComponent = createComponentFactory({
    component: GiphyImagesGridComponent,
    declarations: [],
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
    fixture = spectator.fixture;
  });

  describe('Given an empty array of IGifs', () => {
    const state: SearchGiphyImagesStateModel = {
      state: SearchGiphyImagesStateModelState.SearchSucceeded,
      searchParams: {
        limit: 0,
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
      component.result = state.searchResult;
      fixture.detectChanges();
    });

    it('Then it should not display gifs', () => {
      expect(spectator.queryAll('.card')).toHaveLength(0);
    });
  });

  describe('Given a filled array of IGifs', () => {
    const state: SearchGiphyImagesStateModel = {
      state: SearchGiphyImagesStateModelState.SearchSucceeded,
      searchParams: {
        limit: 0,
        offset: 0,
        tags: [],
      },
      searchResult: {
        gifs: [
          {
            images: {
              fixed_height: {
                url: 'test',
                width: 100,
                height: 100,
              },
            },
            title: 'test',
          },
          {
            images: {
              fixed_height: {
                url: 'test2',
                width: 100,
                height: 100,
              },
            },
            title: 'test2',
          },
        ] as IGif[],
        totalCount: 0,
        error: undefined,
      },
    };

    beforeEach(() => {
      component.result = state.searchResult;
      fixture.detectChanges();
    });

    it('Then it should display gifs', () => {
      const gifContainers = spectator.queryAll('.card');

      gifContainers.forEach((gifContainer, index) => {
        expect(gifContainer.querySelector('img')).toHaveAttribute('src', state.searchResult.gifs[index].images.fixed_height.url);
        expect(gifContainer.querySelector('.card-title')).toHaveText(state.searchResult.gifs[index].title);
      });
    });
  });
});
