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

export {
  ResponseUpdateStock as TiktokResponseUpdateStock,
  ResponseDeactiveProduct as TiktokResponseDeactiveProduct,
};
