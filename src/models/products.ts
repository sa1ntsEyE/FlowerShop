export interface Products {
  id: string,
  name: string,
  counters : number,
  state: boolean
}

export interface ProductsAll {
  id: number,
  categories: string,
  size: {
    name: string;
    state: boolean;
  };
  name:string,
  price: number,
  grade: number,
  description: string,
  productDescription: string,
  livingRoom: string,
  diningRoom: string,
  office: string,
  img : string
}
