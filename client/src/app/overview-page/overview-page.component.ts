import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
  AfterViewInit
} from '@angular/core';
import { AnalyticsService } from '../shared/services/analytics.service';
import { Observable } from 'rxjs';
import { IOverviewPage } from '../shared/interfaces';
import {
  IMaterialInstance,
  MaterialService
} from '../shared/classes/material.service';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.css']
})
export class OverviewPageComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('tapTarget') tapTargetRef: ElementRef;
  data$: Observable<IOverviewPage>;
  tapTarget: IMaterialInstance;

  yesterday = new Date();

  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit() {
    this.data$ = this.analyticsService.getOverview();

    this.yesterday.setDate(this.yesterday.getDate() - 1);
  }

  ngAfterViewInit() {
    this.tapTarget = MaterialService.initTapTarget(
      this.tapTargetRef.nativeElement
    );
  }

  ngOnDestroy() {
    this.tapTarget.destroy();
  }

  openInfo() {
    this.tapTarget.open();
  }
}
