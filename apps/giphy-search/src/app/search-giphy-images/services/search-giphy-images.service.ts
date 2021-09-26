import { Inject, Injectable } from '@angular/core';
import { GifsResult, GiphyFetch, SearchOptions } from '@giphy/js-fetch-api';
import { from, Observable } from 'rxjs';
import { GIPHY_FETCH } from '../providers/giphy-fetch.provider';

@Injectable({
  providedIn: 'root',
})
export class SearchGiphyImagesService {
  constructor(@Inject(GIPHY_FETCH) private giphyFetch: GiphyFetch) {}

  searchGiphyImagesByTags(tags: string[], options?: SearchOptions): Observable<GifsResult> {
    // NOTE: As GIPHY doesn't provide a search by multiple tags we need to create a query string from them
    // NOTE: On Errors, this will always print the same error in the UI as GiphyFetch doesn't provide a way to handle different errors. The REST API does.
    return from(this.giphyFetch.search(tags.join(' '), options));
  }
}
