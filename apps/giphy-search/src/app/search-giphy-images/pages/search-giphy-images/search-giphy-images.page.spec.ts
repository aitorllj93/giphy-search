import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchGiphyImagesPage } from './search-giphy-images.page';

describe('SearchGiphyImagesPage', () => {
  let component: SearchGiphyImagesPage;
  let fixture: ComponentFixture<SearchGiphyImagesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchGiphyImagesPage],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchGiphyImagesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
