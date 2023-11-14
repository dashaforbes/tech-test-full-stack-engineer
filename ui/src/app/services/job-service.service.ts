import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, catchError, of } from 'rxjs';
import { environment } from 'environments/environment';

/**
 * JobService is a service that provides methods for interacting with the job-related endpoints of the backend API.
 */
@Injectable({
  providedIn: 'root'
})
export class JobService {
  // The base URL of the backend API
  private apiUrl = environment.apiUrl;

  private acceptedJobs = new BehaviorSubject<any[]>([]);
  acceptedJobs$ = this.acceptedJobs.asObservable();

  private invitedJobs = new BehaviorSubject<any[]>([]);
  invitedJobs$ = this.invitedJobs.asObservable();

  private leadAccepted = new BehaviorSubject<any>(null);
  leadAccepted$ = this.leadAccepted.asObservable();

  constructor(private http: HttpClient) { }

  /**
   * Fetches accepted jobs from the backend API and updates the BehaviorSubject.
   * This method makes a GET request to the 'accepted' endpoint of the API, 
   * subscribes to the response, and updates the 'acceptedJobs' BehaviorSubject 
   * with the received data.
   */
  fetchAcceptedJobs(): void {
    this.http.get<any[]>(`${this.apiUrl}/accepted`).pipe(
      catchError(error => {
        console.error('An error occurred:', error);
        return of([]);
      })
    ).subscribe(leads => {
      this.acceptedJobs.next(leads);
    });
  }

  /**
   * Fetches invited jobs from the backend API and updates the BehaviorSubject.
   * This method makes a GET request to the 'new' endpoint of the API, 
   * subscribes to the response, and updates the 'invitedJobs' BehaviorSubject 
   * with the received data.
   */
  fetchInvitedJobs(): void {
    this.http.get<any[]>(`${this.apiUrl}/new`).pipe(
      catchError(error => {
        console.error('An error occurred:', error);
        return of([]);
      })
    ).subscribe(leads => {
      this.invitedJobs.next(leads);
    });
  }
  /**
   * Sends a request to the backend API to accept a job.
   * This method makes a PUT request to the 'accept' endpoint of the API, 
   * passing the ID of the job to accept in the URL.
   * @param id - The ID of the job to accept.
   * @returns An Observable that will emit the updated job.
   */
  acceptJob(id: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/accept/${id}`, {}).pipe(
      tap(updatedLead => {
        this.leadAccepted.next(updatedLead);
      }),
      catchError(error => {
        console.error('An error occurred:', error);
        return of(null);
      })
    );
  }

  /**
   * Sends a request to the backend API to decline a job.
   * This method makes a PUT request to the 'decline' endpoint of the API, 
   * passing the ID of the job to decline in the URL.
   * @param id - The ID of the job to decline.
   * @returns An Observable that will emit the updated job.
   */
  declineJob(id: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/decline/${id}`, {}).pipe(
      catchError(error => {
        console.error('An error occurred:', error);
        return of(null);
      })
    );
  }
}