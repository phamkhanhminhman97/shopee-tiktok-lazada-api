import { ShopeeConfig } from "../dto/request/config.request";
import { createHmac } from "crypto";
export function commonParameter(config: ShopeeConfig, signature, timestamp) {
  const { partnerId, accessToken, shopId } = config;
  const commonParam =
    "?shop_id=" +
    shopId +
    "&partner_id=" +
    partnerId +
    "&access_token=" +
    accessToken +
    "&sign=" +
    signature +
    "&timestamp=" +
    timestamp;
  return commonParam;
}

export function signRequest(path: string, config: ShopeeConfig, timestamp) {
  const { partnerId, accessToken, shopId, partnerKey } = config;
  let params = [partnerId, path, timestamp.toString(), accessToken, shopId];
  params = params.filter(function (item) {
    return item !== null;
  });
  const baseString = params.reduce((prev, curr) => (prev += curr), "");

  return createHmac("sha256", partnerKey).update(baseString).digest("hex");
}

export function getTimestampNow() {
  return Math.floor(Date.now() / 1000);
}

export function getTimestampMinutesAgo(minutes) {
  const oldDate = new Date();
  oldDate.setMilliseconds(0);
  return Math.floor((oldDate.getTime() - minutes * 60 * 1000) / 1000);
}

export function buildCommonParameters(
  config,
  signature,
  timestamp,
  timeFrom,
  cursor
) {
  return `${commonParameter(
    config,
    signature,
    timestamp
  )}&time_range_field=create_time&time_from=${timeFrom}&time_to=${timestamp}&page_size=50&cursor=${cursor}`;
}
