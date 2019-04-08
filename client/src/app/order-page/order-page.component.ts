import { Subscription } from 'rxjs';
import { IOrder } from './../shared/interfaces';
import { OrdersService } from './../shared/services/orders.service';
import { MaterialService } from 'src/app/shared/classes/material.service';
import { IMaterialInstance } from './../shared/classes/material.service';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
  AfterViewInit
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { OrderService } from './order.service';
import { IOrderPosition } from '../shared/interfaces';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css'],
  providers: [OrderService]
})
export class OrderPageComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('modal') modalRef: ElementRef;
  modal: IMaterialInstance;
  orderSub: Subscription;
  isRoot: boolean;
  pending = false;

  constructor(
    private router: Router,
    private ordersService: OrdersService,
    public orderService: OrderService
  ) {}

  ngOnInit() {
    this.isRoot = this.router.url === '/order';
    this.router.events.subscribe(url => {
      if (url instanceof NavigationEnd) {
        this.isRoot = this.router.url === '/order';
      }
    });
  }

  ngOnDestroy() {
    this.modal.destroy();
    if (this.orderSub) {
      this.orderSub.unsubscribe();
    }
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef.nativeElement);
  }

  openModal() {
    this.modal.open();
  }

  cancel() {
    this.modal.close();
  }

  submit() {
    this.pending = true;
    this.modal.close();

    const order: IOrder = {
      list: this.orderService.list.map(item => {
        delete item._id;
        return item;
      })
    };
    console.log(order);

    this.orderSub = this.ordersService.create(order).subscribe(
      newOrder => {
        MaterialService.toast(`Заказ №${newOrder.order} был добавлен.`);
        this.orderService.clear();
      },
      error => MaterialService.toast(error.error.message),
      () => {
        this.pending = false;
        this.modal.close();
      }
    );
  }

  removePosition(orderPosition: IOrderPosition) {
    this.orderService.remove(orderPosition);
  }
}
