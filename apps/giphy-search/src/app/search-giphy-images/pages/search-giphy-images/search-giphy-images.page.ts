import { Component, OnInit } from '@angular/core';
import { GiphyFetch } from '@giphy/js-fetch-api';
import { IGif } from '@giphy/js-types';
import { Subject } from 'rxjs';
import { environment } from '../../../../environments/environment';

if (!environment.giphyApiKey) {
  throw new Error('Giphy API key is missing');
}

const gf = new GiphyFetch(environment.giphyApiKey);

@Component({
  selector: 'gs-search-giphy-images',
  templateUrl: './search-giphy-images.page.html',
  styleUrls: ['./search-giphy-images.page.scss'],
})
export class SearchGiphyImagesPage implements OnInit {
  gifs$ = new Subject<IGif[]>();

  ngOnInit() {
    gf.search('cats superman', { limit: 9, offset: 0 }).then(({ data }) => this.gifs$.next(data));
  }
}
