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
  // Filter storages by client area
  const storagesInClientArea = allStorages.filter(
    (storage) => storage.area === clientArea
  );

  // *** Loop through storages in client area ***
  for (const storage of storagesInClientArea) {
    let foundAllProducts = true; // Flag to track if all products are found in this storage

    // Check if all products in the order are available in this storage
    for (const product of order.products) {
      const productStorage = product.product_storages.find(
        (ps) => ps.storage_id === storage.id
      );

      // If any product is not found in this storage, set the flag to false and break
      if (!productStorage || productStorage.quantity <= 0) {
        foundAllProducts = false;
        break;
      }
    }

    // If all products are found in this storage, return it
    if (foundAllProducts) {
      return storage;
    }
  }

  // *** If no suitable storage is found in client area, look for storage in other areas ***
  const storagesInOtherArea = allStorages.filter(
    (storage) => storage.area !== clientArea
  );

  // Loop through storages in other areas
  for (const storage of storagesInOtherArea) {
    let foundAllProducts = true;

    // Check if all products in the order are available in this storage
    for (const product of order.products) {
      const productStorage = product.product_storages.find(
        (ps) => ps.storage_id === storage.id
      );

      // If any product is not found in this storage, set the flag to false and break
      if (!productStorage || productStorage.quantity <= 0) {
        foundAllProducts = false;
        break;
      }
    }

    // If all products are found in this storage, return it
    if (foundAllProducts) {
      return storage;
    }
  }

  return null; // Return null if no suitable storage is found
}
