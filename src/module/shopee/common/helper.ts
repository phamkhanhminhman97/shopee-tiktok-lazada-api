import { ShopeeConfig } from '../dto/request/config.request';
import axios, { AxiosResponse } from 'axios';
import { createHmac } from 'crypto';
function commonParameter(config: ShopeeConfig, signature: string, timestamp: number) {
  const { partnerId, accessToken, shopId } = config;
  const commonParam = `?shop_id=${shopId}&partner_id=${partnerId}&access_token=${accessToken}&sign=${signature}&timestamp=${timestamp}`;
  return commonParam;
}

function signRequest(path: string, config: ShopeeConfig, timestamp) {
  const { partnerId, accessToken, shopId, partnerKey } = config;
  let params = [partnerId, path, timestamp.toString(), accessToken, shopId];
  params = params.filter(function (item) {
    return item !== null;
  });
  const baseString = params.reduce((prev, curr) => (prev += curr), '');

  return createHmac('sha256', partnerKey).update(baseString).digest('hex');
}

function getTimestampNow() {
  return Math.floor(Date.now() / 1000);
}

function getTimestampMinutesAgo(minutes) {
  const oldDate = new Date();
  oldDate.setMilliseconds(0);
  return Math.floor((oldDate.getTime() - minutes * 60 * 1000) / 1000);
}

function buildCommonParameters(config, signature, timestamp, timeFrom, cursor) {
  return `${commonParameter(
    config,
    signature,
    timestamp,
  )}&time_range_field=create_time&time_from=${timeFrom}&time_to=${timestamp}&page_size=50&cursor=${cursor}`;
}

function buildCommonParams(config: any, signature: string, timestamp: number, additionalParams?: Record<string, any>): string {
  const { partnerId, accessToken, shopId } = config;
  let paramString = `?shop_id=${shopId}&partner_id=${partnerId}&access_token=${accessToken}&sign=${signature}&timestamp=${timestamp}`;

  if (additionalParams) {
    Object.entries(additionalParams).forEach(([key, value]) => {
      paramString += `&${key}=${encodeURIComponent(value)}`;
    });
  }
  return paramString;
}

function optionalField() {
  return [
    'buyer_user_id',
    'buyer_username',
    'estimated_shipping_fee',
    'recipient_address',
    'actual_shipping_fee',
    'goods_to_declare',
    'note',
    'note_update_time',
    'item_list',
    'pay_time',
    'dropshipper',
    'dropshipper_phone',
    'split_up',
    'buyer_cancel_reason',
    'cancel_by',
    'cancel_reason',
    'actual_shipping_fee_confirmed',
    'buyer_cpf_id',
    'fulfillment_flag',
    'pickup_done_time',
    'package_list',
    'shipping_carrier',
    'payment_method',
    'total_amount',
    'buyer_username',
    'invoice_data',
    'checkout_shipping_carrier',
    'reverse_shipping_fee',
    'order_chargeable_weight_gram',
  ];
}

function handleError(err: any) {
  return err.response ? err.response.data : { error: 'Unknown error' };
}

function getHeaders(config: ShopeeConfig, contentType: string = 'application/json') {
  return {
    'Content-Type': contentType,
  };
}

async function httpPost(url: string, body: any, headers: any) {
  try {
    const res: AxiosResponse = await axios.post(url, body, {
      headers,
    });
    return res.data;
  } catch (err: any) {
    return handleError(err);
  }
}

async function httpGet(url: string, config: ShopeeConfig) {
  try {
    const res: AxiosResponse = await axios.get(url, {
      headers: getHeaders(config),
    });
    return res.data;
  } catch (err: any) {
    return handleError(err);
  }
}

export {
  buildCommonParameters,
  getTimestampMinutesAgo,
  signRequest,
  getTimestampNow,
  commonParameter,
  optionalField,
  httpGet,
  httpPost,
  getHeaders,
  buildCommonParams,
};
