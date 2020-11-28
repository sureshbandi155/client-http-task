import { Course } from './course.model';
import { Component, OnInit } from '@angular/core';
import { CoursesService } from './courses.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private coursesService: CoursesService) { }
  loadedCourse: Course[] = [];
  isFetching = false;
  isUpdating = false;
  formData = { id: '', courseName: '', description: '' };

  ngOnInit() {
    this.getCourse();
  }



  onCreatePost(courseData: Course) {
    if (this.formData.id !== '') {
      console.log('particular  id: ' + this.formData.id);
      this.coursesService.updateData(this.formData.id, this.formData)
        .subscribe(response => {
          console.log(response);
        });
      setTimeout(() => {
        this.getCourse();
      }, 1000);
    } else {
      this.coursesService.createAndStorePost(courseData.courseName, courseData.description);
      setTimeout(() => {
        this.getCourse();
      }, 1000);
    }
  }
  private getCourse() {
    this.isFetching = true;
    this.coursesService.fetchPosts().subscribe(
      courses => {
        this.isFetching = false;
        this.loadedCourse = courses;
        console.log(this.loadedCourse);
      }
    );
  }
  deleteUser(course: string) {
    this.coursesService.deleteCourse(course).subscribe(() => {
      setTimeout(() => {
        this.getCourse();
      }, 1000);
    });
  }
  updateCourse(id, course) {
    this.isUpdating = true;
    this.formData.id = course.id;
    this.formData.courseName = course.courseName;
    this.formData.description = course.description;
    console.log(this.formData);
  }

}
