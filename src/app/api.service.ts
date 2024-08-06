import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interface to define the structure of APOD response
export interface ApodResponse {
  title: string;
  url: string;
  explanation: string;
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiKey: string = 'A1EogEHfbziS0jm6v6oV9LjlmVgZsAz67N1grS4N';
  private apiUrl: string = 'https://api.nasa.gov/planetary/apod';

  constructor(private http: HttpClient) { }

  // Fetch multiple APOD entries
  getMultipleApods(count: number = 20): Observable<ApodResponse[]> {
    return this.http.get<ApodResponse[]>(`${this.apiUrl}?count=${count}&api_key=${this.apiKey}`);
  }
}
