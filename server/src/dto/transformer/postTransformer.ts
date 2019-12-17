import PostDTO from '../postDTO';
import Post from '../../model/post';

export function toDTO(post: Post): PostDTO {
  return {
    id: post.id,
    title: post.title,
    description: post.description,
    photoUrl: post.photoUrl,
    tags: post.tags,
  };
}

export function toModel(post: PostDTO): Post {
  return new Post(post.id, post.title, post.description, post.tags, post.photoUrl);
}
