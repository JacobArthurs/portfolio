import { Component, Inject } from '@angular/core';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faXmark, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-result-snackbar',
  imports: [
    MatButtonModule,
    MatIconButton,
    MatTooltipModule,
    FontAwesomeModule
  ],
  templateUrl: './result-snackbar.html',
  styleUrl: './result-snackbar.css',
})
export class ResultSnackbar {
  protected faXmark: IconDefinition = faXmark;

  constructor(
    public snackBarRef: MatSnackBarRef<ResultSnackbar>,
    @Inject(MAT_SNACK_BAR_DATA) public data: { message: string; icon: any; }
  ) {}
}
