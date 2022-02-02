import Head from "next/head";
import { Fragment } from "react";

export default function CreateCompany() {
  const head = (
    <Head>
      <title>Create company</title>
    </Head>
  );

  const body = "Create company";

  return (
    <Fragment>
      {head}
      {body}
    </Fragment>
  );
}
