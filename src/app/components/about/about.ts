import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.html',
  styleUrls: ['./about.css'],
  standalone: true
})
export class AboutComponent {
  protected yearsOfExperience: number = 0;

  ngOnInit(): void {
    const startDate = new Date('2020-05-01');
    const currentDate = new Date();
    const monthsDiff = (currentDate.getFullYear() - startDate.getFullYear()) * 12 +
                       (currentDate.getMonth() - startDate.getMonth());
    this.yearsOfExperience = Math.ceil(monthsDiff / 12);
  }
}
