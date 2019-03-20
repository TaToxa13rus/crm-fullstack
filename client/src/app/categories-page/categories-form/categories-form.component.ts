import { MaterialService } from './../../shared/classes/material.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CategoriesService } from './../../shared/services/categories.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.css']
})
export class CategoriesFormComponent implements OnInit {
  form: FormGroup;
  isNew = true;

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
        category => {
          if (category) {
            this.form.patchValue({
              name: category.name
            });
            MaterialService.updateTextInputs();
          }
          this.form.enable();
        },
        error => MaterialService.toast(error.error.message)
      );
  }

  onSubmit() {}
}
