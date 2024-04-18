import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, map, shareReplay, throwError } from 'rxjs';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  public postsUrl = 'https://jsonplaceholder.typicode.com/posts';
  public singlePostUrl = 'https://jsonplaceholder.typicode.com/posts/';
  private http = inject(HttpClient);

  private posts$ = this.http.get<Post[]>(this.postsUrl).pipe(
    map((posts) => posts),
    shareReplay(1),
    catchError(this.handleError)
  );

  public postList = toSignal<Post[], []>(this.posts$, { initialValue: [] });

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}
