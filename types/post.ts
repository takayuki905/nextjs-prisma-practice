export type Post = {
  id: number;
  title: string;
  content: string | null; // NULL許容のため
  author: string;
  category: string;
  published: boolean;
};
