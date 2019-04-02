import { ICategory } from './../../shared/interfaces';
import { Component, OnInit } from '@angular/core';
import { CategoriesService } from './../../shared/services/categories.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-order-categories',
  templateUrl: './order-categories.component.html',
  styleUrls: ['./order-categories.component.css']
})
export class OrderCategoriesComponent implements OnInit {
  categories$: Observable<ICategory[]>;

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit() {
    this.categories$ = this.categoriesService.fetch();
  }
}
