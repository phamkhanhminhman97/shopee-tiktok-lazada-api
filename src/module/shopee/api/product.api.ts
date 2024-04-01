import * as ShopeeHelper from '../common/helper';
import { ShopeeConfig } from '../dto/request/config.request';
import { SHOPEE_END_POINT, SHOPEE_PATH } from '../common/constant';
import axios from 'axios';
import {
  ShopeeResponseGetAttributes,
  ShopeeResponseGetBrandList,
  ShopeeResponseGetCategories,
  ShopeeResponseProductBaseItemInfo,
  ShopeeResponseUnlistItem,
  ShopeeResponseUpdatePrice,
  ShopeeResponseUpdateStock,
} from '../dto/response/product.response';
import { ShopeeRequestGetBrandList, ShopeeRequestUnlistItem, ShopeeRequestUpdatePrice } from '../dto/request/product.request';

/**
 *
 * @param config
 * @returns
 */
export async function getProductItemList(config: ShopeeConfig): Promise<any> {
  const timestamp = ShopeeHelper.getTimestampNow();
  const signature = ShopeeHelper.signRequest(SHOPEE_PATH.GET_ITEM_LIST, config, timestamp);

  const productItems: any[] = [];
  let offset = 0;
  let hasNextPage = true;

  try {
    while (hasNextPage) {
      const commonParam = `${ShopeeHelper.commonParameter(config, signature, timestamp)}&page_size=100&item_status=NORMAL&offset=${offset}`;
      const url = `${SHOPEE_END_POINT}${SHOPEE_PATH.GET_ITEM_LIST}${commonParam}`;
      const { data } = await axios.get<{
        response: {
          item: any[];
          next_offset: number;
          has_next_page: boolean;
        };
      }>(url);

      if (data.response.item && Array.isArray(data.response.item)) {
        productItems.push(...data.response.item);
      }
      offset = data.response.next_offset;
      hasNextPage = data.response.has_next_page;
    }

    return productItems;
  } catch (error) {
    // Handle error appropriately
    throw new Error(`Failed to fetch product items: ${error}`);
  }
}

/**
 *
 * @param itemIds - Product IDs.
 * @param config - Shopee API configuration.
 * @returns {Promise<ShopeeResponseProductBaseItemInfo>}
 */
export async function getProductItemBaseInfo(itemIds: string[], config: ShopeeConfig): Promise<ShopeeResponseProductBaseItemInfo> {
  const timestamp = ShopeeHelper.getTimestampNow();
  const signature = ShopeeHelper.signRequest(SHOPEE_PATH.GET_ITEM_BASE, config, timestamp);
  const commonParam = `${ShopeeHelper.commonParameter(config, signature, timestamp)}&item_id_list=${itemIds.toString()}`;

  const url = `${SHOPEE_END_POINT}${SHOPEE_PATH.GET_ITEM_BASE}${commonParam}`;
  return ShopeeHelper.httpGet(url, config);
}

/**
 *
 * @param shopeeItemId
 * @param shopeeModelId
 * @param stock
 * @param config
 * @returns
 */
export async function updateStock(
  shopeeItemId: any,
  shopeeModelId: any = 0,
  stock: number,
  config: ShopeeConfig,
): Promise<ShopeeResponseUpdateStock> {
  const timestamp = ShopeeHelper.getTimestampNow();
  const signature = ShopeeHelper.signRequest(SHOPEE_PATH.UPDATE_STOCK, config, timestamp);
  const commonParam = ShopeeHelper.commonParameter(config, signature, timestamp);
  const body = {
    item_id: parseInt(shopeeItemId),
    stock_list: [
      {
        model_id: shopeeModelId,
        seller_stock: [
          {
            stock,
          },
        ],
      },
    ],
  };
  const url = `${SHOPEE_END_POINT}${SHOPEE_PATH.UPDATE_STOCK}${commonParam}`;
  const headers = ShopeeHelper.getHeaders(config);

  return ShopeeHelper.httpPost(url, body, headers);
}

/**
 *
 * @param itemIds - Shopee Item ID.
 * @param statusUnlist - Unlist status.
 * @param config - Shopee API configuration.
 * @returns {Promise<ShopeeResponseGetCategories>}
 */
export async function unListItem(itemId: string, statusUnlist: boolean, config: ShopeeConfig): Promise<ShopeeResponseUnlistItem> {
  const timestamp = ShopeeHelper.getTimestampNow();
  const signature = ShopeeHelper.signRequest(SHOPEE_PATH.UNLIST_ITEM, config, timestamp);
  const commonParam = ShopeeHelper.commonParameter(config, signature, timestamp);

  const body: ShopeeRequestUnlistItem = {
    item_list: [
      {
        item_id: parseInt(itemId),
        unlist: statusUnlist,
      },
    ],
  };

  const url = `${SHOPEE_END_POINT}${SHOPEE_PATH.UNLIST_ITEM}${commonParam}`;
  const headers = ShopeeHelper.getHeaders(config);

  return ShopeeHelper.httpPost(url, body, headers);
}

/**
 *
 * @param itemId - Shopee Item ID.
 * @param price - Price.
 * @param config - Shopee API configuration.
 * @returns {Promise<ShopeeResponseUpdatePrice>}
 */
export async function updatePrice(itemId: string, price: number, config: ShopeeConfig): Promise<ShopeeResponseUpdatePrice> {
  const timestamp = ShopeeHelper.getTimestampNow();
  const signature = ShopeeHelper.signRequest(SHOPEE_PATH.UPDATE_PRICE, config, timestamp);
  const commonParam = ShopeeHelper.commonParameter(config, signature, timestamp);

  const body: ShopeeRequestUpdatePrice = {
    item_id: parseInt(itemId),
    price_list: [
      {
        model_id: 0,
        original_price: price,
      },
    ],
  };

  const url = `${SHOPEE_END_POINT}${SHOPEE_PATH.UPDATE_PRICE}${commonParam}`;
  const headers = ShopeeHelper.getHeaders(config);

  return ShopeeHelper.httpPost(url, body, headers);
}

/**
 *
 * @param dto
 * @param config
 * @returns
 */
export async function addItem(body: any, config: ShopeeConfig) {
  const timestamp = ShopeeHelper.getTimestampNow();
  const signature = ShopeeHelper.signRequest(SHOPEE_PATH.ADD_ITEM, config, timestamp);
  const commonParam = ShopeeHelper.commonParameter(config, signature, timestamp);

  // const body = {
  //   description:
  //     "fewajidfosa jioajfiodsa fewajfioewa jicoxjsi fjdiao fjeiwao fdsjiao fejwiao jfdsioafjeiowa jfidsax  fjeiwao fdsjiao fejwiao jfdsioafjeiowa jfidsax",
  //   item_name: "TEST TEST TEST 999999",
  //   category_id: 102071,
  //   brand: {
  //     brand_id: 1127937,
  //   },
  //   logistic_info: [
  //     {
  //       enabled: true,
  //       logistic_id: 50021,
  //       size_id: 1,
  //     },
  //   ],
  //   weight: 1, //kg
  //   item_status: "UNLIST",
  //   image: {
  //     image_id_list: ["vn-11134207-7r98o-lpkl6hx24z9z94"],
  //   },
  //   dimension: {
  //     package_height: 10,
  //     package_length: 10,
  //     package_width: 10,
  //   },
  //   // attribute_list: [
  //   //   {
  //   //     attribute_id: 100049,
  //   //     attribute_value_list: [
  //   //       {
  //   //         value_id: 758,
  //   //         original_value_name: "Acne-prone",
  //   //         value_unit: "",
  //   //       },
  //   //     ],
  //   //   },
  //   // ],
  //   original_price: 12500,
  //   seller_stock: [
  //     {
  //       stock: 0,
  //     },
  //   ],
  //   // tax_info: {
  //   //   ncm: "123",
  //   //   same_state_cfop: "123",
  //   //   diff_state_cfop: "123",
  //   //   csosn: "123",
  //   //   origin: "1",
  //   //   cest: "12345",
  //   //   measure_unit: "1",
  //   // },
  //   // description_type: "extended",
  //   // description_info: {
  //   //   extended_description: {
  //   //     field_list: [
  //   //       {
  //   //         field_type: "text",
  //   //         text: "text description 1",
  //   //       },
  //   //       {
  //   //         field_type: "image",
  //   //         image_info: {
  //   //           image_id: "1e076dff0699d8e778c06dd6c02df1fe",
  //   //         },
  //   //       },
  //   //       {
  //   //         field_type: "image",
  //   //         image_info: {
  //   //           image_id: "c07ac95ba7bb624d731e37fe2f0349de",
  //   //         },
  //   //       },
  //   //       {
  //   //         field_type: "text",
  //   //         text: "text description 1",
  //   //       },
  //   //     ],
  //   //   },
  //   // },
  // };

  const url = process.env.SHOPEE_ENDPOINT + SHOPEE_PATH.ADD_ITEM + commonParam;
  const res = await axios.post(url, body);

  return res.data;
}

/**
 *
 * @param config - Shopee API configuration.
 * @returns {Promise<ShopeeResponseGetCategories>}
 */
export async function getCategory(config: ShopeeConfig): Promise<ShopeeResponseGetCategories> {
  const timestamp = ShopeeHelper.getTimestampNow();
  const signature = ShopeeHelper.signRequest(SHOPEE_PATH.GET_CATEGORY, config, timestamp);
  const commonParam = ShopeeHelper.commonParameter(config, signature, timestamp);

  const url = `${SHOPEE_END_POINT}${SHOPEE_PATH.GET_CATEGORY}${commonParam}`;
  return ShopeeHelper.httpGet(url, config);
}

/**
 *
 * @param categoryId - Category ID.
 * @param config - Shopee API configuration.
 * @returns {Promise<ShopeeResponseGetCategories>}
 */
export async function getAttributes(categoryId: number, config: ShopeeConfig): Promise<ShopeeResponseGetAttributes> {
  const timestamp = ShopeeHelper.getTimestampNow();
  const signature = ShopeeHelper.signRequest(SHOPEE_PATH.GET_ATTRIBUTES, config, timestamp);
  const additionalParams = {
    category_id: categoryId,
  };

  const commonParam = ShopeeHelper.buildCommonParams(config, signature, timestamp, additionalParams);

  const url = `${SHOPEE_END_POINT}${SHOPEE_PATH.GET_ATTRIBUTES}${commonParam}`;
  return ShopeeHelper.httpGet(url, config);
}

/**
 *
 * @param categoryId - Category ID.
 * @param config - Shopee API configuration.
 * @returns {Promise<ShopeeResponseGetBrandList>}
 */
export async function getBrandList(categoryId: number, config: ShopeeConfig): Promise<ShopeeResponseGetBrandList> {
  const timestamp = ShopeeHelper.getTimestampNow();
  const signature = ShopeeHelper.signRequest(SHOPEE_PATH.GET_BRAND_LIST, config, timestamp);

  const offset = 1;
  const pageSize = 100;
  const status = 1;
  const additionalParams: ShopeeRequestGetBrandList = {
    category_id: categoryId,
    offset,
    page_size: pageSize,
    status,
  };

  const commonParam = ShopeeHelper.buildCommonParams(config, signature, timestamp, additionalParams);

  const url = `${SHOPEE_END_POINT}${SHOPEE_PATH.GET_BRAND_LIST}${commonParam}`;
  return ShopeeHelper.httpGet(url, config);
}
