interface RequestShipOrder {
  order_sn: string;
  package_number?: string;
  pickup?: {
    address_id: number;
    pickup_time_id?: string;
    tracking_number?: string;
  };
  dropoff?: {
    branch_id?: number;
    sender_real_name?: string;
    slug?: string;
  };
  non_integrated?: {
    tracking_number?: string;
  };
}

export { RequestShipOrder as ShopeeRequestShipOrder };
