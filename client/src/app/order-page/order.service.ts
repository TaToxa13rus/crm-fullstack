import { IOrderPosition } from './../shared/interfaces';
import { Injectable } from '@angular/core';
import { IPosition } from '../shared/interfaces';

@Injectable()
export class OrderService {
  public list: IOrderPosition[] = [];
  public price = 0;

  add(position: IPosition) {
    const orderPosition: IOrderPosition = { ...position };

    const candidate = this.list.find(pos => pos._id === position._id);

    if (candidate) {
      candidate.quantity += orderPosition.quantity;
    } else {
      this.list.push(orderPosition);
    }

    this.computePrice();
  }

  remove(orderPosition: IOrderPosition) {
    const idx = this.list.findIndex(p => p._id === orderPosition._id);
    this.list.splice(idx, 1);
    this.computePrice();
  }

  clear() {
    this.list = [];
    this.price = 0;
  }

  private computePrice() {
    this.price = this.list.reduce((total, item) => {
      return (total += item.quantity * item.cost);
    }, 0);
  }
}
