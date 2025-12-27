import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.html',
  styleUrls: ['./projects.css'],
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatChipsModule]
})
export class ProjectsComponent {
  protected projects: Project[] = [
    {
      title: 'Expense Tracker',
      images: [],
      description: 'Track spending, view trends, and see where your budget is going.',
      technologies: ['Java Spring Boot', 'React', 'PostgreSQL', 'Docker'],
      projectLink: 'https://expensetracker.jacobarthurs.com/',
      githubApiLink: 'https://github.com/JacobArthurs/ExpenseTrackerApi',
      githubClientLink: 'https://github.com/JacobArthurs/expense-tracker-frontend'
    }
  ];
}

interface Project {
  title: string;
  images: string[];
  description: string;
  technologies: string[];
  projectLink?: string;
  githubApiLink?: string;
  githubClientLink?: string;
}