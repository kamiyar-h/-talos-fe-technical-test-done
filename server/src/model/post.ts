export default class Post {
  private _id: string;
  private _title: string;
  private _description: string;
  private _photoUrl: string | undefined;
  private _tags: Array<string>;
  constructor(
    id: string,
    title: string,
    description: string,
    tags: Array<string>,
    photoUrl?: string
  ) {
    this._id = id;
    this._title = title;
    this._description = description;
    this._photoUrl = photoUrl;
    this._tags = tags;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get photoUrl(): string | undefined {
    return this._photoUrl;
  }

  set photoUrl(value: string | undefined) {
    this._photoUrl = value;
  }

  get tags(): Array<string> {
    return this._tags;
  }

  set tags(value: Array<string>) {
    this._tags = value;
  }

  addTag(tag: string) {
    this._tags.push(tag);
  }
}
