// api-data.component.ts
import { Component, OnInit } from '@angular/core';
import { ApodResponse } from '../api.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DataSharingService } from '../data-sharing.service';

@Component({
  selector: 'app-api-data',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [], 
  templateUrl: './api-data.component.html',
  styleUrls: ['./api-data.component.scss']
})
export class ApiDataComponent implements OnInit {
  apodData: ApodResponse[] = [];
  loading: boolean = true;
  errorMessage: string = '';
  currentIndex: number = 0;

  constructor(private dataSharingService: DataSharingService) {}

  ngOnInit(): void {
    this.subscribeToApodData();
  }

  subscribeToApodData(): void {
    this.dataSharingService.apodData$.subscribe({
      next: (data: ApodResponse[]) => {
        this.apodData = data;
        this.loading = false;
      },
      error: (error: any) => {
        this.errorMessage = error.message;
        this.loading = false;
      }
    });
  }

  prevSlide(): void {
    this.currentIndex = (this.currentIndex - 1 + this.apodData.length) % this.apodData.length;
  }

  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.apodData.length;
  }
}
