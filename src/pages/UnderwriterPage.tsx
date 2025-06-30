import { BreadcrumbItem, Breadcrumbs } from "@heroui/breadcrumbs";
import { Button } from "@heroui/button";

import "@src/assets/global.css";
import NavbarComponent from "@src/components/Navbar";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

type uwInformation = {
  stocks: Array<String>;
  underwriter: {
    name: string;
    code: string;
  };
};
const UnderwriterPage = () => {
  const { uwName } = useParams();

  const [uwInformation, setUwInformation] = useState({} as uwInformation);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUwInformation = async () => {
      try {
        const data = await fetch(`/data/underwriter/${uwName}.json`);

        const jsonData = await data.json();

        setUwInformation(jsonData);
      } catch (e) {
        navigate("/error/500");
      }
    };

    fetchUwInformation();
  }, []);

  return (
    <>
      <NavbarComponent />
      <nav className="m-14 font-medium">
        <Breadcrumbs>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem>Underwriter</BreadcrumbItem>
        </Breadcrumbs>
      </nav>

      <div className="m-14">
        <h1 className="mb-5 text-2xl font-bold">
          {uwInformation?.underwriter?.code} -{" "}
          {uwInformation?.underwriter?.name}
        </h1>

        <div className="flex flex-wrap gap-4 items-center">
          {uwInformation?.stocks?.map((stock, index) => (
            <Button
              key={index}
              color="primary"
              onPress={() => navigate(`/stock/${stock}`)}
            >
              {stock}
            </Button>
          ))}
        </div>
      </div>
    </>
  );
};

export default UnderwriterPage;
