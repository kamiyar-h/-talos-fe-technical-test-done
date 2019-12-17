import { Component } from '@angular/core';
import {Post} from '../../models/post.model';
import {PostsService} from '../../services/posts.service';
import {environment} from '../../../environments/environment';
import {Observable, Subscription} from 'rxjs';
import {fadeIn} from '../../animations';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
  animations: [fadeIn]
})
export class PostsComponent {

  readonly photoBaseUrl = environment.API_BASE;
  posts$: Observable<Post[]>;

  constructor(private postService: PostsService) {
    this.onGetPosts();
  }

  /**
   * get fresh new posts from server.
   * every time we call this component.
   */
  onGetPosts() {
    this.posts$ = this.postService.posts$;
  }

}
