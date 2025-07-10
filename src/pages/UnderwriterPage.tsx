import { BreadcrumbItem, Breadcrumbs } from "@heroui/breadcrumbs";
import { Button } from "@heroui/button";

import "@src/assets/global.css";
import NavbarComponent from "@src/components/Navbar";
import { DateUtil } from "@src/utils/dateUtil";
import { NumberUtil } from "@src/utils/numberUtil";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

type uwInformation = {
  stocks: Array<String>;
  underwriter: {
    name: string;
    code: string;
  };
};

type StockRowProps = {
  stockName: string;
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

  const StockRow = ({ stockName }: StockRowProps) => {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
      const getStockData = async () => {
        try {
          const data = await fetch(`/data/stock/${stockName}.json`);

          const jsonData = await data.json();
          
          setData(jsonData);
        } catch (e) {
          navigate("/error/500");
        }
      };

      getStockData();
    }, [stockName]);

    return (
      <tr className="border-b">
        <td className="px-4 py-2 font-medium">
          <Button
            color="primary"
            onPress={() => navigate(`/stock/${stockName}`)}
          >
            {stockName}
          </Button>
        </td>
        <td className="px-4 py-2">{DateUtil.formatToLongDate(data?.listing_date) || "N/A"}</td>
        <td className="px-4 py-2">Rp. {data?.listing_price?.open || "N/A"}</td>
        <td className="px-4 py-2">Rp. {data?.listing_price?.high || "N/A"}</td>
        <td className="px-4 py-2">Rp. {data?.listing_price?.low || "N/A"}</td>
        <td className="px-4 py-2">Rp. {data?.listing_price?.close || "N/A"}</td>
        <td className="px-4 py-2">
          <span
            className={`${data?.listing_price?.change > 0 ? "text-green-500" : "text-red-500"}`}
          >
            {NumberUtil.formatToRupiah(
              data?.listing_price?.change,
            )}{" "}
            ({data?.listing_price?.percentage_change})
          </span>
        </td>
        <td className="px-4 py-2">{data?.listing_price?.volume || "N/A"}</td>
      </tr>
    );
  };

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

        <div className="overflow-x-auto w-full">
          <table className="min-w-[800px] table-auto border-collapse w-full mt-6">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="px-4 py-2 text-left">Title</th>
                <th className="px-4 py-2 text-left">Listing Date</th>
                <th className="px-4 py-2 text-left">Open</th>
                <th className="px-4 py-2 text-left">High</th>
                <th className="px-4 py-2 text-left">Low</th>
                <th className="px-4 py-2 text-left">Close</th>
                <th className="px-4 py-2 text-left">Change</th>
                <th className="px-4 py-2 text-left">Volume</th>
              </tr>
            </thead>
            <tbody>
              {uwInformation?.stocks?.map((stock, index) => (
                <StockRow key={index} stockName={`${stock}`} />
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </>
  );
};

export default UnderwriterPage;
