import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private workerUrl = 'https://contact.arthursjacob01.workers.dev';

  constructor(private http: HttpClient) {}

  sendContactEmail(name: string, email: string, subject: string, message: string, website: string): Observable<any> {
    if (website)
      return of({ success: true });

    return this.http.post(this.workerUrl, {
      name,
      email,
      subject,
      message,
      website
    });
  }
}