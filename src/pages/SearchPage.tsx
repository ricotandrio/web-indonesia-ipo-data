import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { BreadcrumbItem, Breadcrumbs } from "@heroui/breadcrumbs";
import { Tooltip } from "@heroui/tooltip";

import NavbarComponent from "@src/components/Navbar";
import SearchInput from "@src/components/SearchInput";
import stocks from "@public/data/stocks.json";
import underwriters from "@public/data/underwriters.json";
import "@src/assets/global.css";

type SearchResult = {
  type: "stock" | "underwriter";
  code: string;
  name?: string;
  ticker?: string;
};

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const query = searchParams.get("q") || "";

  useEffect(() => {
    if (query.trim()) {
      performSearch(query.trim());
    } else {
      setSearchResults([]);
    }
  }, [query]);

  const performSearch = (searchTerm: string) => {
    setIsLoading(true);
    const lowerSearchTerm = searchTerm.toLowerCase();
    const results: SearchResult[] = [];

    // Search in stocks (ticker codes)
    stocks.forEach((ticker) => {
      if (ticker.toLowerCase().includes(lowerSearchTerm)) {
        results.push({
          type: "stock",
          code: ticker,
          ticker: ticker,
        });
      }
    });

    // Search in underwriters (codes and names)
    underwriters.forEach((uw) => {
      if (
        uw.underwriter_code.toLowerCase().includes(lowerSearchTerm) ||
        uw.underwriter_name.toLowerCase().includes(lowerSearchTerm)
      ) {
        results.push({
          type: "underwriter",
          code: uw.underwriter_code,
          name: uw.underwriter_name,
        });
      }
    });

    setSearchResults(results);
    setIsLoading(false);
  };

  const handleStockClick = (ticker: string) => {
    navigate(`/stock/${ticker}`);
  };

  const handleUnderwriterClick = (code: string) => {
    navigate(`/uw/${code}`);
  };

  return (
    <>
      <NavbarComponent />
      <nav className="m-14 font-medium">
        <Breadcrumbs>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem>Search</BreadcrumbItem>
        </Breadcrumbs>
      </nav>

      <div className="m-14">
        <h1 className="mb-5 text-2xl font-bold">Search IPO Data</h1>

        <div className="mb-8">
          <SearchInput value={query} />
        </div>

        {query && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">
              Search results for "{query}" ({searchResults.length} results)
            </h2>

            {isLoading ? (
              <p>Searching...</p>
            ) : searchResults.length === 0 ? (
              <Card>
                <CardBody>
                  <p className="text-gray-600">
                    No results found for "{query}". Try searching with different
                    keywords.
                  </p>
                </CardBody>
              </Card>
            ) : (
              <div className="space-y-4">
                {/* Stock Results */}
                {searchResults.filter((r) => r.type === "stock").length > 0 && (
                  <div>
                    <h3 className="text-md font-medium mb-2">Stocks</h3>
                    <div className="flex flex-wrap gap-2">
                      {searchResults
                        .filter((r) => r.type === "stock")
                        .map((result, index) => (
                          <Button
                            key={index}
                            color="primary"
                            variant="flat"
                            onPress={() => handleStockClick(result.ticker!)}
                          >
                            {result.ticker}
                          </Button>
                        ))}
                    </div>
                  </div>
                )}

                {/* Underwriter Results */}
                {searchResults.filter((r) => r.type === "underwriter").length >
                  0 && (
                  <div>
                    <h3 className="text-md font-medium mb-2">Underwriters</h3>
                    <div className="flex flex-wrap gap-2">
                      {searchResults
                        .filter((r) => r.type === "underwriter")
                        .map((result, index) => (
                          <Tooltip
                            key={index}
                            className="capitalize"
                            color="primary"
                            content={result.name}
                          >
                            <Button
                              color="primary"
                              variant="flat"
                              onPress={() =>
                                handleUnderwriterClick(result.code)
                              }
                            >
                              {result.code}
                            </Button>
                          </Tooltip>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {!query && (
          <Card>
            <CardBody>
              <p className="text-gray-600">
                Enter a search term to find stocks by ticker code or
                underwriters by code/name.
              </p>
            </CardBody>
          </Card>
        )}
      </div>
    </>
  );
};

export default SearchPage;
