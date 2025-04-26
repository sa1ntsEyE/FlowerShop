export interface Products {
  id: string,
  name: string,
  counters : number,
  state: boolean
}

export interface ProductsAll {
  img: string;
  id: number;
  name: string;
  categories: string;
  description: string;
  productDescription: string;
  quantity: number;
  livingRoom: string;
  diningRoom: string;
  office: string;
  price: number;
  grade: number;
  size: {
    name: string;
    state: boolean;
  };
}
