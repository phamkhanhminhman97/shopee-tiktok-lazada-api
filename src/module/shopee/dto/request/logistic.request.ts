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

interface RequestCreateShippingDocumentOrder {
  order_sn: string;
  package_number?: string;
  tracking_number?: string;
  shipping_document_type?: string;
}

interface RequestCreateShippingDocument {
  order_list: RequestCreateShippingDocumentOrder[];
}

interface RequestGetShippingDocumentResultOrder {
  order_sn: string;
  package_number?: string;
  shipping_document_type?: string;
}

interface RequestGetShippingDocumentResult {
  order_list: RequestGetShippingDocumentResultOrder[];
}

interface RequestDownloadShippingDocumentOrder {
  order_sn: string;
  package_number?: string;
}

interface RequestDownloadShippingDocument {
  shipping_document_type?: string;
  order_list: RequestDownloadShippingDocumentOrder[];
}

interface RequestMassShipOrderPackage {
  package_number: string;
}

interface RequestMassShipOrderPickup {
  address_id?: number;
  pickup_time_id?: string;
}

interface RequestMassShipOrderDropoff {
  branch_id?: number;
  sender_real_name?: string;
  tracking_number?: string;
}

interface RequestMassShipOrderNonIntegratedTracking {
  package_number: string;
  tracking_number: string;
}

interface RequestMassShipOrderNonIntegrated {
  tracking_number?: RequestMassShipOrderNonIntegratedTracking[];
}

interface RequestMassShipOrder {
  logistics_channel_id?: number;
  product_location_id?: string;
  package_list: RequestMassShipOrderPackage[];
  pickup?: RequestMassShipOrderPickup;
  dropoff?: RequestMassShipOrderDropoff;
  non_integrated?: RequestMassShipOrderNonIntegrated;
}

interface RequestGetMassShippingParameterPackage {
  package_number: string;
}

interface RequestGetMassShippingParameter {
  logistics_channel_id?: number;
  product_location_id?: string;
  package_list: RequestGetMassShippingParameterPackage[];
}

interface RequestUpdateShippingOrderPickup {
  address_id: number;
  pickup_time_id: string;
}

interface RequestUpdateShippingOrder {
  order_sn: string;
  package_number?: string;
  pickup: RequestUpdateShippingOrderPickup;
}

interface RequestGetMassTrackingNumberPackage {
  package_number: string;
}

interface RequestGetMassTrackingNumber {
  package_list: RequestGetMassTrackingNumberPackage[];
  response_optional_fields?: string;
}

interface RequestGetShippingDocumentParameterOrder {
  order_sn: string;
  package_number?: string;
}

interface RequestGetShippingDocumentParameter {
  order_list: RequestGetShippingDocumentParameterOrder[];
}

export {
  RequestShipOrder as ShopeeRequestShipOrder,
  RequestCreateShippingDocument as ShopeeRequestCreateShippingDocument,
  RequestGetShippingDocumentResult as ShopeeRequestGetShippingDocumentResult,
  RequestDownloadShippingDocument as ShopeeRequestDownloadShippingDocument,
  RequestMassShipOrder as ShopeeRequestMassShipOrder,
  RequestGetMassShippingParameter as ShopeeRequestGetMassShippingParameter,
  RequestUpdateShippingOrder as ShopeeRequestUpdateShippingOrder,
  RequestGetMassTrackingNumber as ShopeeRequestGetMassTrackingNumber,
  RequestGetShippingDocumentParameter as ShopeeRequestGetShippingDocumentParameter,
};
