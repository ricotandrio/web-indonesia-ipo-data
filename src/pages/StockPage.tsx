import { Avatar } from '@heroui/avatar';
import { Button } from '@heroui/button';
import '@src/assets/global.css';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import TradingViewIcon from '@src/assets/icons/tradingview-svgrepo-com.svg';
import RocketIcon from '@src/assets/icons/rocket.svg';
import { BreadcrumbItem, Breadcrumbs } from '@heroui/breadcrumbs';
import NavbarComponent from '@src/components/Navbar';
import { Tab, Tabs } from '@heroui/tabs';
import { Card, CardBody } from '@heroui/card';
import { NumberUtil } from '@src/utils/numberUtil';
import { DateUtil } from '@src/utils/dateUtil';

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

type Performance = {
  '1D': string;
  '1W': string;
  '1M': string;
  '6M': string;
  '1Y': string;
  updated_at: string;
  source: string;
}

type Fundamentals = {
  aset_percentage: string;
  laba_bersih_percentage: string;
  liabilitas_percentage: string;
  pendapatan_percentage: string;
  source: string;
  updated_at: string;
}

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
  performa: Performance;
  fundamental: Fundamentals;
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

      <NavbarComponent />
      <nav className='m-14 font-medium'>
        <Breadcrumbs>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem onClick={() => window.history.back()}>Underwriter</BreadcrumbItem>
          <BreadcrumbItem>Stock</BreadcrumbItem>
        </Breadcrumbs>
      </nav>
      <div className="m-14">
        <div className='flex flex-row flex-wrap'>
          <Avatar className='mr-2' src={stockInformation?.image} />
          <h1 className="mb-5 text-2xl font-bold">
            ({stockInformation?.ticker_code}) {stockInformation?.company_name}
          </h1>
        </div>

        <p className="text-gray-600">
          <strong>Sector:</strong> {stockInformation?.sector} |{" "}
          <strong>Subsector:</strong> {stockInformation?.subsector}
        </p>


        <div className="flex w-full flex-col mt-5">
          <Tabs aria-label="Options">
            <Tab key="informasi-umum" title="Informasi Umum">
              <Card shadow='sm'>
                <CardBody>
                  <p>
                    <strong>IPO Status:</strong> {stockInformation?.ipo_status}
                  </p>
                  <p>
                    <strong>Final Price:</strong> {NumberUtil.formatToRupiah(stockInformation?.final_price)}
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

                  <br />
                  <p>
                    <strong>Number of Shares Offered:</strong> {stockInformation?.number_of_shares_offered} saham
                  </p>
                  <p>
                    <strong>Percentage of Total Shares:</strong> {stockInformation?.percentage_of_total_shares * 100}%
                  </p>
                  <p>
                    <strong>Participant Admin:</strong> {stockInformation?.participant_admin?.name} ({stockInformation?.participant_admin?.code})
                  </p>
                </CardBody>
              </Card>
            </Tab>

            <Tab key="book-building" title="Book Building">
              <Card shadow='sm'>
                <CardBody>
                  <p>
                    <strong>Opening:</strong> {DateUtil.formatToLongDate(stockInformation?.book_building_opening)}
                  </p>
                  <p>
                    <strong>Closing:</strong> {DateUtil.formatToLongDate(stockInformation?.book_building_closing)}
                  </p>
                  <p>
                    <strong>Lowest Price:</strong> {NumberUtil.formatToRupiah(stockInformation?.lowest_book_building_price)}
                  </p>
                  <p>
                    <strong>Highest Price:</strong> {NumberUtil.formatToRupiah(stockInformation?.highest_book_building_price)}
                  </p>
                </CardBody>
              </Card>
            </Tab>

            <Tab key="offering-to-listing-period" title="Offering to Listing Period">
              <Card shadow='sm'>
                <CardBody>
                  <p>
                    <strong>Opening:</strong> {DateUtil.formatToLongDate(stockInformation?.opening_of_offering_period)}
                  </p>
                  <p>
                    <strong>Closing:</strong> {DateUtil.formatToLongDate(stockInformation?.closing_of_offering_period)}
                  </p>
                  <p>
                    <strong>Closing Date:</strong> {DateUtil.formatToLongDate(stockInformation?.closing_date)}
                  </p>
                  <p>
                    <strong>Distribution Date:</strong> {DateUtil.formatToLongDate(stockInformation?.distribution_date)}
                  </p>
                  <p>
                    <strong>Listing Date:</strong> {DateUtil.formatToLongDate(stockInformation?.listing_date)}
                  </p>
                </CardBody>
              </Card>
            </Tab>
            <Tab key="underwriters" title="Underwriters">
              <Card shadow='sm'>
                <CardBody>
                  <div className='gap-2 sm:gap-3 flex flex-wrap flex-row'>
                    {stockInformation?.underwriters?.map((uw, index) => (
                      <Button key={index} color='primary' variant='flat' onPress={() => navigate(`/uw/${uw?.code}`)}>
                        {uw?.code} - {uw?.name} ({uw?.percentage ? (uw?.percentage * 100) : "NaN"}%)
                      </Button>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </Tab>
            <Tab key="listing" title="Listing Price">
              <Card shadow='sm'>
                <CardBody>
                  <p>Pergerakan harga saham saat hari listing.</p>
                  <br />
                  <p>
                    <strong>Open:</strong> {NumberUtil.formatToRupiah(stockInformation?.listing_price?.open)}
                  </p>
                  <p>
                    <strong>High:</strong> {NumberUtil.formatToRupiah(stockInformation?.listing_price?.high)}
                  </p>
                  <p>
                    <strong>Low:</strong> {NumberUtil.formatToRupiah(stockInformation?.listing_price?.low)}
                  </p>
                  <p>
                    <strong>Close:</strong> {NumberUtil.formatToRupiah(stockInformation?.listing_price?.close)}
                  </p>
                  <p>
                    <strong>Change: </strong>
                    <span className={`${stockInformation?.listing_price?.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {NumberUtil.formatToRupiah(stockInformation?.listing_price?.change)} ({stockInformation?.listing_price?.percentage_change})
                    </span>
                  </p>
                  <p>
                    <strong>Volume:</strong> {stockInformation?.listing_price?.volume}
                  </p>
                </CardBody>
              </Card>
            </Tab>
            <Tab key="performance" title="Performance">
              <Card shadow='sm'>
                <CardBody>
                  <p>Pergerakan harga saham sejak tercatat.</p>
                  <br />
                  <p>
                    <strong>1D: </strong>{stockInformation?.performa?.['1D']}
                  </p>
                  <p>
                    <strong>1W: </strong>{stockInformation?.performa?.['1W']}
                  </p>
                  <p>
                    <strong>1M: </strong>{stockInformation?.performa?.['1M']}
                  </p>
                  <p>
                    <strong>6M: </strong>{stockInformation?.performa?.['6M']}
                  </p>
                  <p>
                    <strong>1Y: </strong>{stockInformation?.performa?.['1Y']}
                  </p>
                  <p>
                    <strong>Updated at: </strong>{stockInformation?.performa?.updated_at}
                  </p>
                  <p>
                    <strong>Source: </strong> <a target='_blank' className='underline text-blue-500' href={stockInformation?.performa?.source}>{stockInformation?.performa?.source}</a>
                  </p>
                </CardBody>
              </Card>
            </Tab>
            <Tab key="fundamental" title="Fundamental">
              <Card shadow='sm'>
                <CardBody>
                  <p>Pertumbuhan kinerja keuangan 1 tahun sejak tercatat.</p>
                  <br />
                  <p>
                    <strong>Aset: </strong>{stockInformation?.fundamental?.aset_percentage}
                  </p>
                  <p>
                    <strong>Laba Bersih: </strong>{stockInformation?.fundamental?.laba_bersih_percentage}
                  </p>
                  <p>
                    <strong>Liabilitas: </strong>{stockInformation?.fundamental?.liabilitas_percentage}
                  </p>
                  <p>
                    <strong>Pendapatan: </strong>{stockInformation?.fundamental?.pendapatan_percentage}
                  </p>
                  <p>
                    <strong>Updated at: </strong>{stockInformation?.fundamental?.updated_at}
                  </p>
                  <p>
                    <strong>Source: </strong> <a target='_blank' className='underline text-blue-500' href={stockInformation?.fundamental?.source}>{stockInformation?.fundamental?.source}</a>
                  </p>
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </div>

        <div className='flex flex-row flex-wrap gap-3 mt-5'>

          <Button
            className="sm:mt-5 bg-black text-white font-medium"
            onPress={() => window.open(`https://www.tradingview.com/symbols/IDX-${stockInformation?.ticker_code}`, '_blank')}
            startContent={<img src={TradingViewIcon} className='w-10' />}
          >
            Open in TradingView
          </Button>

          <Button
            className="sm:mt-5 text-white font-medium"
            color='success'
            onPress={() => window.open(`https://e-ipo.co.id/id/ipo/index?query=${stockInformation?.ticker_code}`, '_blank')}
            startContent={<img src={RocketIcon} className='w-6' />}
          >
            Open in e-IPO
          </Button>
        </div>
      </div>
    </>
  );

}

export default StockPage;