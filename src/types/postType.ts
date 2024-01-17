export interface Post {
  id: number;
  userId: number;
  author: string;
  title: string | null;
  summary: string | null;
  imgUrl: string;
  category: string;
}

export interface PostContent {
  id: number;
  userId: number | null;
  author: string | null;
  contentHTML: string | null;
  imgUrl: string;
  summary: string;
  title: string;
  category: string;
}

export interface FindAll {
  userId: number;
  title: string;
  imgUrl: string | undefined;
  category: string;
  contentHTML: string;
}
