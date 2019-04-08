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

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css']
})
export class HistoryPageComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('tooltip') tooltipRef: ElementRef;
  tooltip: IMaterialInstance;
  isFilterVisible = false;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.tooltip = MaterialService.initTooltip(this.tooltipRef.nativeElement);
  }

  ngOnDestroy() {
    this.tooltip.destroy();
  }
}
