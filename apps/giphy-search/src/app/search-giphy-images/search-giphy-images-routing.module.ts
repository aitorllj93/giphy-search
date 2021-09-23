import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchGiphyImagesPage } from './pages/search-giphy-images/search-giphy-images.page';

const routes: Routes = [{ path: '', component: SearchGiphyImagesPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchGiphyImagesRoutingModule {}
