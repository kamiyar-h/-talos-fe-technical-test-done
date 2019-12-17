import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostsService} from '../../services/posts.service';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {fadeIn} from '../../animations';
import {NotifierService} from 'angular-notifier';
import {Router} from '@angular/router';


@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.css'],
  animations: [fadeIn]
})
export class PostAddComponent implements OnInit, OnDestroy {

  newPostForm: FormGroup;
  newTag: string;
  photoSelectedPreview: File;
  photoSelected: File;

  isSubmitting = false;

  constructor(
    private postsService: PostsService,
    private notifier: NotifierService,
    private router: Router) { }

  /**
   * angular call this method for every time component called
   */
  ngOnInit() {
    this.postsService.inNewPostComponent(true);
    this.onCreateForm();
  }

  /**
   * angular call this method before destroy component every time
   */
  ngOnDestroy(): void {
    this.postsService.inNewPostComponent(false);
  }

  /**
   * Initialize new post form
   */
  private onCreateForm() {
    this.newPostForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      tags: new FormArray([], Validators.required)
    });
  }

  /**
   * Step 1: we send new post data to server.
   * Step 2: if post added Successfully and we have imageFile, then send Image to server to put to this post
   */
  onSubmit() {
    this.isSubmitting = true;

    // Step 1
    this.postsService.addPost(this.newPostForm.value).subscribe(newPost => {
      // Step 2
      if (this.photoSelected) {
        this.postsService.onUploadPhoto(newPost.id, this.photoSelected).subscribe(res => {
          // everything is fine
          this.doneAddPost(newPost.id);
        });

      } else {
        this.doneAddPost(newPost.id);
      }
    });
  }

  /**
   * this method call after post and image added successfully
   * @param id must be new post Id
   */
  doneAddPost(id: string) {
    // setTimeout just for test spinner loading
    // TODO: must remove setTimeout before deploy and publish App
    setTimeout(() => {
      this.notifier.notify('success', 'New post added successfully!');
      this.router.navigate(['/posts', id]);
      this.isSubmitting = false;
    }, 1500);
  }

  /**
   * Add Tag
   */
  onAddTag() {
    if (this.newTag === '') {
      return;
    }

    const control = new FormControl(this.newTag, Validators.required);
    ( this.newPostForm.get('tags') as FormArray ).push(control);
    this.newTag = '';
  }

  /**
   * remove tag from tags array
   * @param id FormControl id
   */
  removeTag(id: number) {
    ( this.newPostForm.get('tags') as FormArray ).removeAt(id);
  }

  /**
   * detect selected file from OpenDialog and show Preview before upload to server
   * @param event can by any. in this case must be 'image/*' types
   */
  onFileSelected(event: any) {
    const selectedFile = event.target.files;
    if (selectedFile && selectedFile[0]) {
      this.photoSelected = selectedFile[0];
      const reader = new FileReader();
      reader.onload = (data: any) => {
        this.photoSelectedPreview = data.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
}
