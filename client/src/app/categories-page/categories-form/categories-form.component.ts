import { MaterialService } from './../../shared/classes/material.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CategoriesService } from './../../shared/services/categories.service';
import { switchMap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { ICategory } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.css']
})
export class CategoriesFormComponent implements OnInit {
  @ViewChild('input') inputRef: ElementRef;
  form: FormGroup;
  image: File;
  imagePreview = null;
  isNew = true;
  category: ICategory;

  constructor(
    private route: ActivatedRoute,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required)
    });

    this.form.disable();

    this.route.params
      .pipe(
        switchMap(
          (params: Params) => {
            if (params['id']) {
              this.isNew = false;
              return this.categoriesService.getById(params['id']);
            }

            return of(null);
          }
        )
      )
      .subscribe(
        (category: ICategory) => {
          if (category) {
            this.form.patchValue({
              name: category.name
            });
            this.category = category;
            this.imagePreview = category.imageSrc;
            MaterialService.updateTextInputs();
          }
          this.form.enable();
        },
        error => {
          MaterialService.toast(error.error.message);
          this.form.enable();
        }
      );
  }

  onSubmit() {
    let obs$: Observable<ICategory>;

    this.form.disable();

    if (this.isNew) {
      obs$ = this.categoriesService.create(this.form.value.name, this.image);
    } else {
      obs$ = this.categoriesService.update(this.category._id, this.form.value.name, this.image);
    }

    obs$.subscribe(
      category => {
        this.category = category;
        MaterialService.toast('Изменения сохранены');
        this.form.enable();
      },
      error => {
        MaterialService.toast(error.error.message);
        this.form.enable();
      }
    );
  }

  triggerInput() {
    this.inputRef.nativeElement.click();
  }

  onFileUpload(event: any) {
    const file = event.target.files[0];
    this.image = file;

    const reader = new FileReader();

    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }
}
