import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {Post} from '../models/post.model';
import { PostsService} from '../services/posts.service';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {NotifierService} from 'angular-notifier';

@Injectable()
export class PostDetailsResolver implements Resolve<Post> {
  constructor(
    private postsService: PostsService,
    private router: Router,
    private notifier: NotifierService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Post> {
      return this.postsService.getPost(route.params.id).pipe(
        catchError((error) => {
          console.log(error);
          this.notifier.notify('error', error.error.data.info);
          this.router.navigate(['/posts']);
          return of(null);
        })
      );
    }


}
