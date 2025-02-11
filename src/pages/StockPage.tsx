import '@src/assets/global.css';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

type Underwriter = {
  code: string;
  name: string;
  percentage: number;
};

type ParticipantAdmin = {
  code: string;
  name: string;
};

type Warrant = {
  code: string;
  per_share_ratio: number;
  exercise_price_rp: number;
  open: string;
  high: string;
  low: string;
  close: string;
};

type ListingPrice = {
  open: number;
  high: number;
  low: number;
  close: number;
  change: number;
  percentage_change: string;
  volume: number;
};

type StockInformation = {
  ipo_status: string;
  ticker_code: string;
  image: string;
  company_name: string;
  sector: string;
  subsector: string;
  listing_board: string;
  final_price: number;
  line_of_business: string;
  address: string;
  website: string;
  number_of_shares_offered: number;
  percentage_of_total_shares: number;
  participant_admin: ParticipantAdmin;
  book_building_opening: string;
  book_building_closing: string;
  lowest_book_building_price: number;
  highest_book_building_price: number;
  opening_of_offering_period: string;
  closing_of_offering_period: string;
  closing_date: string;
  distribution_date: string;
  listing_date: string;
  ara_arb_percentage: string;
  underwriters: Underwriter[];
  warrant: Warrant;
  listing_price: ListingPrice;
};

const StockPage = () => {
  const { stockCode } = useParams();

  const [stockInformation, setStockInformation] = useState({} as StockInformation);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchStockInformation = async () => {
      try {
        const data = await fetch(`/data/stock/${stockCode}.json`);

        const jsonData = await data.json();

        setStockInformation(jsonData);

      } catch (e) {
        navigate('/error/500');
      }
    }

    fetchStockInformation();
  }, []);

  return (
    <>
      <div className="m-14">
        <h1 className="mb-5 text-2xl font-bold">
          ({stockInformation?.ticker_code}) {stockInformation?.company_name}
        </h1>

        <p className="text-gray-600">
          <strong>Sector:</strong> {stockInformation?.sector} |{" "}
          <strong>Subsector:</strong> {stockInformation?.subsector}
        </p>

        <div className="mt-5 border p-4 rounded-lg shadow">
          <p>
            <strong>IPO Status:</strong> {stockInformation?.ipo_status}
          </p>
          <p>
            <strong>Final Price:</strong> Rp {stockInformation?.final_price}
          </p>
          <p>
            <strong>Listing Board:</strong> {stockInformation?.listing_board || "N/A"}
          </p>
          <p>
            <strong>Line of Business:</strong> {stockInformation?.line_of_business}
          </p>
          <p>
            <strong>Address:</strong> {stockInformation?.address}
          </p>
          <p>
            <strong>Website:</strong>{" "}
            <a
              href={stockInformation?.website}
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {stockInformation?.website}
            </a>
          </p>
        </div>

        <div className="mt-5 border p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Book Building</h2>
          <p>
            <strong>Opening:</strong> {stockInformation?.book_building_opening}
          </p>
          <p>
            <strong>Closing:</strong> {stockInformation?.book_building_closing}
          </p>
          <p>
            <strong>Lowest Price:</strong> Rp {stockInformation?.lowest_book_building_price}
          </p>
          <p>
            <strong>Highest Price:</strong> Rp {stockInformation?.highest_book_building_price}
          </p>
        </div>

        <div className="mt-5 border p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Underwriters</h2>
          {stockInformation?.underwriters?.map((uw, index) => (
            <p key={index}>
              {uw.name} ({uw.code}) - {uw.percentage * 100}%
            </p>
          ))}
        </div>

        <div className="mt-5 border p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Listing Price</h2>
          <p>
            <strong>Open:</strong> Rp {stockInformation?.listing_price?.open}
          </p>
          <p>
            <strong>High:</strong> Rp {stockInformation?.listing_price?.high}
          </p>
          <p>
            <strong>Low:</strong> Rp {stockInformation?.listing_price?.low}
          </p>
          <p>
            <strong>Close:</strong> Rp {stockInformation?.listing_price?.close}
          </p>
          <p>
            <strong>Change: </strong>
            <span className={`${stockInformation?.listing_price?.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
              {stockInformation?.listing_price?.change} ({stockInformation?.listing_price?.percentage_change})
            </span>
          </p>
          <p>
            <strong>Volume:</strong> {stockInformation?.listing_price?.volume}
          </p>
        </div>
      </div>
    </>
  );

}

export default StockPage;