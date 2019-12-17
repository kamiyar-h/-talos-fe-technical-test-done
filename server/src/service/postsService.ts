import PostsRepository from '../repository/postRepository';
import PostDTO from '../dto/postDTO';
import {toDTO, toModel} from '../dto/transformer/postTransformer';
import CreatePostDTO from "../dto/createPostDto";
import {v1 as uuid} from 'uuid';
import * as fs from "fs";

class PostService {
  private static instance: PostService;

  constructor() {
    if (!PostService.instance) {
      PostService.instance = this;
    }
    return PostService.instance;
  }

  listPosts(): Array<PostDTO> {
    return PostsRepository.posts.map(post => toDTO(post));
  }

  findPost(id: string): PostDTO | undefined {
    const post = PostsRepository.getPost(id);
    if (!post) {
      return undefined;
    }
    return toDTO(post);
  }

  addPost(post: CreatePostDTO): PostDTO {
    return toDTO(PostsRepository.addPost(post.title, post.description, post.tags));
  }

  savePicture(file: Express.Multer.File, id: string): Promise<PostDTO> {
    return new Promise((resolve, reject) => {
      const post = PostsRepository.getPost(id);
      if (!post) {
        return reject({code: 1, message: 'resource not found'});
      }
      if (post.photoUrl) {
        return reject({code: 2, message: 'trying to edit'});
      }

      const path = `/images/${uuid()}.png`;
      fs.writeFile(`public/${path}`, file.buffer, 'binary', (e: any) => {
        if (e) {
          console.error(e);
          return reject({code: 3, message: 'file error', ...e});
        }
        post.photoUrl = path;
        PostsRepository.update(post);
        resolve(toDTO(post));
      });
    });
  }
}

export default new PostService();
