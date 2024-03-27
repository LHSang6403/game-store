import { StaffType, CustomerType } from "@utils/types";

export default function staffToCustomer(staff: StaffType): CustomerType {
  return {
    id: staff.id,
    created_at: staff.created_at,
    name: staff.name,
    dob: staff.dob,
    phone: staff.phone,
    email: staff.email,
    address: staff.address,
    ward: staff.ward,
    district: staff.district,
    province: staff.province,
    image: staff.image,
    level: 0,
  };
}
