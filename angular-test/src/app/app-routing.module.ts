import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PostsComponent} from './components/posts/posts.component';
import {PostAddComponent} from './components/post-add/post-add.component';
import {PostDetailComponent} from './components/post-detail/post-detail.component';
import {PostDetailsResolver} from './_resolvers/post-details.resolver';


const routes: Routes = [
  {path: '', redirectTo: 'posts', pathMatch: 'full'},
  {path: 'posts', component: PostsComponent},
  {path: 'posts/new', component: PostAddComponent},
  {
    path: 'posts/:id',
    component: PostDetailComponent,
    resolve: {post: PostDetailsResolver}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
