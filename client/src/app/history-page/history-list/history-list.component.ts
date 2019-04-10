import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { IOrder } from './../../shared/interfaces';
import {
  IMaterialInstance,
  MaterialService
} from 'src/app/shared/classes/material.service';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.css']
})
export class HistoryListComponent implements AfterViewInit, OnDestroy {
  @Input() orders: IOrder[];
  @ViewChild('modal') modalRef: ElementRef;

  modal: IMaterialInstance;
  selectedOrder: IOrder;

  ngAfterViewInit(): void {
    this.modal = MaterialService.initModal(this.modalRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.modal.destroy();
  }

  computePrice(order: IOrder): number {
    return order.list.reduce((total, item) => {
      return (total += item.quantity * item.cost);
    }, 0);
  }

  selectOrder(order: IOrder) {
    this.selectedOrder = order;
    this.modal.open();
  }

  closeModal() {
    this.modal.close();
  }
}
