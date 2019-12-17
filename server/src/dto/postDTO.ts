export default interface PostDTO {
  id: string;
  title: string;
  description: string,
  photoUrl: string | undefined;
  tags: Array<string>;
}
