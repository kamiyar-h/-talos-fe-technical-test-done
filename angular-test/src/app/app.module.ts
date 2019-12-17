import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostsComponent } from './components/posts/posts.component';
import { ShortenPipe } from './shared/shorten.pipe';
import { HeaderComponent } from './components/header/header.component';
import { PostAddComponent } from './components/post-add/post-add.component';
import {NotifierConfigModule} from './shared/notifier-config/notifier-config.module';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import {PostDetailsResolver} from './_resolvers/post-details.resolver';
import { FooterComponent } from './components/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    ShortenPipe,
    HeaderComponent,
    PostAddComponent,
    PostDetailComponent,
    FooterComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NotifierConfigModule
  ],
  providers: [PostDetailsResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
