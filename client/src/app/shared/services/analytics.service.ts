import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IOverviewPage } from '../interfaces';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  constructor(private http: HttpClient) {}

  getOverview(): Observable<IOverviewPage> {
    return this.http.get<IOverviewPage>('/api/analytics/overview');
  }

  getAnalytics() {}
}
