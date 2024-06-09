import productApi from "@/apis/product.api";
import Filter from "@/components/Filter";
import { useQuery } from "@tanstack/react-query";
import { Pagination, Select } from "flowbite-react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Container from "../../components/Container";
import Product from "../../components/Product";

export function SearchPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const q = queryParams.get("q");
  const [page, setPage] = useState(1);
  const pageSize = 16;
  console.log(q, page);
  const { data, isLoading } = useQuery({
    queryKey: ["search", q, page - 1],
    queryFn: async () => {
      var res = await productApi.searchProduct(page, pageSize, q);
      return res.data.result;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  const totalPages = Math.floor((data?.totalCount ?? 0) / pageSize) + 1;

  return (
    <div className="flex space-x-7">
      <Filter />
      <Container>
        {data?.data.length === 0 && <div>No result found</div>}
        {!(data?.data.length === 0) && (
          <>
            <div className="heading-5 mb-2">
              Search Result:{" "}
              <span className="text-lg font-normal text-blue-600">
                ({data?.totalCount} results)
              </span>
            </div>
            <div className="my-4 flex items-center justify-end space-x-4">
              <span>Sort by:</span>
              <Select>
                <option>Best Match</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest Arrivals</option>
              </Select>
            </div>
            <div className="grid grid-cols-4 gap-7">
              {data?.data.map((product, index) => (
                <Product
                  key={index}
                  id={product.id}
                  title={product.name}
                  imageURL={product.items[0].image}
                  price={product.items[0].price}
                  rating={product.averageRating}
                  totalRating={product.ratingCount}
                />
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={(page) => setPage(page)}
              />
            </div>
          </>
        )}
      </Container>
    </div>
  );
}
