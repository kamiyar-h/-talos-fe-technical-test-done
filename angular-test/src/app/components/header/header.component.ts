import {AfterContentInit, Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {PostsService} from '../../services/posts.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    /// THIS IS FOR BTN
    trigger('hoverAddBtn', [
      state('in', style({
        width: '150px'
      })),
      state('out', style({
        width: '*'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
    /// THIS IS FOR TEXT
    trigger('fadeInText', [
      state('in', style({
        opacity: '1',
        top: '-70px'
      })),
      state('out', style({
        opacity: '0',
        top: '0'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ])
  ]
})
export class HeaderComponent implements OnInit {

  title = 'Talos Technical Test';
  inNewPost: boolean;
  navbarOpen = false;

  addPostButtonEvent = 'out';
  addButtonLeave = '+';
  addButtonHover = 'Add new post';

  constructor(private postsService: PostsService) {}

  ngOnInit() {
    this.postsService.inNewPost.subscribe(inNewPost => this.inNewPost = inNewPost);

    this.addPostButtonEvent = 'out';
  }


  mouseEnter() {
    this.addPostButtonEvent = 'in';
  }

  mouseLeave() {
    this.addPostButtonEvent = 'out';
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

}
