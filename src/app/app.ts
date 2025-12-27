import { Component, Renderer2, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HeroComponent } from './sections/hero/hero';
import { AboutComponent } from './sections/about/about';
import { SkillsComponent } from './sections/skills/skills';
import { BackgroundComponent } from './sections/background/background';
import { ContactComponent } from './sections/contact/contact';
import { FooterComponent } from './sections/footer/footer';
import { LayoutComponent } from './sections/layout/layout';

@Component({
  selector: 'app-root',
  imports: [
    LayoutComponent,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    BackgroundComponent,
    ContactComponent,
    FooterComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit() {
    this.addStructuredData();
  }

  private addStructuredData() {
    const script = this.renderer.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Jacob Arthurs",
      "jobTitle": "Senior Full Stack Software Engineer",
      "url": "https://jacobarthurs.com",
      "sameAs": [
        "https://linkedin.com/in/JacobArthurs",
        "https://github.com/JacobArthurs"
      ]
    });
    this.renderer.appendChild(this.document.head, script);
  }
}