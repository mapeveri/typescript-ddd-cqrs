export type TermLike = {
  name: string;
  photo: string;
  userId: string;
};

export type TermView = {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly example: string;
  readonly type: string;
  readonly hashtags: string[];
  readonly totalLikes: number;
  readonly likes: TermLike[];
  readonly createdAt: string;
};
