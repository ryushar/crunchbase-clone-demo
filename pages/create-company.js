import Head from "next/head";
import { Fragment, useEffect, useState } from "react";

import { TiDocumentText } from "react-icons/ti";
import { MdLocationPin, MdAddCircleOutline, MdSave } from "react-icons/md";

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
import CreateAddress from "../components/create-company/CreateAddress";
import Chip from "../components/create-company/Chip";
import axios from "axios";

function checkFormValidity(data) {
  const keys = Object.getOwnPropertyNames(data);
  for (const key of keys) {
    if (!data[key].isValid) return false;
  }
  return true;
}

export default function CreateCompany() {
  const [state, setState] = useState({
    addingAddress: false
  });

  const [formData, setFormData] = useState({
    profile_image: { value: null, isValid: true },
    name: { value: "", isValid: false },
    description: { value: "", isValid: false },
    also_known_as: { value: "", isValid: true },
    legal_name: { value: "", isValid: true },
    founded_date: { value: null, isValid: true },
    is_closed: { value: false, isValid: true },
    closed_date: { value: null, isValid: true },
    num_employees: { value: "", isValid: true },
    company_type: { value: "", isValid: true },
    website_url: { value: "", isValid: true },
    linkedin_url: { value: "", isValid: true },
    email: { value: "", isValid: true },
    phone_no: { value: "", isValid: true },
    full_description: { value: "", isValid: true },
    headquarters: { value: null, isValid: true }
  });

  useEffect(() => {
    const req = axios.get("/api/retrieve");
    req.then((res) => {
      const { data } = res;
      const newFormData = {};
      Object.keys(data).forEach((key) => {
        if (data[key] && formData[key]) {
          newFormData[key] = { value: data[key], isValid: true };
        }
      });
      if (data.city) {
        const { address_name, address_line_1, address_line_2, postal_code, city } = data;
        newFormData.headquarters = {
          value: { address_name, address_line_1, address_line_2, postal_code, city },
          isValid: true
        };
      }
      setFormData((old) => ({ ...old, ...newFormData }));
    });
    req.catch((error) => {
      console.error(error);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formIsValid = checkFormValidity(formData);

  const onFormSubmit = (event) => {
    event.preventDefault();
    const data = new FormData();
    const keys = Object.getOwnPropertyNames(formData);
    for (const key of keys) {
      const { value } = formData[key];
      if (value instanceof Blob) data.append(key, value);
      else data.append(key, JSON.stringify(value));
    }
    axios
      .post("/api/save", data, {
        headers: { "Content-Type": "multipart/form-data" }
      })
      .then((_res) => {
        window.location.pathname = "/";
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to save.");
      });
  };

  const head = (
    <Head>
      <title>Create company</title>
    </Head>
  );

  const onInputChange = (value) => setFormData((old) => ({ ...old, ...value }));

  const { value: headquarters } = formData.headquarters;

  const createProps = (name, required = false) => {
    return { name, required, onChange: onInputChange, value: formData[name].value };
  };

  const main = (
    <Container className={state.addingAddress && "hidden"}>
      <form onSubmit={onFormSubmit}>
        <Card header={{ icon: <TiDocumentText />, iconBgColor: "bg-blue-500", text: "Overview" }}>
          <ProfileImgPicker onChange={onInputChange} />
          <TextInput label="Name" {...createProps("name", true)} />
          <TextInput label="Description" {...createProps("description", true)} />
          <TextInput label="Also Known As" {...createProps("also_known_as")} />
          <TextInput label="Legal Name" {...createProps("legal_name")} />
          <DateInput label="Founded Date" {...createProps("founded_date")} />
          <Checkbox label="Closed Date" {...createProps("is_closed")} />
          {formData.is_closed.value && <DateInput label="" {...createProps("closed_date")} />}
          <SelectBox
            label="Number of Employees"
            {...createProps("num_employees")}
            values={[
              { value: "", label: "" },
              { value: "10", label: "Less than 10" },
              { value: "50", label: "Less than 50" },
              { value: "100", label: "Less than 100" },
              { value: "100+", label: "100+" }
            ]}
          />
          <SelectBox
            label="Company type"
            {...createProps("company_type")}
            values={[
              { value: "", label: "" },
              { value: "private", label: "Private" },
              { value: "public", label: "Public" }
            ]}
          />
          <TextInput label="Website URL" {...createProps("website_url")} />
          <TextInput label="LinkedIn URL" {...createProps("linkedin_url")} />
          <TextArea label="Contact Email" {...createProps("email")} />
          <NumberInput
            label="Phone Number"
            {...createProps("phone_no")}
            min={1000000000}
            max={9999999999}
          />
          <TextArea label="Full Description" {...createProps("full_description")} />
        </Card>
        <Card header={{ icon: <MdLocationPin />, iconBgColor: "bg-sky-500", text: "Headquarters" }}>
          {headquarters ? (
            <Chip
              text={
                headquarters.address_name
                  ? `${headquarters.city} (${headquarters.address_name})`
                  : headquarters.city
              }
              onRemove={() => onInputChange({ headquarters: { value: null, isValid: true } })}
            />
          ) : (
            <BaseButton
              icon={<MdAddCircleOutline />}
              text="Create new headquarters"
              className="w-max px-2.5 py-2.5 bg-blue-600"
              onClick={() => setState({ addingAddress: true })}
            ></BaseButton>
          )}
        </Card>
        <div className="flex justify-center mb-36">
          <BaseButton
            type="submit"
            icon={<MdSave />}
            text="Save all edits"
            className="bg-blue-700 px-3 py-2"
            disabled={!formIsValid}
          />
        </div>
      </form>
    </Container>
  );

  const onCreateAddressContinue = (value) => {
    onInputChange({ headquarters: { value, isValid: true } });
    setState({ addingAddress: false });
  };

  const onCreateAddressCancel = () => {
    setState({ addingAddress: false });
  };

  const createAddress = (
    <Container className={!state.addingAddress && "hidden"}>
      <CreateAddress onContinue={onCreateAddressContinue} onCancel={onCreateAddressCancel} />
    </Container>
  );

  return (
    <Fragment>
      {head}
      {main}
      {createAddress}
    </Fragment>
  );
}
