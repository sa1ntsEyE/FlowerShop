export interface Products {
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
  img : string
}
