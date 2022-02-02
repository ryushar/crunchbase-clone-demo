import Head from "next/head";
import { useRouter } from "next/router";

import { BiBuildings } from "react-icons/bi";
import { BsFillPersonFill } from "react-icons/bs";
import { MdSchool } from "react-icons/md";
import { RiMoneyDollarBoxLine, RiCalendarEventFill } from "react-icons/ri";
import { GiReceiveMoney } from "react-icons/gi";
import { Fragment } from "react";

import Card from "../components/common/Card";
import Container from "../components/common/Container";
import DashboardButton from "../components/landing-page/DashboardButton";

export default function Home() {
  const router = useRouter();

  const head = (
    <Head>
      <title>Demo - Crunchbase Clone</title>
    </Head>
  );

  const buttons = [
    {
      text: "Company",
      icon: <BiBuildings />,
      onClick: () => router.push("/create-company")
    },
    { text: "School", icon: <MdSchool /> },
    { text: "Investment firm", icon: <RiMoneyDollarBoxLine /> },
    { text: "Individual investor", icon: <GiReceiveMoney /> },
    { text: "Person", icon: <BsFillPersonFill /> },
    { text: "Event", icon: <RiCalendarEventFill /> }
  ];

  const body = (
    <Container>
      <Card className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {buttons.map((item) => (
          <DashboardButton
            text={item.text}
            icon={item.icon}
            onClick={item.onClick}
            key={item.text}
          ></DashboardButton>
        ))}
      </Card>
    </Container>
  );

  return (
    <Fragment>
      {head}
      {body}
    </Fragment>
  );
}
