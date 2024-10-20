import { useQuery } from "@tanstack/react-query";
import {
  Checkbox,
  Label,
  Pagination,
  Radio,
  Select,
  TextInput,
} from "flowbite-react";
import { useDeferredValue, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { bookApi } from "@/apis/book.api";
import Container from "@/components/Container";
import Product from "@/components/Product";
import { genresApi } from "@/apis/genres.api";

export function SearchPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const q = queryParams.get("q");
  const [page, setPage] = useState(1);
  const pageSize = 16;
  console.log(q, page);

  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isExpandGenre, setIsExpandGenre] = useState(false);
  const [isPriceAscending, setIsPriceAscend] = useState(true);
  const [checkedGenres, setCheckedGenres] = useState<number[]>([]);
  const [startPrice, setStartPrice] = useState(0);
  const handleStartPrice = (e) => {
    setStartPrice(e.target.value !== "" ? e.target.value : 0);
  };

  const [endPrice, setEndPrice] = useState(1);
  const handleEndPrice = (e) => {
    setEndPrice(e.target.value !== "" ? e.target.value : 0);
  };

  const handleCheckboxChange = (genreId: number) => {
    setCheckedGenres((prev) => {
      if (prev.includes(genreId)) {
        // If the genre is already checked, remove it from the array
        return prev.filter((id) => id !== genreId);
      } else {
        // If the genre is not checked, add it to the array
        return [...prev, genreId];
      }
    });
  };

  useEffect(() => {
    console.log(checkedGenres);
  }, [checkedGenres]);

  const { data: genreData, isLoading: isLoadingGenre } = useQuery({
    queryKey: ["genres", 0, 999],
    queryFn: async () => {
      const res = await genresApi.getGenresByPage(0, 999);
      console.log(res.data);
      return res.data;
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: [
      "search",
      q,
      page - 1,
      isPriceAscending,
      checkedGenres,
      startPrice,
      endPrice,
    ],
    queryFn: async () => {
      const res = await bookApi.getSearchBookByPage(
        q ?? "",
        page - 1,
        pageSize,
        isPriceAscending,
        checkedGenres,
        startPrice < endPrice ? startPrice : 0,
        startPrice < endPrice ? endPrice : 0
      );
      return res.data;
    },
  });

  const defered = useDeferredValue(data);
  const isStaleData = data !== defered;

  const totalPages = Math.floor((data?.totalItems ?? 0) / pageSize) + 1;

  const priceRanges = [
    { id: "ALL", name: "Any price", startValue: 0, endValue: 0 },
    { id: "U10", name: "Under $10", startValue: 0, endValue: 9.99999999 },
    { id: "R10-20", name: "$10 - $20", startValue: 10, endValue: 20 },
    { id: "R20-30", name: "$20 - $30", startValue: 20, endValue: 30 },
    { id: "R30-40", name: "$30 - $40", startValue: 30, endValue: 40 },
    { id: "O40", name: "Over $40", startValue: 40, endValue: 999 },
  ];

  const handleSortChange = (event: any) => {
    const value = event.target.value;
    if (value === "ascending") {
      setIsPriceAscend(true);
    }
    if (value === "descending") {
      setIsPriceAscend(false);
    }
  };

  const handleStartPriceBlur = () => {
    if (startPrice === null || startPrice === undefined) {
      setStartPrice(0);
    }
  };

  const handleEndPriceBlur = () => {
    if (endPrice === null || endPrice === undefined) {
      setStartPrice(0);
    }
  };

  return (
    <div className="flex space-x-7">
      <Container className="w-[23rem] px-4 py-4 my-8 h-fit bg-white rounded-xl shadow-sm divide-y space-y-3 content-border">
        <div
          className={`flex flex-col transition-all duration-1000 ease-in-out overflow-hidden ${
            isExpandGenre ? "max-h-fit" : "max-h-[500px]"
          }`}
        >
          <div className="flex flex-1 justify-between items-center mb-2">
            <div className="heading-5 ">Genres</div>
            <button
              id="reset-genre"
              className="appearance-none outline-none text-sm font-medium text-primary"
              onClick={() => setCheckedGenres([])}
            >
              Reset
            </button>
          </div>
          {genreData?.data
            .slice(0, isExpandGenre ? genreData.data.length : 10)
            .map((genre) => (
              <div key={genre.id} className="ml-2 space-x-2 mt-1 mb-2">
                <Checkbox
                  id={genre.name}
                  checked={checkedGenres.includes(genre.id)}
                  onChange={() => handleCheckboxChange(genre.id)}
                />
                <Label htmlFor={genre.name}>{genre.name}</Label>
              </div>
            ))}

          <button
            id="expanded-genre"
            className="appearance-none outline-none text-sm font-medium text-primary mx-auto mt-2"
            onClick={() => setIsExpandGenre(!isExpandGenre)}
          >
            {isExpandGenre ? "View less" : "See more"}
          </button>
        </div>
        <div className="flex flex-col gap-4">
          <fieldset>
            <div className="heading-5 mt-2">Price</div>
            {priceRanges.map((priceRange) => (
              <div key={priceRange.id} className="ml-2 mb-2 space-x-2 mt-1">
                <Radio
                  id={priceRange.id}
                  name="Price"
                  value={priceRange.name}
                />
                <Label htmlFor={priceRange.name}>{priceRange.name}</Label>
              </div>
            ))}
            <div className="flex space-x-6 mt-1">
              <div className="flex">
                <div className="flex flex-col gap-1">
                  <Label htmlFor="from" value="From" />
                  <div className="flex items-center gap-2">
                    <TextInput
                      min={0}
                      value={startPrice}
                      id="from"
                      type="number"
                      required
                      onChange={handleStartPrice}
                      onBlur={handleStartPriceBlur}
                    />
                    <span>$</span>
                  </div>
                </div>
              </div>
              <div className="flex">
                <div className="flex flex-col gap-1">
                  <Label htmlFor="to" value="To" />
                  <div className="flex items-center gap-2">
                    <TextInput
                      min={0}
                      value={endPrice}
                      id="to"
                      type="number"
                      required
                      onChange={handleEndPrice}
                      onBlur={handleEndPriceBlur}
                    />
                    <span>$</span>
                  </div>
                </div>
              </div>
            </div>
          </fieldset>
          {startPrice >= endPrice && (
            <span className="text-center text-sm font-medium text-error">
              The price range is not valid
            </span>
          )}
        </div>
      </Container>
      <Container>
        {data?.data.length === 0 && <div>No result found</div>}
        {!(data?.data.length === 0) && (
          <div className="flex flex-col justify-between">
            <div>
              <div className="heading-5 mb-2">
                Search Result:{" "}
                <span className="text-lg font-normal text-blue-600">
                  ({data?.totalItems} results)
                </span>
              </div>
              <div className="my-4 flex items-center justify-end space-x-4">
                <span>Sort by:</span>
                <Select onChange={handleSortChange}>
                  <option value={"acsending"}>Price: Low to High</option>
                  <option value={"descending"}>Price: High to Low</option>
                </Select>
              </div>

              {isLoading && (
                <div
                  id="overlay"
                  className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 "
                >
                  <div className="spinner-loader"></div>
                </div>
              )}
              {!isLoading && (
                <div
                  className={`grid grid-cols-4 justify-items-center gap-y-6 transition-opacity duration-1000 ${
                    isStaleData ? "opacity-50" : "opacity-100"
                  }`}
                >
                  {data?.data.map((book, index) => (
                    <Product
                      key={index}
                      id={book.id}
                      imageURL={book.imageUrl ?? "N/A"}
                      price={book.price ?? 0}
                      title={book.title ?? "N/A"}
                      rating={book.averageRating ?? 0}
                      totalRating={book.ratingsCount ?? 0}
                    />
                  ))}
                </div>
              )}
            </div>
            {!isLoading && data?.data.length !== 0 && (
              <div className="flex justify-center mt-8">
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={(page) => setPage(page)}
                />
              </div>
            )}
          </div>
        )}
      </Container>
    </div>
  );
}
