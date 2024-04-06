import { StorageType, OrderType } from "@/utils/types";

export function findAvailableStorage({
  order,
  clientArea,
  allStorages,
}: {
  order: OrderType;
  clientArea: string;
  allStorages: StorageType[];
}): StorageType | null {
  const storagesInClientArea = allStorages.filter(
    (storage) => storage.area === clientArea
  );

  // *** Loop through storages in client area ***
  for (const storage of storagesInClientArea) {
    let foundAllProducts = true; // Flag to track if all products are found in this storage

    for (const product of order.products) {
      const productStorage = product.product_storages.find(
        (ps) => ps.storage_id === storage.id
      );

      if (!productStorage || productStorage.quantity <= 0) {
        foundAllProducts = false;
        break;
      }
    }

    if (foundAllProducts) {
      return storage;
    }
  }

  // *** If no suitable storage is found in client area, look for storage in other areas ***
  const storagesInOtherArea = allStorages.filter(
    (storage) => storage.area !== clientArea
  );

  for (const storage of storagesInOtherArea) {
    let foundAllProducts = true;

    for (const product of order.products) {
      const productStorage = product.product_storages.find(
        (ps) => ps.storage_id === storage.id
      );

      if (!productStorage || productStorage.quantity <= 0) {
        foundAllProducts = false;
        break;
      }
    }

    if (foundAllProducts) {
      return storage;
    }
  }

  return null; 
}
