import {
  TIKTOK_PATH_202309,
  TIKTOK_PATH_PLACEHOLDER,
} from "../../common/constant";
import {
  commonParameter2,
  genURLwithSignature,
  replacePlaceholder,
  httpGet,
  httpPost,
} from "../../common/helper";
import { TiktokConfig } from "../../dto/request/config.request";
import {
  TiktokRequestActiveProduct,
  TiktokRequestDeactiveProduct,
} from "../../dto/request/product.request";
import { TiktokRequestShipPackage } from "../../dto/request/fulfillment.request";
import {
  TiktokResponseActiveProduct,
  TiktokResponseAttributes,
  TiktokResponseBrands,
  TiktokResponseCategories,
  TiktokResponseDeactiveProduct,
} from "../../dto/response/product.response";

export async function getCategories(
  config: TiktokConfig
): Promise<TiktokResponseCategories> {
  const timestamp = Math.floor(Date.now() / 1000);
  const commonParam = `${commonParameter2(config, timestamp)}`;
  const url = genURLwithSignature(
    TIKTOK_PATH_202309.CATEGORIES,
    commonParam,
    config
  );

  return httpGet(url, config);
}

export async function getBrands(
  categoryId: string,
  config: TiktokConfig
): Promise<TiktokResponseBrands> {
  if (!categoryId) {
    throw new Error("Invalid input: categoryId are required");
  }
  const timestamp = Math.floor(Date.now() / 1000);
  const commonParam = `${commonParameter2(
    config,
    timestamp
  )}&category_id=${categoryId}&page_size=100`;
  const url = genURLwithSignature(
    TIKTOK_PATH_202309.BRANDS,
    commonParam,
    config
  );
  return httpGet(url, config);
}

export async function getAttributes(
  categoryId: string,
  config: TiktokConfig
): Promise<TiktokResponseAttributes> {
  const timestamp = Math.floor(Date.now() / 1000);
  const commonParam = `${commonParameter2(config, timestamp)}`;

  const pathGetAttributes = replacePlaceholder(
    TIKTOK_PATH_202309.ATTRIBUTES,
    TIKTOK_PATH_PLACEHOLDER.CATEGORY,
    categoryId
  );
  const url = genURLwithSignature(pathGetAttributes, commonParam, config);

  return httpGet(url, config);
}

export async function activeProduct(
  productIds: string[],
  config: TiktokConfig
): Promise<TiktokResponseActiveProduct> {
  if (!productIds) {
    throw new Error("Invalid input: productIds are required");
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const commonParam = commonParameter2(config, timestamp);

  const url = genURLwithSignature(
    TIKTOK_PATH_202309.ACTIVE_PRODUCT,
    commonParam,
    config
  );

  const body: TiktokRequestActiveProduct = {
    product_ids: productIds,
  };

  return httpPost(url, body, config);
}

export async function deactiveProduct(
  productIds: string[],
  config: TiktokConfig
): Promise<TiktokResponseDeactiveProduct> {
  if (!productIds) {
    throw new Error("Invalid input: productIds are required");
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const commonParam = commonParameter2(config, timestamp);

  const url = genURLwithSignature(
    TIKTOK_PATH_202309.DEACTIVE_PRODUCT,
    commonParam,
    config
  );

  const body: TiktokRequestDeactiveProduct = {
    product_ids: productIds,
  };

  return httpPost(url, body, config);
}

export async function shipPackage(
  packageId: string,
  payload: TiktokRequestShipPackage,
  config: TiktokConfig
): Promise<any> {
  if (!packageId) {
    throw new Error("Invalid input: packageId are required");
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const commonParam = commonParameter2(config, timestamp);
  const pathTimeSlot = replacePlaceholder(
    TIKTOK_PATH_202309.SHIP_PACKAGE,
    TIKTOK_PATH_PLACEHOLDER.PACKAGE,
    packageId
  );

  const url = genURLwithSignature(pathTimeSlot, commonParam, config);

  const body: TiktokRequestShipPackage = {
    handover_method: payload.handover_method,
    pickup_slot: {
      start_time: payload.pickup_slot.start_time,
      end_time: payload.pickup_slot.end_time,
    },
  };

  return httpPost(url, body, config);
}

export async function getProductDetail(
  productId: string,
  config: TiktokConfig
): Promise<any> {
  const timestamp = Math.floor(Date.now() / 1000);
  const commonParam = `${commonParameter2(
    config,
    timestamp
  )}&product_id=${productId}`;
  const url = genURLwithSignature(
    TIKTOK_PATH_202309.PRODUCT_DETAIL,
    commonParam,
    config
  );

  return httpGet(url, config);
}
