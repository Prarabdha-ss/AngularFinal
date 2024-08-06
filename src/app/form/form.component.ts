import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DataSharingService } from '../data-sharing.service';  // Ensure the correct path
import { ApodResponse } from '../api.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  interactionForm: FormGroup;
  apodData: ApodResponse[] = [];
  loading = true;
  errorMessage = '';
  votingTopics = [
    { id: 1, name: 'Mars Exploration' },
    { id: 2, name: 'Black Holes' },
    { id: 3, name: 'Galaxy Collisions' },
    { id: 4, name: 'Nebulae Mysteries' },
    { id: 5, name: 'Exoplanets' }
  ];

  constructor(private fb: FormBuilder, private dataSharingService: DataSharingService) {
    this.interactionForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      favoriteImage: ['', Validators.required],
      voteTopic: ['', Validators.required],  // New voting system form control
      comment: ['', Validators.required],  // New comment form control
    });
  }

  ngOnInit(): void {
    this.dataSharingService.apodData$.subscribe(
      (data: ApodResponse[]) => {
        this.apodData = data;
        this.loading = false;
      },
      (error: any) => {  // Use 'any' type if you are unsure of the error type
        this.errorMessage = 'Error fetching data';
        this.loading = false;
        console.error('API error:', error);
      }
    );
  }

  onSubmit() {
    if (this.interactionForm.valid) {
      const feedback = this.interactionForm.value;
      console.log('Feedback submitted:', feedback);
      alert('Thank you for your interaction!');
      this.interactionForm.reset(); // Reset the form after submission
    } else {
      console.log('Form is invalid');
    }
  }
}
