export default abstract class CommonTerm {
  title: string;
  description: string;
  example: string;
  taggedWords: Array<string>;

  constructor(title: string, description: string, example: string, taggedWords: Array<string>) {
    this.title = title;
    this.description = description;
    this.example = example;
    this.taggedWords = taggedWords;
  }
}
