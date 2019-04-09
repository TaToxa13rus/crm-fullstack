import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IOrder } from './../interfaces';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  constructor(private http: HttpClient) {}

  create(order: IOrder): Observable<IOrder> {
    return this.http.post<IOrder>('/api/order', order);
  }

  fetch(params: any = {}): Observable<IOrder[]> {
    return this.http.get<IOrder[]>('/api/order', {
      params: new HttpParams({
        fromObject: params
      })
    });
  }
}
