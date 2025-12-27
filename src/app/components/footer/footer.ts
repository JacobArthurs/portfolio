import { Component } from '@angular/core';
import {  MatIconButton, MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faFileLines } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  imports: [
    MatDividerModule,
    MatIconButton,
    FaIconComponent,
    MatIconButton,
    MatButtonModule
],
  templateUrl: './footer.html',
  styleUrls: ['./footer.css'],
  standalone: true
})
export class FooterComponent {
  protected currentYear: number = new Date().getFullYear();
  protected faGithub: IconDefinition = faGithub;
  protected faLinkedin: IconDefinition = faLinkedin;
  protected faFileLines: IconDefinition = faFileLines;
}
