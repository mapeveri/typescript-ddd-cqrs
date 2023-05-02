interface Term {
  id: string;
  title: string;
  description: string;
  example: string;
  type: string;
  taggedWords: Array<string>;
  likes: Array<string>;
  disLikes: Array<string>;
  favourites: Array<string>;
}

export const WORD = 'word';

export default Term;
