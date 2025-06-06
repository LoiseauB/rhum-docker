export type BottleType = {
  id: number;
  name: string;
  country: string;
  description: string;
  categoryId: number;
  avgRating: number;
  comments: {
    id: number;
    comment: string;
    userId: number;
    user: {
      pseudo: string;
      avatar?: string;
    };
  }[];
};
