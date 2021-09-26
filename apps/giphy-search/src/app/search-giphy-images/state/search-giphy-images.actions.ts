import { GifsResult } from '@giphy/js-fetch-api';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace SearchGiphyImages {
  export class SearchSubmitted {
    static readonly type = '[SearchGiphyImages] Search Submitted';
    constructor(public payload: string[]) {}
  }

  export class SearchSucceeded {
    static readonly type = '[SearchGiphyImages] Search Succeeded';
    constructor(public payload: GifsResult) {}
  }

  export class SearchFailed {
    static readonly type = '[SearchGiphyImages] Search Failed';
    constructor(public payload: Error) {}
  }
}
