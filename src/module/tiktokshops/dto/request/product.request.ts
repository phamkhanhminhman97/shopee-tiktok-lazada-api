import { TiktokRequestCommon } from './config.request';

interface StockInfo {
  warehouse_id: string;
  available_stock: number;
}

interface Sku1 {
  id: string; //sku_id
  stock_infos: StockInfo;
}

interface RequestUpdateStock extends TiktokRequestCommon {
  product_id: string;
  skus: Array<Sku1>;
}

interface RequestDeactiveProduct extends TiktokRequestCommon {
  product_ids: string[];
}

interface RequestActiveProduct extends TiktokRequestCommon {
  product_ids: string[];
}

interface CertificationFile {
  format: string;
  id: string;
  name: string;
}

interface Certification {
  files: CertificationFile[];
  id: string;
  images: { uri: string }[];
}

interface PackageDimensions {
  height: string;
  length: string;
  unit: string;
  width: string;
}

interface PackageWeight {
  unit: string; // KILOGRAM or POUND
  value: string;
}

interface AttributeValue {
  id: string;
  name: string;
}

interface ProductAttribute {
  id: string;
  values: AttributeValue[];
}

interface IdentifierCode {
  code: string;
  type: string;
}

interface Inventory {
  quantity: number;
  warehouse_id: string;
}

interface Price {
  amount: string;
  currency: string;
}

interface SalesAttribute {
  id: string;
  name: string;
  sku_img: { uri: string };
  value_id: string;
  value_name: string;
}

interface Sku {
  external_sku_id: string;
  identifier_code: IdentifierCode;
  inventory: Inventory[];
  price: Price;
  sales_attributes: SalesAttribute[];
  seller_sku: string;
}

interface Video {
  id: string;
}

interface RequestCreateProduct extends TiktokRequestCommon {
  brand_id?: string;
  category_id: string;
  certifications?: Certification[];
  delivery_option_ids?: string;
  description: string;
  external_product_id?: string;
  is_cod_allowed?: boolean;
  main_images: { uri: string }[];
  package_dimensions?: PackageDimensions;
  package_weight: PackageWeight;
  product_attributes?: ProductAttribute[];
  save_mode?: string;
  size_chart?: { image: { uri: string }; template: { id: string } };
  skus: Sku[];
  title: string;
  video?: Video;
}

export {
  RequestUpdateStock as TiktokRequestUpdateStock,
  RequestActiveProduct as TiktokRequestActiveProduct,
  RequestDeactiveProduct as TiktokRequestDeactiveProduct,
  RequestCreateProduct as TiktokRequestCreateProduct,
};
