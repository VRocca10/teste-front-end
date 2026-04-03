export interface Product {
  productId: number;
  productName: string;
  descriptionShort: string;
  photo: string;
  price: number;
  oldPrice?: number;
  installmentText?: string;
  shippingText?: string;
}
