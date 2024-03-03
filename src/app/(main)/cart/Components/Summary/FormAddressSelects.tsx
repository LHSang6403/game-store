"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import useAddressSelects from "@/zustand/useAddressSelects";
import { useSession } from "@/zustand/useSession";
import province from "@/static-data/provinces.json";
import district from "@/static-data/districts.json";
import communes from "@/static-data/communes.json";

export default function FormAddressSelects() {
  const { session } = useSession();
  const { values, setProvince, setDistrict, setCommune, clearAll } =
    useAddressSelects();

  const districtsInProvince = district.filter(
    (dis) => dis.idProvince === values.provinceId
  );

  const communesInDistrict = communes.filter(
    (com) => com.idDistrict === values.districtId
  );

  console.log("Values", values);

  return (
    <div className="mt-2 flex flex-col gap-2">
      <Select
        onValueChange={(value) => {
          const parsedValue = JSON.parse(value);
          setProvince(parsedValue.name, parsedValue.id);
          setDistrict("", "");
          setCommune("", "");
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select province" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Provinces</SelectLabel>
            {province.map((pro, index) => (
              <SelectItem
                key={index}
                value={JSON.stringify({ name: pro.name, id: pro.idProvince })}
              >
                {pro.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select
        disabled={values.provinceId === ""}
        onValueChange={(value) => {
          const parsedValue = JSON.parse(value);
          setDistrict(parsedValue.name, parsedValue.id);
          setCommune("", "");
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select district" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Districts</SelectLabel>
            {districtsInProvince.map((dis, index) => (
              <SelectItem
                key={index}
                value={JSON.stringify({ name: dis.name, id: dis.idDistrict })}
              >
                {dis.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select
        disabled={values.districtId === ""}
        onValueChange={(value) => {
          const parsedValue = JSON.parse(value);
          setCommune(parsedValue.name, parsedValue.id);
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select ward" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Communes</SelectLabel>
            {communesInDistrict.map((com, index) => (
              <SelectItem
                key={index}
                value={JSON.stringify({ name: com.name, id: com.idCommune })}
              >
                {com.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
