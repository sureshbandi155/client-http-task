import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

import { Course } from './course.model';


@Injectable({ providedIn: 'root' })
export class CoursesService {

  constructor(private http: HttpClient) {}

  createAndStorePost(courseName: string, description: string) {
    const courseData: Course = { courseName: courseName, description: description };
    this.http.post<{ name: string }>('https://course-project-28256.firebaseio.com/course.json', courseData)
    .subscribe(responseData => {
      console.log(responseData);
    });

  }

  fetchPosts() {
    return this.http.get<{[key: string]: Course}>('https://course-project-28256.firebaseio.com/course.json')
    .pipe(
      map(responseData => {
        const courseArray: Course[] = [];
        for (const key in responseData) {
          if ( responseData.hasOwnProperty(key)) {
            courseArray.push({...responseData[key], id: key});
          }
        }
        return courseArray;
      })
    );
  }

  deleteCourse(course: string) {
    return this.http.delete(
      'https://course-project-28256.firebaseio.com/course/' + course + '.json'
    );
  }
  updateData(courseId: string, course: Course) {
    // const UdateCourseData: Course = { course: courseName, description: description };
    return this.http.patch(
      'https://course-project-28256.firebaseio.com/course/' + courseId + '.json', course);
  }
}
