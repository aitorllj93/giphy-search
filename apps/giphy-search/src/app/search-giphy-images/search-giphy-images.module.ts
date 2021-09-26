import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { TagInputModule } from 'ngx-chips';
import { GiphyImagesGridPaginationComponent } from './components/giphy-images-grid-pagination/giphy-images-grid-pagination.component';
import { GiphyImagesGridComponent } from './components/giphy-images-grid/giphy-images-grid.component';
import { GiphyImagesSearchbarComponent } from './components/giphy-images-searchbar/giphy-images-searchbar.component';
import { SearchGiphyImagesPage } from './pages/search-giphy-images/search-giphy-images.page';
import { SearchGiphyImagesRoutingModule } from './search-giphy-images-routing.module';
import { SearchGiphyImagesState } from './state/search-giphy-images.state';

@NgModule({
  declarations: [SearchGiphyImagesPage, GiphyImagesGridPaginationComponent, GiphyImagesGridComponent, GiphyImagesSearchbarComponent],
  imports: [
    CommonModule,
    NgxsModule.forFeature([SearchGiphyImagesState]),
    FormsModule,
    ReactiveFormsModule,
    TagInputModule,
    SearchGiphyImagesRoutingModule,
  ],
})
export class SearchGiphyImagesModule {}
