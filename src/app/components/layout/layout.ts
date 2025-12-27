import { Component, ChangeDetectorRef } from '@angular/core';
import { Theme, ThemeService } from '../../services/theme/theme';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSun, faMoon, faBars, faTimes, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { MatIconButton } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { Logo } from '../logo/logo';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.html',
  styleUrls: ['./layout.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatSidenavModule, 
    MatListModule, 
    MatIconButton, 
    MatTooltipModule, 
    FontAwesomeModule,
    Logo
  ],
})
export class LayoutComponent {
  protected currentTheme: Theme = 'dark';
  protected currentSection: string = 'hero';
  protected menuItems: string[] = ['about', 'skills', 'background', 'contact'];
  protected faSun: IconDefinition = faSun;
  protected faMoon: IconDefinition = faMoon;
  protected faBars: IconDefinition = faBars;
  protected faTimes: IconDefinition = faTimes;
  private observer!: IntersectionObserver;

  constructor(private themeService: ThemeService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.currentTheme = this.themeService.getTheme();
    this.setupIntersectionObserver();
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.currentSection = entry.target.id;
          this.cdr.detectChanges();
        }
      });
    }, options);

    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => this.observer.observe(section));
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
    this.currentTheme = this.themeService.getTheme();
  }

  scrollToSection(sectionId: string): void {
    this.currentSection = sectionId;

    const element = document.getElementById(sectionId);
    if (element) {
      const scrollContainer = document.querySelector('mat-sidenav-content');
      const headerOffset = 150;

      if (scrollContainer) {
        const elementPosition = element.offsetTop - headerOffset;
        scrollContainer.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        });
      }
    }
  }
}
