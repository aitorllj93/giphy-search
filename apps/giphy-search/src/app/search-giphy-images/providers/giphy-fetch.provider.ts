import { InjectionToken } from '@angular/core';
import { GiphyFetch } from '@giphy/js-fetch-api';
import { environment } from '../../../environments/environment';

export const GIPHY_FETCH = new InjectionToken<GiphyFetch>('GiphyFetch', {
  providedIn: 'root',
  factory: () => {
    if (!environment.giphyApiKey) {
      throw new Error('Giphy API key is missing');
    }

    return new GiphyFetch(environment.giphyApiKey);
  },
});
