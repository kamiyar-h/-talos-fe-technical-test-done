import Post from '../model/post';
import {v1 as uuid} from 'uuid';

class PostsRepository {
  private static instance: PostsRepository;
  private _posts: Array<Post> = [
    new Post('321c04d0-a25f-11e8-ad0a-1d90dd5e7d7c',
      'first post in the world',
      'this is a post description for a post with a post post',
      ['first', 'test'],
      'images/52dcf130-a268-11e8-aec5-a13ee2174102.png'),
  ];

  constructor() {
    if (!PostsRepository.instance) {
      PostsRepository.instance = this;
    }
    return PostsRepository.instance;
  }

  get posts() {
    return this._posts;
  }

  getPost(id: string): Post | undefined {
    return this._posts.find(post => post.id === id);
  }

  addPost(title: string, description: string, tags: Array<string>): Post {
    const newPost = new Post(uuid(), title, description, tags);
    this._posts.push(newPost);
    return newPost;
  }

  update(post: Post){
    const index = this._posts.findIndex((p: Post)=>{return p.id === post.id});
    this._posts[index] = post;
    return post;
  }
}

export default new PostsRepository();
