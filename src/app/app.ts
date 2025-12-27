import { Component } from '@angular/core';
import { HeroComponent } from './components/hero/hero';
import { AboutComponent } from './components/about/about';
import { SkillsComponent } from './components/skills/skills';
import { BackgroundComponent } from './components/background/background';
import { ContactComponent } from './components/contact/contact';
import { FooterComponent } from './components/footer/footer';
import { LayoutComponent } from './components/layout/layout';

@Component({
  selector: 'app-root',
  imports: [LayoutComponent, HeroComponent, AboutComponent, SkillsComponent, BackgroundComponent, ContactComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
