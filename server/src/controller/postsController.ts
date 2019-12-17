import {Path, GET, PathParam, POST, Errors, FileParam, PUT} from 'typescript-rest';
import {Example, Response} from 'typescript-rest-swagger';
import PostService from '../service/postsService';
import PostDTO from '../dto/postDTO';
import CreatePostDTO from '../dto/createPostDto';
import Any = jasmine.Any;

@Path('/posts')
export default class PostController {

  /**
   * List all the posts in the system (we are using in memory db so if the server is rebooted the db will be cleanse)
   * @returns {Array<PostDTO>} the existing posts
   */
  @GET
  listPosts(): Array<PostDTO> {
    return PostService.listPosts();
  }

  /**
   * Return the selected post info
   * @param {string} id the id of the desired post
   * @returns {PostDTO}
   */
  @Path(':id')
  @GET
  getPost(@PathParam('id') id: string): PostDTO {
    const post = PostService.findPost(id);
    if (!post) {
      throw new Errors.NotFoundError(`no post with id ${id}`);
    }
    return post;
  }

  /**
   * Creates a post and returns it
   * @param {CreatePostDTO} post the post to be created (without the picture url)
   * @returns {PostDTO}
   */
  @POST
  addPost(post: CreatePostDTO): PostDTO {
    return PostService.addPost(post);
  }


  /**
   * Add a picture to the post, if the post already have a picture it will throw an error (400)
   * @param {Express.Multer.File} image The image to be added to the post
   * @param {string} id The post id
   * @returns {Promise<PostDTO>} The updated dto
   */
  @Response<any>(400, 'The post already has an image', {
    data: {
      info: "post with id 321c04d0-a25f-11e8-ad0a-1d90dd5e7d7c already has a picture",
      status: 400
    }
  })
  @Response<Errors.NotFoundError>(404, 'There is no post with the provided id')
  @Path('/:id/picture')
  @PUT
  async addPicture(@FileParam("image") image: Express.Multer.File, @PathParam('id') id: string): Promise<PostDTO> {
    try {
      return await PostService.savePicture(image, id);
    } catch (e) {
      switch (e.code) {
        case 1: {
          throw new Errors.NotFoundError(`no post with id ${id}`);
        }
        case 2: {
          throw new Errors.BadRequestError(`post with id ${id} already has a picture`)
        }
        default: {
          throw new Errors.InternalServerError(e);
        }
      }
    }
  }
}
