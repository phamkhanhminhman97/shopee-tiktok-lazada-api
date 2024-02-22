import { TIKTOK_PATH } from "../../common/constant";
import { commonParameter, genURLwithSignature } from "../../common/helper";
import { TiktokConfig } from "../../dto/request/config.request";
import axios from "axios";

/**
 *
 * @param config
 * @returns
 */
export async function getProductsLists(config: TiktokConfig) {
  const timestamp = Date.parse(new Date().toString()) / 1000;
  const commonParam = commonParameter(config, timestamp);
  const productList: any[] = [];
  let i = 1;
  while (true) {
    const body = {
      page_number: i,
      page_size: 100,
      search_status: 4,
    };
    const url = genURLwithSignature(
      TIKTOK_PATH.PRODUCT_LIST,
      commonParam,
      config
    );

    try {
      const res = await axios.post(url, body);
      if (!res.data.data.products) break;
      // return response.data.data.products
      productList.push(...res.data.data.products);
      i++;
    } catch (error) {
      console.log("[GetProductList]", error);
    }
  }
  return productList;
}

/**
 *
 * @param productId
 * @param skuId
 * @param quantity
 * @param config
 * @returns
 */
export async function updateStock(
  productId: string,
  skuId: string,
  quantity: number,
  config: TiktokConfig
) {
  const stockInfo = {
    available_stock: quantity,
  };

  const sku = {
    id: skuId,
    stock_infos: [stockInfo],
  };

  const body = {
    product_id: productId,
    skus: [sku],
  };

  const timestamp = Math.floor(new Date().getTime() / 1000);
  const commonParam = commonParameter(config, timestamp);
  const url = genURLwithSignature(
    TIKTOK_PATH.UPDATE_STOCK,
    commonParam,
    config
  );

  try {
    const res = await axios.put(url, body);
    return res.data;
  } catch (error) {
    console.error("Error updating stock:", error);
    // Handle the error or rethrow it if necessary
    throw error;
  }
}

/**
 *
 * @param productId
 * @param config
 * @returns
 */
export async function getProductDetail(
  productId: string,
  config: TiktokConfig
) {
  const timestamp = Date.parse(new Date().toString()) / 1000;
  const commonParam =
    commonParameter(config, timestamp) + "&product_id=" + productId;

  const url = genURLwithSignature(
    TIKTOK_PATH.PRODUCT_DETAIL,
    commonParam,
    config
  );

  try {
    const res = await axios.get(url);

    return res.data.data;
  } catch (error) {
    console.log("[GetProductDetail]", error);
  }
}

/**
 *
 * @param productIds
 * @param config
 * @returns
 */
export async function activeProduct(
  productIds: Array<string>,
  config: TiktokConfig
) {
  const timestamp = Date.parse(new Date().toString()) / 1000;
  const commonParam = commonParameter(config, timestamp);
  const body = {
    product_ids: productIds,
  };
  const url = genURLwithSignature(
    TIKTOK_PATH.ACTIVE_PRODUCT,
    commonParam,
    config
  );

  const res = await axios.post(url, body);
  return res.data;
}

/**
 *
 * @param productIds
 * @param config
 * @returns
 */
export async function deactiveProduct(
  productIds: Array<string>,
  config: TiktokConfig
) {
  const timestamp = Date.parse(new Date().toString()) / 1000;
  const commonParam = commonParameter(config, timestamp);
  const body = {
    product_ids: productIds,
  };
  const url = genURLwithSignature(
    TIKTOK_PATH.DEACTIVE_PRODUCT,
    commonParam,
    config
  );

  const res = await axios.post(url, body);
  return res.data;
}

/**
 *
 * @param productId
 * @param skuId
 * @param price
 * @param config
 * @returns
 */
export async function updatePrice(
  productId: string,
  skuId: string,
  price: number,
  config: TiktokConfig
) {
  const sku = {
    id: skuId,
    original_price: price,
  };

  const body = {
    product_id: productId,
    skus: [sku],
  };

  const timestamp = Math.floor(new Date().getTime() / 1000);
  const commonParam = commonParameter(config, timestamp);
  const url = genURLwithSignature(
    TIKTOK_PATH.UPDATE_PRICE,
    commonParam,
    config
  );

  try {
    const res = await axios.put(url, body);
    return res.data;
  } catch (error) {
    console.error("Error updating PRICE:", error);
    // Handle the error or rethrow it if necessary
    throw error;
  }
}

export async function createProduct(config) {
  const timestamp = Date.parse(new Date().toString()) / 1000;
  const commonParam = commonParameter(config, timestamp);
  const body = {
    // brand_id: "7082427311584347905",
    category_id: 848648,
    // delivery_service_ids: "1729592969712203232",
    description:
      "Đắp mặt nạ là một trong những bước chăm sóc đặc biệt cho da để bổ sung thêm dinh dưỡng nuôi dưỡng da kéo dài tuổi thanh xuân. Mặt nạ REAL NATURE là mặt nạ dạng miếng cot",
    // exemption_of_identifier_code: {
    //   exemption_reason: "1",
    // },
    images: [
      {
        id: "tos-maliva-i-o3syd03w52-us/7804a7533ff54d2a8cba41281f6f4e5c",
      },
    ],
    is_cod_open: true,
    // outer_product_id: "172959296971220002",
    // package_dimension_unit: "metric",
    package_height: 12,
    package_length: 10,
    package_weight: "1",
    package_width: 11,
    // product_attributes: [
    //   {
    //     attribute_id: "100392",
    //     attribute_values: [
    //       {
    //         value_id: "1001533",
    //         value_name: "Birthday",
    //       },
    //     ],
    //   },
    // ],
    // product_certifications: [
    //   {
    //     files: [
    //       {
    //         id: "tos-maliva-i-o3syd03w52-us/c668cdf70b7f483c94dbe",
    //         name: "xxx.PDF",
    //         type: "PDF",
    //       },
    //     ],
    //     id: "123456",
    //     images: [
    //       {
    //         id: "tos-maliva-i-o3syd03w52-us/c668cdf70b7f483c94dbe",
    //       },
    //     ],
    //   },
    // ],
    product_name: "TEST MASK MASK MASK MASK MASK",
    // product_video: {
    //   video_id: "v09e40f40000cfu0ovhc77ub7fl97k4w",
    // },
    // size_chart: {
    //   img_id: "tos-maliva-i-o3syd03w52-us/c668cdf70b7f483c94dbe",
    // },
    skus: [
      {
        original_price: "999",
        // outer_sku_id: "1729592969712207012",
        // product_identifier_code: {
        //   identifier_code: "12345678901234",
        //   identifier_code_type: 1,
        // },
        // sales_attributes: [
        //   {
        //     attribute_id: "100089",
        //     attribute_name: "Specification",
        //     custom_value: "XL",
        //     sku_img: {
        //       id: "tos-maliva-i-o3syd03w52-us/c668cdf70b7f483c94dbe",
        //     },
        //     value_id: "1729592969712207000",
        //   },
        // ],
        seller_sku: "seller sku xxaa",
        // stock_infos: [
        //   {
        //     available_stock: 999,
        //     warehouse_id: "7068517275539719942",
        //   },
        // ],
      },
    ],
  };
  const url = genURLwithSignature("/api/products", commonParam, config);
  const res = await axios.post(url, body);
  console.log(res.data);

  return res.data;
}

export async function getCategories(config) {
  const timestamp = Date.parse(new Date().toString()) / 1000;
  const commonParam = commonParameter(config, timestamp);

  const url = genURLwithSignature(
    "/api/products/categories",
    commonParam,
    config
  );

  try {
    const res = await axios.get(url);
    return res.data.data;
  } catch (error) {
    console.log("[GetProductDetail]", error);
  }
}

// export async function fetchToken(code: string, config) {
//   const { appKey, appSecret } = config;
//   const authCode = code;
//   const grantType = "authorized_code";
//   const body = {
//     app_key: appKey,
//     app_secret: appSecret,
//     auth_code: authCode,
//     grant_type: grantType,
//   };
//   console.log(body);

//   // const url = process.env.TIKTOK_ENDPONT_AUTH + TIKTOK_PATH.FETCH_TOKEN_AUTH;
//   const url =
//     process.env.TIKTOK_ENDPOINT_AUTH +
//     `/api/v2/token/get?app_key=${appKey}&app_secret=${appSecret}&auth_code=${authCode}&grant_type=authorized_code`;
//   console.log(url);

//   try {
//     // const res = await axios.post(url, body);
//     const res = await axios.get(url);
//     console.log(res.data);

//     return res.data;
//   } catch (error) {
//     console.log(error);
//   }
// }

export async function fetchToken(code: string, config) {
  const { appKey, appSecret } = config;
  const authCode = code;
  const grantType = "authorized_code";
  const body = {
    app_key: appKey,
    app_secret: appSecret,
    auth_code: authCode,
    grant_type: grantType,
  };
  console.log(body);

  const url = process.env.TIKTOK_ENDPOINT_AUTH + TIKTOK_PATH.FETCH_TOKEN_AUTH;

  try {
    const res = await axios.post(url, body);
    
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getAuthorizedShop(config) {
  const timestamp = Date.parse(new Date().toString()) / 1000;

  delete config.shopId;
  console.log(config);
  const commonParam = commonParameter(config, timestamp);
  const url = genURLwithSignature(
    TIKTOK_PATH.GET_AUTHORIZED,
    commonParam,
    config
  );
  try {
    const res = await axios.get(url.toString());
    return res.data;
  } catch (error) {
    // console.log('[getAuthorizedShop]', error);
  }
}

export async function getWarehouseList(config) {
  const timestamp = Date.parse(new Date().toString()) / 1000;
  const commonParam = commonParameter(config, timestamp);

  const url = genURLwithSignature(
    "/api/logistics/get_warehouse_list",
    commonParam,
    config
  );

  const res = await axios.get(url);
  return res.data.data;
}
