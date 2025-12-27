import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faServer, faDesktop, faCloud, faExchangeAlt, faClipboardCheck, faRocket } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.html',
  styleUrls: ['./skills.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    FontAwesomeModule,
    MatChipsModule
  ]
})
export class SkillsComponent {
  protected skills: SkillCategory[] = [
    {
      icon: faServer,
      title: 'Backend & Architecture',
      description: 'Building scalable, maintainable systems that teams can depend on for years to come. I focus on performance, security, and architecture that solves problems without overengineering.',
      tags: ['C#', '.NET', 'ASP.NET Core', 'RESTful APIs', 'Microservices', 'PostgreSQL', 'SQL Server', 'JWT Authentication'],
      gridColumns: 7
    },
    {
      icon: faDesktop,
      title: 'Frontend',
      description: 'Creating responsive, user-friendly interfaces that prioritize clean design and smooth interactions. I focus on functional experiences that solve problems.',
      tags: ['Angular', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Responsive Design', 'Figma' ],
      gridColumns: 7
    },
    {
      icon: faCloud,
      title: 'Cloud & Infrastructure',
      description: 'Deploying and optimizing at scale. I automate infrastructure with Terraform, containerize with Docker, and build CI/CD pipelines that teams can trust.',
      tags: ['AWS (ECS, RDS, S3, SNS/SQS)', 'Docker', 'GitHub Actions', 'CI/CD', 'Terraform (IaC)'],
      gridColumns: 6
    },
    {
      icon: faExchangeAlt,
      title: 'Data & Integration',
      description: 'Connecting systems and managing data flows between services. From database migrations with major performance improvements to B2B integrations handling thousands of transactions.',
      tags: ['Database Migration', 'SQL Optimization', 'OAuth2 / JWT / JWKS', 'API Integration', 'B2B Integration', 'Data Architecture', 'ETL'],
      gridColumns: 8
    },
    {
      icon: faClipboardCheck,
      title: 'Development Practices',
      description: 'How I approach engineering. Writing tests, reviewing code, documenting decisions, and mentoring developers. Shipping features is only half the job.',
      tags: ['Agile / Scrum', 'Test-Driven Development', 'Code Reviews', 'Technical Documentation', 'Technical Leadership', 'Mentorship'],
      gridColumns: 8
    },
    {
      icon: faRocket,
      title: 'Currently Exploring',
      description: 'Pursuing my Master\'s in Computer Science at Georgia Tech, focusing on artificial intelligence. This work is changing how I approach optimization and problem decomposition in production systems.',
      tags: ['Analytical Models', 'Artificial Intelligence', 'Human-Computer Interaction', 'Software Development Process', 'Cognitive Science'],
      gridColumns: 6
    }
  ];

  onMouseMove(event: MouseEvent) {
    const element = event.currentTarget as HTMLElement;
    if (!element)
      return;

    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    (event.currentTarget as HTMLElement).style.setProperty('--mouse-x', `${x}px`);
    (event.currentTarget as HTMLElement).style.setProperty('--mouse-y', `${y}px`);
  }
}

interface SkillCategory {
  icon: IconDefinition;
  title: string;
  description: string;
  tags: string[];
  gridColumns: number;
}
