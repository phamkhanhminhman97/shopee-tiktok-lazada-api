import {
  SHOPEE_END_POINT,
  SHOPEE_PATH,
} from "../common/constant";
import { commonParameter, signRequest } from "../common/helper";
import axios from "axios";
import { ShopeeConfig } from "../dto/request/config.request";
/**
 *
 * @param config
 * @returns
 */
export async function getProductItemList(config: ShopeeConfig) {
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = signRequest(SHOPEE_PATH.GET_ITEM_LIST, config, timestamp);

  const productItems: any[] = [];
  let offset = 0;
  let hasNextPage = true;

  try {
    while (hasNextPage) {
      const commonParam = `${commonParameter(
        config,
        signature,
        timestamp
      )}&page_size=100&item_status=NORMAL&offset=${offset}`;
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
 * @param itemId
 * @param config
 * @returns
 */
export async function getProductItemBaseInfo(
  itemId: string,
  config: ShopeeConfig
) {
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = signRequest(SHOPEE_PATH.GET_ITEM_BASE, config, timestamp);
  const commonParam =
    commonParameter(config, signature, timestamp) +
    // + '&offset=' + '0' +
    "&item_id_list=" +
    itemId;

  const url = SHOPEE_END_POINT + SHOPEE_PATH.GET_ITEM_BASE + commonParam;
  const res = await axios.get(url);
  return res.data.response.item_list[0];
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
  config: ShopeeConfig
) {
  try {
    const timestamp = Math.floor(Date.now() / 1000);
    const signature = signRequest(SHOPEE_PATH.UPDATE_STOCK, config, timestamp);
    const commonParam = commonParameter(config, signature, timestamp);
    const body = {
      item_id: parseInt(shopeeItemId),
      stock_list: [
        {
          model_id: shopeeModelId,
          seller_stock: [
            {
              stock: stock,
            },
          ],
        },
      ],
    };
    // if (locationId) {
    //   body.stock_list[0].seller_stock[0]['location_id'] = locationId;
    // }
    const url = SHOPEE_END_POINT + SHOPEE_PATH.UPDATE_STOCK + commonParam;
    const res = await axios.post(url, body);
    return res.data;
  } catch (e) {
    console.log("Cannot sync: ", shopeeItemId);
    return false;
  }
}

/**
 *
 * @param itemId
 * @param statusUnlist
 * @param config
 * @returns
 */
export async function unListItem(
  itemId: string,
  statusUnlist: boolean,
  config: ShopeeConfig
) {
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = signRequest(SHOPEE_PATH.UNLIST_ITEM, config, timestamp);
  const commonParam = commonParameter(config, signature, timestamp);

  const body = {
    item_list: [
      {
        item_id: parseInt(itemId),
        unlist: statusUnlist,
      },
    ],
  };

  const url = SHOPEE_END_POINT + SHOPEE_PATH.UNLIST_ITEM + commonParam;
  const res = await axios.post(url, body);

  return res.data;
}

/**
 *
 * @param itemId
 * @param price
 * @param config
 * @returns
 */
export async function updatePrice(
  itemId: string,
  price: number,
  config: ShopeeConfig
) {
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = signRequest(SHOPEE_PATH.UPDATE_PRICE, config, timestamp);
  const commonParam = commonParameter(config, signature, timestamp);

  const body = {
    item_id: parseInt(itemId),
    price_list: [
      {
        model_id: 0,
        original_price: price,
      },
    ],
  };

  const url = SHOPEE_END_POINT + SHOPEE_PATH.UPDATE_PRICE + commonParam;
  const res = await axios.post(url, body);

  return res.data;
}

/**
 *
 * @param dto
 * @param config
 * @returns
 */
export async function addItem(body: any, config: ShopeeConfig) {
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = signRequest(SHOPEE_PATH.ADD_ITEM, config, timestamp);
  const commonParam = commonParameter(config, signature, timestamp);

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

export async function getChannelList(config: ShopeeConfig) {
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = signRequest(
    "/api/v2/logistics/get_channel_list",
    config,
    timestamp
  );
  const commonParam = commonParameter(config, signature, timestamp);

  const url =
    process.env.SHOPEE_ENDPOINT +
    "/api/v2/logistics/get_channel_list" +
    commonParam;
  const res = await axios.get(url);
  return res.data;
}

export async function getCategory(config: ShopeeConfig) {
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = signRequest(
    "/api/v2/product/get_category",
    config,
    timestamp
  );
  const commonParam = commonParameter(config, signature, timestamp);

  const url =
    process.env.SHOPEE_ENDPOINT + "/api/v2/product/get_category" + commonParam;
  const res = await axios.get(url);
  return res.data;
}

export async function getAttributes(categoryId: number, config: ShopeeConfig) {
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = signRequest(
    "/api/v2/product/get_attributes",
    config,
    timestamp
  );
  const commonParam =
    commonParameter(config, signature, timestamp) +
    "&category_id=" +
    categoryId;

  const url =
    process.env.SHOPEE_ENDPOINT +
    "/api/v2/product/get_attributes" +
    commonParam;
  const res = await axios.get(url);
  return res.data;
}

export async function getBrandList(categoryId: number, config: ShopeeConfig) {
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = signRequest(
    "/api/v2/product/get_brand_list",
    config,
    timestamp
  );
  const commonParam =
    commonParameter(config, signature, timestamp) +
    "&category_id=" +
    categoryId + `&offset=1&page_size=100&status=1`;

  const url =
    process.env.SHOPEE_ENDPOINT +
    "/api/v2/product/get_brand_list" +
    commonParam;
  const res = await axios.get(url);
  return res.data;
}
