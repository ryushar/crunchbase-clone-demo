import Head from "next/head";
import { Fragment, useState } from "react";

import { TiDocumentText } from "react-icons/ti";
import { MdLocationPin, MdAddCircleOutline } from "react-icons/md";

import Card from "../components/common/Card";
import Container from "../components/common/Container";
import BaseButton from "../components/common/BaseButton";
import TextInput from "../components/common/form/TextInput";
import SelectBox from "../components/common/form/SelectBox";
import NumberInput from "../components/common/form/NumberInput";
import DateInput from "../components/common/form/DateInput";
import Checkbox from "../components/common/form/Checkbox";
import TextArea from "../components/common/form/TextArea";
import ProfileImgPicker from "../components/create-company/ProfileImgPicker";

function checkFormValidity(data) {
  const keys = Object.getOwnPropertyNames(data);
  for (const key of keys) {
    if (!data[key].isValid) return false;
  }
  return true;
}

export default function CreateCompany() {
  const [formData, setFormData] = useState({
    name: { value: null, isValid: false },
    description: { value: null, isValid: false },
    also_known_as: { value: null, isValid: true },
    legal_name: { value: null, isValid: true },
    founded_date: { value: null, isValid: true },
    is_closed: { value: false, isValid: true },
    closed_date: { value: null, isValid: true },
    num_employees: { value: null, isValid: true },
    company_type: { value: null, isValid: true },
    website_url: { value: null, isValid: true },
    linkedin_url: { value: null, isValid: true },
    email: { value: null, isValid: true },
    phone_no: { value: null, isValid: true },
    full_description: { value: null, isValid: true }
  });

  const formIsValid = checkFormValidity(formData);

  const onFormSubmit = (event) => {
    event.preventDefault();
    console.log(event, formData, formIsValid);
  };

  const head = (
    <Head>
      <title>Create company</title>
    </Head>
  );

  const onInputChange = (value) => setFormData((old) => ({ ...old, ...value }));

  const body = (
    <Container>
      <form onSubmit={onFormSubmit}>
        <Card header={{ icon: <TiDocumentText />, iconBgColor: "bg-blue-500", text: "Overview" }}>
          <ProfileImgPicker />
          <TextInput name="name" label="Name" required onChange={onInputChange} />
          <TextInput name="description" label="Description" required onChange={onInputChange} />
          <TextInput name="also_known_as" label="Also Known As" onChange={onInputChange} />
          <TextInput name="legal_name" label="Legal Name" onChange={onInputChange} />
          <DateInput name="founded_date" label="Founded Date" onChange={onInputChange} />
          <Checkbox name="is_closed" label="Closed Date" onChange={onInputChange} />
          {formData.is_closed.value && (
            <DateInput name="closed_date" label="" onChange={onInputChange} />
          )}
          <SelectBox
            name="num_employees"
            label="Number of Employees"
            values={[
              { value: "", label: "" },
              { value: "10", label: "Less than 10" },
              { value: "50", label: "Less than 50" },
              { value: "100", label: "Less than 100" },
              { value: "100+", label: "100+" }
            ]}
            onChange={onInputChange}
          />
          <SelectBox
            name="company_type"
            label="Company type"
            values={[
              { value: "", label: "" },
              { value: "private", label: "Private" },
              { value: "public", label: "Public" }
            ]}
            onChange={onInputChange}
          />
          <TextInput name="website_url" label="Website URL" onChange={onInputChange} />
          <TextInput name="linkedin_url" label="LinkedIn URL" onChange={onInputChange} />
          <TextArea name="email" label="Contact Email" onChange={onInputChange} />
          <NumberInput
            name="phone_no"
            label="Phone Number"
            min={1000000000}
            max={9999999999}
            onChange={onInputChange}
          />
          <TextArea name="full_description" label="Full Description" onChange={onInputChange} />
        </Card>
        <Card header={{ icon: <MdLocationPin />, iconBgColor: "bg-sky-500", text: "Headquarters" }}>
          <BaseButton
            icon={<MdAddCircleOutline />}
            text="Create new headquarters"
            className="w-max px-2.5 py-2.5 bg-blue-600"
          ></BaseButton>
        </Card>
        <BaseButton type="submit" text="Submit" disabled={!formIsValid} />
      </form>
    </Container>
  );

  return (
    <Fragment>
      {head}
      {body}
    </Fragment>
  );
}
