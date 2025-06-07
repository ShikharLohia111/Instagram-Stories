export type Story ={
  userId: number;
  userName: string;
  stories: {
    id: number;
    url: string;
  }[];
}