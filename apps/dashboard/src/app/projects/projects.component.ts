import { Component, OnInit } from '@angular/core';
import { ProjectsService, Project } from '@workshop/core-data';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects$;
  selectedProject: Project;

  constructor(private projectService: ProjectsService) { }

  ngOnInit() {
    this.getProjects();
    this.resetProject();
  }

  resetProject() {
    const emptyProject : Project = {
      id: undefined,
      title: '',
      details: '',
      percentComplete: 0,
      approved: false,
    };
    this.selectProject(emptyProject);
  }

  getProjects() {
    this.projects$ = this.projectService.all();
  }

  selectProject(proj) {
    this.selectedProject = proj;
  }

  cancel() {
    this.resetProject();
  }

  saveProject(project) {
    console.log('Saving project ', project);
  }

  deleteProject(project) {
    this.projectService.delete(project.id)
      .subscribe(result => this.getProjects());
  }

}
