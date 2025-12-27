import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormGroupDirective } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome';
import { faCheckCircle, faPaperPlane, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { ResultSnackbar } from '../../shared/components/result-snackbar/result-snackbar';
import { ContactService } from '../../services/contact/contact';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.html',
  styleUrls: ['./contact.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    FontAwesomeModule
  ]
})
export class ContactComponent {
  @ViewChild('formDirective') formDirective!: FormGroupDirective;
  protected contactForm: FormGroup;
  protected faPaperPlane: IconDefinition = faPaperPlane;
  protected loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(2000)]],
      website: ['']
    });
  }

  protected async onSubmit() {
    if(!this.contactForm.valid){
      this.contactForm.markAllAsTouched();
      return
    }

    this.loading = true;
    this.cdr.detectChanges();

    this.contactService.sendContactEmail(
      this.contactForm.value.name,
      this.contactForm.value.email,
      this.contactForm.value.subject,
      this.contactForm.value.message,
      this.contactForm.value.website
    ).subscribe({
      next: () => {
        this.snackBar.openFromComponent(ResultSnackbar, {
          data: {
            message: 'Message sent successfully!',
            icon: faCheckCircle
          },
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
        
        this.formDirective.resetForm();
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.snackBar.openFromComponent(ResultSnackbar, {
          data: {
            message: 'Failed to send message. Please try again.',
            icon: faTimesCircle
          },
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });

        console.error('Failed to send message:', err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  protected getErrorMessage(field: string): string {
    const control = this.contactForm.get(field);

    if (control?.hasError('required')) {
      return `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
    }

    if (control?.hasError('email')) {
      return 'Please enter a valid email address';
    }

    if (control?.hasError('minlength')) {
      const minLength = control.errors?.['minlength'].requiredLength;
      return `Must be at least ${minLength} characters`;
    }

    if (control?.hasError('maxlength')) {
      const maxLength = control.errors?.['maxlength'].requiredLength;
      return `Cannot exceed ${maxLength} characters`;
    }

    return '';
  }
}
