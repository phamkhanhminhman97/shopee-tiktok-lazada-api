interface WebhookBase<T> {
  type: number;
  shop_id: string;
  timestamp: number;
  data: T;
}

interface Order {
  order_id: string;
  update_time: string;
  order_status: string;
}

interface Return {
  order_id: string;
  return_role: string;
  return_type: string;
  return_status: string;
  return_id: string;
  create_time: number;
  update_time: number;
}

interface Address {
  order_id: string;
  update_time: number;
}

interface Cancellation {
  order_id: string;
  cancellations_role: string;
  cancel_status: string;
  cancel_id: string;
  update_time: string;
}

interface AuthExpire {
  message: string; // Authorization of shop_id {xxx} is expirating in {x} days. Please direct the merchant to re-authorize.
  expiration_time: string; // 1627587506
}

type WebhookOrder = WebhookBase<Order>;

type WebhookReturn = WebhookBase<Return>;

type WebhookAddressUpdate = WebhookBase<Address>;

type WebhookCancellation = WebhookBase<Cancellation>;

type WebhookUpcomingAuthExpire = WebhookBase<AuthExpire>;

export {
  WebhookOrder as TiktokWebhookOrder,
  WebhookReturn as TiktokWebhookReturn,
  WebhookAddressUpdate as TiktokWebhookAddressUpdate,
  WebhookCancellation as TiktokWebhookCancellation,
  WebhookUpcomingAuthExpire as TiktokWebhookUpcomingAuthExpire,
};
