import { TiktokResponseCommon } from "./config.response";

interface ResponseUpdateStock extends TiktokResponseCommon {
  data: {
    failed_skus: Array<any>;
  };
}

interface ResponseDeactiveProduct extends TiktokResponseCommon {
  data: {
    failed_product_ids: string[];
    failed_reasons: Array<any>;
  };
}
interface ResponseActiveProduct extends TiktokResponseCommon {
  data: {
    errors: Array<any>;
  };
}

interface ResponseCategories extends TiktokResponseCommon {
  data: {
    categories: Array<any>;
  };
}

interface ResponseBrands extends TiktokResponseCommon {
  data: {
    brands: Array<any>;
  };
}

interface ResponseAttributes extends TiktokResponseCommon {
  data: {
    attributes: Array<any>;
  };
}

export {
  ResponseUpdateStock as TiktokResponseUpdateStock,
  ResponseActiveProduct as TiktokResponseActiveProduct,
  ResponseDeactiveProduct as TiktokResponseDeactiveProduct,
  ResponseCategories as TiktokResponseCategories,
  ResponseBrands as TiktokResponseBrands,
  ResponseAttributes as TiktokResponseAttributes,
};
