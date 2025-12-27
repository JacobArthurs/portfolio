import { Component, ElementRef, ViewChild } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-reverse-animated-text',
  imports: [],
  templateUrl: './reverse-animated-text.html',
  styleUrl: './reverse-animated-text.css',
})
export class ReverseAnimatedText {
  @ViewChild('masterReverseTextPath') masterTextPath!: ElementRef<SVGTextPathElement>;
  @ViewChild('masterReverseTextPathClone') masterTextPathClone!: ElementRef<SVGTextPathElement>;

  protected text = 'Full Stack Engineer • Team Lead • Active Secret Clearance • System Architect • Technical Mentor •';
  private timeline?: gsap.core.Timeline;
  protected readonly OFFSET: string = '60%';

  ngAfterViewInit(): void {
    this.initAnimation();
  }

  ngOnDestroy(): void {
    if (this.timeline) {
      this.timeline.kill();
    }
  }

  private initAnimation(): void {
    const masterPath = this.masterTextPath.nativeElement;
    const clonePath = this.masterTextPathClone.nativeElement;

    this.timeline = gsap.timeline({ repeat: -1 });

    this.timeline.fromTo(
      masterPath,
      { attr: { startOffset: '0%' } },
      {
        attr: { startOffset: `-${this.OFFSET}` },
        duration: 40,
        ease: 'none'
      },
      0
    );

    this.timeline.fromTo(
      clonePath,
      { attr: { startOffset: `${this.OFFSET}` } },
      {
        attr: { startOffset: '0%' },
        duration: 40,
        ease: 'none'
      },
      0
    );
  }
}
