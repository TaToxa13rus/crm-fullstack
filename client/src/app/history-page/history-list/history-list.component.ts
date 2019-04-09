import { Component, OnInit, Input } from '@angular/core';
import { IOrder } from './../../shared/interfaces';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.css']
})
export class HistoryListComponent implements OnInit {
  @Input() orders: IOrder[];

  constructor() {}

  ngOnInit() {}
}
