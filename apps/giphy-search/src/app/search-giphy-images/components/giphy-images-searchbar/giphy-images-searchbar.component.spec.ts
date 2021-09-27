import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { MockComponent } from 'ng-mocks';
import { TagInputComponent } from 'ngx-chips';
import { GiphyImagesSearchbarComponent } from './giphy-images-searchbar.component';

describe('GiphyImagesSearchbarComponent', () => {
  let component: GiphyImagesSearchbarComponent;
  let spectator: Spectator<GiphyImagesSearchbarComponent>;

  const createComponent = createComponentFactory({
    component: GiphyImagesSearchbarComponent,
    imports: [FormsModule, ReactiveFormsModule],
    declarations: [MockComponent(TagInputComponent)],
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  describe('Given an initial empty form', () => {
    it('Then it should not be valid', () => {
      expect(component.form.valid).toBe(false);
    });

    describe('When fill the form with tags', () => {
      beforeEach(() => {
        component.form.controls.tags.setValue(['tag1', 'tag2']);
      });

      it('Then it should be valid', () => {
        expect(component.form.valid).toBe(true);
      });

      describe('When submit the form', () => {
        beforeEach(() => {
          component.submitButtonClick.emit = jest.fn();
          component.onSubmitButtonClick();
        });

        it('Then it should emit the form value', () => {
          expect(component.submitButtonClick.emit).toHaveBeenCalledWith(component.form.value);
        });
      });
    });
  });
});
