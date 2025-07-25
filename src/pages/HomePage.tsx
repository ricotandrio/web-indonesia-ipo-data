import { useNavigate } from "react-router-dom";
import { Button } from "@heroui/button";

import uws from "@public/data/underwriters.json";
import "@src/assets/global.css";
import { BreadcrumbItem, Breadcrumbs } from "@heroui/breadcrumbs";
import { Tooltip } from "@heroui/tooltip";

import GithubIcon from "@src/assets/icons/github.svg";
import { Divider } from "@heroui/divider";
import NavbarComponent from "@src/components/Navbar";
import DataStatus from "@public/data/information.json";
import SearchInput from "@src/components/SearchInput";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="w-full h-[100vh] justify-between flex flex-col pb-10">
        <NavbarComponent />
        <nav className="mx-14 my-5 font-medium">
          <Breadcrumbs>
            <BreadcrumbItem href="/">Home</BreadcrumbItem>
          </Breadcrumbs>
        </nav>

        <div className="mx-14 mb-0">
          <SearchInput />
        </div>

        <div className="m-14">
          <h1 className="mb-5 text-2xl font-bold">Underwriter</h1>
          <div className="flex flex-wrap gap-3 justify-start">
            {uws.map((uw, index) => (
              <Tooltip
                key={index}
                className="capitalize"
                color="primary"
                content={`${uw?.underwriter_name}`}
              >
                <Button
                  key={index}
                  color="primary"
                  variant="flat"
                  onPress={() => navigate(`/uw/${uw?.underwriter_code}`)}
                >
                  {uw?.underwriter_code}
                </Button>
              </Tooltip>
            ))}
          </div>
        </div>

        <div className="mx-14">
          <Divider className="my-8 mt-10" />

          <div className="mt-5">
            <Button
              className="bg-black text-white font-medium"
              onPress={() =>
                window.open(
                  "https://github.com/ricotandrio/web-indonesia-ipo-data",
                  "_blank",
                )
              }
              startContent={<img src={GithubIcon} className="w-5" />}
            >
              GitHub Repository
            </Button>
          </div>

          <footer className="mt-14 mb-5 w-full text-center">
            Last updated at {DataStatus?.updated_at}
          </footer>
        </div>
      </div>
    </>
  );
};

export default HomePage;
