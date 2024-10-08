import type { CustomerType, StaffRole, StaffType } from "../types";

export default function customerToStaff(
  customer: CustomerType,
  staffRole: StaffRole
): StaffType {
  return {
    id: customer.id,
    created_at: customer.created_at,
    name: customer.name,
    dob: customer.dob,
    phone: customer.phone,
    email: customer.email,
    address: customer.address,
    ward: customer.ward,
    district: customer.district,
    province: customer.province,
    image: customer.image,
    role: staffRole,
  };
}
