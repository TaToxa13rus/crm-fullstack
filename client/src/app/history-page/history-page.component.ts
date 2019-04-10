import { IOrder, IFilter } from './../shared/interfaces';
import { Subscription } from 'rxjs';
import {
  IMaterialInstance,
  MaterialService
} from './../shared/classes/material.service';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { OrdersService } from '../shared/services/orders.service';

const STEP = 2;

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css']
})
export class HistoryPageComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('tooltip') tooltipRef: ElementRef;
  tooltip: IMaterialInstance;
  loading = false;
  reloading = false;
  isFilterVisible = false;
  noMoreOrders = false;
  orderSub: Subscription;
  orders: IOrder[] = [];
  filter: IFilter = {};

  offset = 0;
  limit = STEP;

  constructor(private ordersService: OrdersService) {}

  ngOnInit() {
    this.reloading = true;
    this.fetch();
  }

  ngAfterViewInit() {
    this.tooltip = MaterialService.initTooltip(this.tooltipRef.nativeElement);
  }

  ngOnDestroy() {
    this.tooltip.destroy();
    if (this.orderSub) {
      this.orderSub.unsubscribe();
    }
  }

  fetch() {
    const params = Object.assign({}, this.filter, {
      offset: this.offset,
      limit: this.limit
    });

    this.orderSub = this.ordersService.fetch(params).subscribe(
      orders => {
        this.noMoreOrders = orders.length < STEP ? true : false;
        this.orders = this.orders.concat(orders);
      },
      error => console.log(error),
      () => {
        this.loading = false;
        this.reloading = false;
      }
    );
  }

  loadMore() {
    this.offset += STEP;
    this.loading = true;
    this.fetch();
  }

  applyFilter(filter: IFilter) {
    this.orders = [];
    this.offset = 0;
    this.filter = filter;
    this.reloading = true;
    this.fetch();
  }

  isFiltered(): boolean {
    return Object.keys(this.filter).length !== 0;
  }
}
