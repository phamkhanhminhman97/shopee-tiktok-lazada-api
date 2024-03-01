interface PickupSlot {
  end_time: number; // The end date and time of the package pick up time slot.
  start_time: number; // The start date and time of the package pick up time slot.
}

interface SelfShipment {
  tracking_number: string;
  shipping_provider_id: string;
}

interface ShipPackage {
  handover_method: string; //PICKUP or DROP_OFF
  pickup_slot: PickupSlot;
  self_shipment?: SelfShipment;
}

export { ShipPackage as TiktokRequestShipPackage };
