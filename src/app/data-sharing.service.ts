// data-sharing.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService, ApodResponse } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class DataSharingService {
  private apodDataSubject = new BehaviorSubject<ApodResponse[]>([]);
  apodData$: Observable<ApodResponse[]> = this.apodDataSubject.asObservable();

  constructor(private apiService: ApiService) {
    this.fetchApodData();
  }

  private fetchApodData() {
    this.apiService.getMultipleApods().subscribe({
      next: (data: ApodResponse[]) => {
        this.apodDataSubject.next(data);
      },
      error: (error: any) => {
        console.error('API error:', error);
      }
    });
  }
}
