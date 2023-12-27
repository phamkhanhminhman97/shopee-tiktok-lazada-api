import {
  LAZADA_PRODUCT_STATUS,
  LZD_ALGORITHM,
  LZD_DIGEST,
  LZD_END_POINT,
} from "./constant";
import axios from "axios";
import { createHmac } from "crypto";
export function concatDictionaryKeyValue(object) {
  return Object.keys(object).reduce(function (concatString, key) {
    return concatString.concat(key + object[key]);
  }, "");
}
export function createSignature(path, payload, appSecret) {
  const uri = concatDictionaryKeyValue(keySort(payload));
  const input = `${path}${uri}`;
  const hash = createHmac(LZD_ALGORITHM, appSecret)
    .update(input)
    .digest(LZD_DIGEST);
  return hash.toUpperCase();
}
export async function execute(path: string, payload: any, appSecret: string) {
  const sortObject = keySort(payload);
  const params = parseToRequestParam(sortObject);
  const signature = createSignature(path, sortObject, appSecret);
  try {
    const res = await axios.get(
      `${LZD_END_POINT}${path}?${params}&sign=${signature}`
    );
    return res.data;
  } catch (e) {
    console.log(e);
  }
}

export function parseToRequestParam(obj) {
  let str = "";
  for (const key in obj) {
    if (str != "") {
      str += "&";
    }
    str += key + "=" + encodeURIComponent(obj[key]);
  }
  return str;
}

export function keySort(unordered) {
  return Object.keys(unordered)
    .sort()
    .reduce(function (ordered, key) {
      ordered[key] = unordered[key];
      return ordered;
    }, {});
}

export function toRequestProductsXML(skus) {
  return `<Request> <Product> <Skus> ${skus.join(
    " "
  )} </Skus> </Product> </Request>`;
}

export function toProductXML(itemId, skuId, sellerSku, quantity) {
  return `<Sku> <ItemId>${itemId}</ItemId> <SkuId>${skuId}</SkuId> <SellerSku>${sellerSku}</SellerSku> <SellableQuantity>${quantity}</SellableQuantity> </Sku>`;
}

export function productParametersXML(
  itemId,
  skuId,
  sellerSku,
  status: LAZADA_PRODUCT_STATUS
) {
  return `<Sku> <ItemId>${itemId}</ItemId> <SkuId>${skuId}</SkuId> <SellerSku>${sellerSku}</SellerSku><Status>${status}</Status></Sku>`;
}

export function priceParametersXML(itemId, skuId, sellerSku, price) {
  return `<Sku> <ItemId>${itemId}</ItemId> <SkuId>${skuId}</SkuId> <SellerSku>${sellerSku}</SellerSku><Price>${price}</Price></Sku>`;
}

export async function executePOST(
  path: string,
  payload: any,
  appSecret: string
) {
  const sortObject = keySort(payload);
  const params = parseToRequestParam(sortObject);
  const signature = createSignature(path, sortObject, appSecret);
  try {
    const res = await axios.post(
      `${LZD_END_POINT}${path}?${params}&sign=${signature}`
    );

    return res.data;
  } catch (e) {
    console.log(e);
  }
}
