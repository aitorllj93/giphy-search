import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SearchGiphyImagesPage } from './pages/search-giphy-images/search-giphy-images.page';
import { SearchGiphyImagesRoutingModule } from './search-giphy-images-routing.module';

@NgModule({
  declarations: [SearchGiphyImagesPage],
  imports: [CommonModule, SearchGiphyImagesRoutingModule],
})
export class SearchGiphyImagesModule {}
