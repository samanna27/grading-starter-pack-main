export type Quest = {
  id: number;
  title: string;
  description: string;
  previewImg: string;
  coverImg: string;
  type: string;
  level: string;
  peopleCount: number[];
  duration: number;
};

export type Order = {
  name: string;
  people: number;
  phone: string;
  isLegal: boolean;
}
