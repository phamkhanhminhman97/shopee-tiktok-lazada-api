import { TiktokResponseCommon } from './config.response';

interface UpdateStock {
  failed_skus: Array<any>;
}

interface DeactiveProduct {
  failed_product_ids: string[];
  failed_reasons: Array<any>;
}

interface ActiveProduct {
  failed_product_ids: string[];
  failed_reasons: Array<any>;
}

interface Categories {
  categories: Array<any>;
}

interface Brands {
  brands: Array<any>;
}

interface Attributes {
  attributes: Array<any>;
}

interface ResponseUpdateStock extends TiktokResponseCommon<UpdateStock> {}
interface ResponseDeactiveProduct
  extends TiktokResponseCommon<DeactiveProduct> {}
interface ResponseActiveProduct extends TiktokResponseCommon<ActiveProduct> {}
interface ResponseCategories extends TiktokResponseCommon<Categories> {}
interface ResponseBrands extends TiktokResponseCommon<Brands> {}
interface ResponseAttributes extends TiktokResponseCommon<Attributes> {}

export {
  ResponseUpdateStock as TiktokResponseUpdateStock,
  ResponseActiveProduct as TiktokResponseActiveProduct,
  ResponseDeactiveProduct as TiktokResponseDeactiveProduct,
  ResponseCategories as TiktokResponseCategories,
  ResponseBrands as TiktokResponseBrands,
  ResponseAttributes as TiktokResponseAttributes,
};
