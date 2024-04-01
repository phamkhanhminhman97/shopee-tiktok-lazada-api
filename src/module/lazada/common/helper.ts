import { LAZADA_PRODUCT_STATUS, LZD_ALGORITHM, LZD_DIGEST, LZD_END_POINT } from './constant';
import axios from 'axios';
import { createHmac } from 'crypto';

export function concatDictionaryKeyValue(object) {
  return Object.keys(object).reduce(function (concatString, key) {
    return concatString.concat(key + object[key]);
  }, '');
}
export function createSignature(path, payload, appSecret) {
  const uri = concatDictionaryKeyValue(keySort(payload));
  const input = `${path}${uri}`;
  const hash = createHmac(LZD_ALGORITHM, appSecret).update(input).digest(LZD_DIGEST);
  return hash.toUpperCase();
}

export function parseToRequestParam(obj) {
  let str = '';
  for (const key in obj) {
    if (str != '') {
      str += '&';
    }
    str += key + '=' + encodeURIComponent(obj[key]);
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
  return `<Request> <Product> <Skus> ${skus.join(' ')} </Skus> </Product> </Request>`;
}

export function toProductXML(itemId, skuId, sellerSku, quantity) {
  return `<Sku> <ItemId>${itemId}</ItemId> <SkuId>${skuId}</SkuId> <SellerSku>${sellerSku}</SellerSku> <SellableQuantity>${quantity}</SellableQuantity> </Sku>`;
}

export function productParametersXML(itemId, skuId, sellerSku, status: LAZADA_PRODUCT_STATUS) {
  return `<Sku> <ItemId>${itemId}</ItemId> <SkuId>${skuId}</SkuId> <SellerSku>${sellerSku}</SellerSku><Status>${status}</Status></Sku>`;
}

export function priceParametersXML(itemId, skuId, sellerSku, price) {
  return `<Sku> <ItemId>${itemId}</ItemId> <SkuId>${skuId}</SkuId> <SellerSku>${sellerSku}</SellerSku><Price>${price}</Price></Sku>`;
}

async function httpGet(path: string, payload: any, appSecret: string) {
  const sortObject = keySort(payload);
  const params = parseToRequestParam(sortObject);
  const signature = createSignature(path, sortObject, appSecret);
  try {
    const res = await axios.get(`${LZD_END_POINT}${path}?${params}&sign=${signature}`);
    return res.data;
  } catch (e) {
    console.log(e);
  }
}

export async function executePOST(path: string, payload: any, appSecret: string) {
  const sortObject = keySort(payload);
  const params = parseToRequestParam(sortObject);
  const signature = createSignature(path, sortObject, appSecret);
  try {
    const res = await axios.post(`${LZD_END_POINT}${path}?${params}&sign=${signature}`);

    return res.data;
  } catch (e) {
    console.log(e);
  }
}

export async function executeAuth(path: string, payload: any, appSecret: string) {
  const sortObject = keySort(payload);
  const params = parseToRequestParam(sortObject);
  const signature = createSignature(path, sortObject, appSecret);

  try {
    const res = await axios.get(`https://auth.lazada.com/rest${path}?${params}&sign=${signature}`);

    return res.data;
  } catch (e) {
    console.log(e);
  }
}

function createProductParametersXML2(payload) {
  const { primaryCategory, images, name, description, disableAttributeAutoFill, brand_id, video, phoneType, warrantyType, skus } = payload;

  // Build the Skus XML
  const skusXML = skus
    .map((sku) => {
      return `
        <Sku>
            <SellerSku>${sku.sellerSku}</SellerSku>
            <quantity>${sku.quantity}</quantity>
            <price>${sku.price}</price>
            <special_price>${sku.specialPrice}</special_price>
            <package_height>${sku.packageHeight}</package_height>
            <package_length>${sku.packageLength}</package_length>
            <package_width>${sku.packageWidth}</package_width>
            <package_weight>${sku.packageWeight}</package_weight>
            <Images>
                ${sku.images.map((image) => `<Image>${image}</Image>`).join('\n')}
            </Images>
        </Sku>
    `;
    })
    .join('\n');

  // Build the final XML
  const xml = `<Request>
    <Product>
        <PrimaryCategory>${primaryCategory}</PrimaryCategory>
        <Images>
            ${images.map((image) => `<Image>${image}</Image>`).join('\n')}
        </Images>
        <Attributes>
            <name>${name}</name>
            <description>${description}</description>
            <disableAttributeAutoFill>${disableAttributeAutoFill}</disableAttributeAutoFill>
            <brand_id>${brand_id}</brand_id>
            <video>${video}</video>
            <phone_type>${phoneType}</phone_type>
            <warranty_type>${warrantyType}</warranty_type>
        </Attributes>
        <Skus>
            ${skusXML}
        </Skus>
    </Product>
</Request>`;

  return xml;
}

function getTimestampMilisec() {
  return new Date().getTime();
}

function getTimestampSec() {
  return Math.floor(Date.now() / 1000);
}

function isTokenExpired(time: any): boolean {
  if (time.toString().length === 13) {
    time = time / 1000;
  }
  const now = Math.floor(Date.now() / 1000);

  // If expiration time is less than or equal to current time, it's expired
  return time <= now;
}

export { httpGet, getTimestampMilisec, getTimestampSec, isTokenExpired, createProductParametersXML2 };
