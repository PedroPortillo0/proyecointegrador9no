export interface Product {
  id: number;
  title: string;
  description: string;
  unit_price: number;
}

export interface Item {
  product_id: number;
  quantity?: number;
}
