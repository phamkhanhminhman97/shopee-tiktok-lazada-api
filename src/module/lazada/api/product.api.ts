import { LAZADA_PATH, LZD_ALGORITHM } from '../common/constant';
import { executePOST, priceParametersXML, productParametersXML, toProductXML, toRequestProductsXML } from '../common/helper';
import * as LazadaHelper from '../common/helper';
import { LazadaConfig } from '../dto/request/config.request';
import { LZD_UPDATE_SELLABLE_QUANTITY, LZD_UPDATE_STATUS_PRODUCT } from '../dto/request/product.request';

/**
 *
 * @param info
 * @returns
 */
export async function getProducts(info) {
  const obj = {
    app_key: info.appKey,
    sign_method: LZD_ALGORITHM,
    timestamp: new Date().getTime(),
    access_token: info.appAccessToken,
  };
  const productList: any[] = [];
  let i = 0;
  while (i < 10000) {
    obj['offset'] = i;
    obj['limit'] = 50;
    try {
      const response = await LazadaHelper.httpGet(LAZADA_PATH.PRODUCT_GET, obj, info.appSecret);
      if (!response?.data?.products) break;
      productList.push(...response.data.products);
    } catch (err) {
      console.log('[GetProductList]', err);
    }
    i += 50;
  }
  return productList;
}

/**
 *
 * @param info
 * @param itemId
 * @returns
 */
export async function getProductItem(info, itemId: number) {
  const obj = {
    item_id: itemId,
    app_key: info.appKey,
    sign_method: LZD_ALGORITHM,
    access_token: info.appAccessToken,
    timestamp: LazadaHelper.getTimestampMilisec(),
  };
  return LazadaHelper.httpGet(LAZADA_PATH.PRODUCT_ITEM_GET, obj, info.appSecret);
}

/**
 *
 * @param info
 * @param itemId
 * @param payload
 * @returns
 */
export async function updateSellableQuantity(info, itemId, payload: Array<LZD_UPDATE_SELLABLE_QUANTITY>) {
  const obj = {
    app_key: info.appKey,
    sign_method: LZD_ALGORITHM,
    payload: toRequestProductsXML(payload.map((x) => toProductXML(itemId, x.skuId, x?.sellerSku, x.quantity))),
    timestamp: LazadaHelper.getTimestampMilisec(),
    access_token: info.appAccessToken,
  };

  return LazadaHelper.httpGet(LAZADA_PATH.UPDATE_SELLABLE_QUANTITY, obj, info.appSecret);
}

/**
 *
 * @param info
 * @param itemId
 * @param payload
 * @returns
 */
export async function updateStatusProduct(info, itemId: number, payload: Array<LZD_UPDATE_STATUS_PRODUCT>) {
  const obj = {
    app_key: info.appKey,
    sign_method: LZD_ALGORITHM,
    payload: toRequestProductsXML(payload.map((x) => productParametersXML(itemId, x.skuId, x?.sellerSku, x.status))),
    timestamp: LazadaHelper.getTimestampMilisec(),
    access_token: info.appAccessToken,
  };
  return executePOST(LAZADA_PATH.UPDATE_PRODUCT, obj, info.appSecret);
}

/**
 *
 * @param itemId
 * @param info
 * @param payload
 * @returns
 */
export async function updatePrice(info, itemId: number, payload) {
  const obj = {
    app_key: info.appKey,
    sign_method: LZD_ALGORITHM,
    payload: toRequestProductsXML(payload.map((x) => priceParametersXML(itemId, x.skuId, x?.sellerSku, x.price))),
    timestamp: LazadaHelper.getTimestampMilisec(),
    access_token: info.appAccessToken,
  };
  return executePOST(LAZADA_PATH.UPDATE_PRICE, obj, info.appSecret);
}

export async function getCategoryTree(info) {
  const obj = {
    app_key: info.appKey,
    sign_method: LZD_ALGORITHM,
    access_token: info.appAccessToken,
    timestamp: LazadaHelper.getTimestampMilisec(),
  };
  return LazadaHelper.httpGet('/category/tree/get', obj, info.appSecret);
}

export async function getCategorySuggestion(info, productName: string) {
  const obj = {
    app_key: info.appKey,
    sign_method: LZD_ALGORITHM,
    access_token: info.appAccessToken,
    timestamp: LazadaHelper.getTimestampMilisec(),
    product_name: productName,
  };
  return LazadaHelper.httpGet('/product/category/suggestion/get', obj, info.appSecret);
}

export async function getCategoryAttributes(info, categoryId: string) {
  const obj = {
    app_key: info.appKey,
    sign_method: LZD_ALGORITHM,
    access_token: info.appAccessToken,
    timestamp: LazadaHelper.getTimestampMilisec(),
    primary_category_id: categoryId,
  };
  return LazadaHelper.httpGet('/category/attributes/get', obj, info.appSecret);
}

/**
 *
 * @param {} payload
 * @param {LazadaConfig} config
 * @returns
 */
export async function createProduct(payload, config: LazadaConfig) {
  const obj = {
    app_key: config.appKey,
    sign_method: LZD_ALGORITHM,
    payload: LazadaHelper.createProductParametersXML2(payload),
    timestamp: LazadaHelper.getTimestampMilisec(),
    access_token: config.appAccessToken,
  };
  console.log(obj);

  return executePOST(LAZADA_PATH.CREATE_PRODUCT, obj, config.appSecret);
}

export async function getBrandByPages(info) {
  const obj = {
    app_key: info.appKey,
    sign_method: LZD_ALGORITHM,
    access_token: info.appAccessToken,
    timestamp: LazadaHelper.getTimestampMilisec(),
    startRow: 0,
    pageSize: 20,
  };
  return LazadaHelper.httpGet('/category/brands/query', obj, info.appSecret);
}
