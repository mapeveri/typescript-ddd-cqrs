export type TermView = {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly example: string;
  readonly type: string;
  readonly hashtags: Array<string>;
  readonly totalLikes: number;
  readonly createdAt: string;
};
