interface TermInterface {
  id: string;
  title: string;
  description: string;
  example: string;
  taggedWords: Array<string>;
  likes: Array<string>;
  disLikes: Array<string>;
  favourites: Array<string>;
}

export default TermInterface;
