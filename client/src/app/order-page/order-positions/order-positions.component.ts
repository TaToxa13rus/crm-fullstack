import { MaterialService } from 'src/app/shared/classes/material.service';
import { OrderService } from './../order.service';
import { PositionsService } from './../../shared/services/positions.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { switchMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IPosition } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-order-positions',
  templateUrl: './order-positions.component.html',
  styleUrls: ['./order-positions.component.css']
})
export class OrderPositionsComponent implements OnInit {
  positions$: Observable<IPosition[]>;

  constructor(
    private route: ActivatedRoute,
    private positionsService: PositionsService,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.positions$ = this.route.params.pipe(
      switchMap((params: Params) => {
        return this.positionsService.fetch(params['id']);
      }),
      map((positions: IPosition[]) => {
        return positions.map(position => {
          position.quantity = 1;
          return position;
        });
      })
    );
  }

  addToOrder(position: IPosition) {
    MaterialService.toast(`Добавлено х${position.quantity}`);
    this.orderService.add(position);
  }
}
