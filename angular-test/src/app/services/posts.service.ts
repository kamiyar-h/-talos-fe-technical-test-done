import {Injectable} from '@angular/core';
import {Post} from '../models/post.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {NotifierService} from 'angular-notifier';
import {catchError, mapTo} from 'rxjs/operators';
import {Router} from '@angular/router';

export interface IError {
  statusCode: number;
  message: string;
  name: string;
  stack: string;
}

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  /**
   * this property set from environment config
   */
  private readonly BASE_API = environment.API_BASE;

  /**
   * this property register for every time we want to create a new post.
   * so if we are in new post component we must tell header to hidden add button.
   */
  private inNewPostSource = new BehaviorSubject<boolean>(false);
  inNewPost = this.inNewPostSource.asObservable();

  /**
   * Store all post we got from server
   */
  posts$;

  constructor(
    private http: HttpClient,
    private notifier: NotifierService
  ) {
    this.getAllPosts();
  }


  /**
   * this method should get all posts from server and stored to posts$ property
   */
  getAllPosts() {
    this.posts$ = this.http.get<Post[]>(this.BASE_API + 'posts').pipe(
      catchError((error: IError) => {
        console.log(error);
        this.notifier.notify('error', error.message);
        return of(null);
      })
    );
  }

  /**
   * this method get specific post by own id
   * @param id post Id we got from server before
   */
  getPost(id: string) {
    return this.http.get<Post>(this.BASE_API + 'posts/' + id).pipe(
      catchError((error: IError) => {
        console.log(error);
        this.notifier.notify('error', error.message);
        return of(null);
      })
    );
  }


  /**
   * first Add new post. then assign photo to this post
   * @param post Post
   */
  addPost(post: Post) {
    return this.http.post<Post>(this.BASE_API + 'posts', {
      title: post.title,
      description: post.description,
      tags: post.tags
    }).pipe(
      catchError((error: IError) => {
        console.log(error);
        this.notifier.notify('error', error.message);
        return of(null);
      })
    );
  }

  /**
   * when new post added successfully and has image,
   * we call this method to tell server to put selected image for this new post
   * @param id new post Id
   * @param photo selected image
   */
  onUploadPhoto(id: string, photo: File) {
    const fd = new FormData();
    fd.append('image', photo);

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return this.http.put(this.BASE_API + 'posts/' + id + '/picture', fd, {headers})
      .pipe(
        catchError((error: IError) => {
          this.notifier.notify('error', error.message);
          return of(null);
        }),
        mapTo(true)
      );
  }

  /**
   * detect if we are in new post component or not,
   * and tell it to header for hide or show 'Add new post' button
   * @param isIn must be boolean
   */
  inNewPostComponent(isIn: boolean) {
    this.inNewPostSource.next(isIn);
  }
}
