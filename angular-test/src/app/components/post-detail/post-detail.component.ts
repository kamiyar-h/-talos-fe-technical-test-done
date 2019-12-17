import { Component, OnInit } from '@angular/core';
import {PostsService} from '../../services/posts.service';
import {Post} from '../../models/post.model';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../../environments/environment';
import {fadeIn} from '../../animations';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  animations: [fadeIn]
})
export class PostDetailComponent implements OnInit {

  readonly photoBaseUrl = environment.API_BASE;
  post: Post;

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute) { }

  ngOnInit() {
   this.route.data.subscribe(data => this.post = data.post);
  }

}
