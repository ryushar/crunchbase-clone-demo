import { TiDocumentText } from "react-icons/ti";
import { MdLocationPin } from "react-icons/md";

import Card from "../common/Card";
import BaseButton from "../common/BaseButton";
import TextInput from "../common/form/TextInput";
import SelectBox from "../common/form/SelectBox";
import NumberInput from "../common/form/NumberInput";

import { useState } from "react";

const DEMO_CITIES = [
  "Tokyo, Japan",
  "Jakarta, Indonesia",
  "Delhi, India",
  "Manila, Philippines",
  "Seoul, South Korea",
  "Shanghai, China"
].map((item) => ({ value: item, label: item }));

function checkFormValidity(data) {
  const keys = Object.getOwnPropertyNames(data);
  for (const key of keys) {
    if (!data[key].isValid) return false;
  }
  return true;
}

export default function CreateAddress({ onContinue, onCancel }) {
  const [formData, setFormData] = useState({
    address_name: { value: null, isValid: true },
    address_line_1: { value: null, isValid: true },
    address_line_2: { value: null, isValid: true },
    postal_code: { value: null, isValid: true },
    city: { value: null, isValid: false }
  });

  const formIsValid = checkFormValidity(formData);

  const onFormSubmit = (event) => {
    event.preventDefault();
    if (formIsValid) {
      onContinue({
        address_name: formData.address_name.value,
        address_line_1: formData.address_line_1.value,
        address_line_2: formData.address_line_2.value,
        postal_code: formData.postal_code.value,
        city: formData.city.value
      });
    }
  };

  const onInputChange = (value) => setFormData((old) => ({ ...old, ...value }));

  return (
    <form onSubmit={onFormSubmit}>
      <Card header={{ icon: <TiDocumentText />, iconBgColor: "bg-blue-500", text: "Address" }}>
        <TextInput name="address_name" label="Address Name" onChange={onInputChange} />
        <TextInput name="address_line_1" label="Address Line 1" onChange={onInputChange} />
        <TextInput name="address_line_2" label="Address Line 2" onChange={onInputChange} />
        <NumberInput name="postal_code" label="Postal Code" onChange={onInputChange} />
      </Card>
      <Card header={{ icon: <MdLocationPin />, iconBgColor: "bg-sky-500", text: "City" }}>
        <SelectBox
          name="city"
          label="City"
          values={DEMO_CITIES}
          onChange={onInputChange}
          required
        ></SelectBox>
      </Card>
      <div className="flex justify-end mb-36">
        <BaseButton
          type="submit"
          text="Continue"
          className="bg-blue-700 px-3 py-2"
          disabled={!formIsValid}
        />
        <BaseButton text="Cancel" className="bg-red-600/80 px-3 py-2 ml-2" onClick={onCancel} />
      </div>
    </form>
  );
}
