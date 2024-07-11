export type PostProps = {
  posts: Item[];
  nextPage: Function;
  isLoading: boolean;
};

export type Item = {
  author: string;
  download_url: string;
  height: number;
  id: string;
  url: string;
  width: number;
};
