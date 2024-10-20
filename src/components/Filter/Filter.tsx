import { genresApi } from "@/apis/genres.api";
import { useQuery } from "@tanstack/react-query";
import { Checkbox, Label, Radio, Spinner, TextInput } from "flowbite-react";
import Container from "@/components/Container";
import { useState } from "react";

const priceRanges = [
  { id: "ALL", name: "Any price" },
  { id: "U10", name: "Under $10" },
  { id: "R10-20", name: "$10 - $20" },
  { id: "R20-30", name: "$20 - $30" },
  { id: "R30-40", name: "$30 - $40" },
  { id: "O40", name: "Over $40" },
];

export function Filter() {
  const [isExpandGenre, setIsExpandGenre] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["genres", 0, 999],
    queryFn: async () => {
      const res = await genresApi.getGenresByPage(0, 999);
      console.log(res.data);
      return res.data;
    },
  });

  return (
    <Container className="w-[21rem] px-4 py-4 my-8 h-fit bg-white rounded-xl shadow-sm divide-y space-y-3 content-border">
      <div
        className={`flex flex-col transition-all duration-1000 ease-in-out overflow-hidden ${
          isExpandGenre ? "max-h-fit" : "max-h-[450px]"
        }`}
      >
        <div className="heading-5 mb-2">Genres</div>
        {data?.data
          .slice(0, isExpandGenre ? data.data.length : 10)
          .map((genre) => (
            <div key={genre.id} className="ml-2 space-x-2 mt-1 mb-2">
              <Checkbox id={genre.name} />
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
          <div className="heading-5 mb-2 mt-2">Price</div>
          {priceRanges.map((priceRange) => (
            <div key={priceRange.id} className="ml-2 mb-2 space-x-2 mt-1">
              <Radio id={priceRange.id} name="Price" value={priceRange.name} />
              <Label htmlFor={priceRange.name}>{priceRange.name}</Label>
            </div>
          ))}
          <div className="flex space-x-6 mt-1">
            <div className="space-y-1">
              <Label htmlFor="from" value="From" />
              <TextInput id="from" type="number" required />
            </div>
            <div className="space-y-1">
              <Label htmlFor="to" value="To" />
              <TextInput id="to" type="number" required />
            </div>
          </div>
        </fieldset>
        <button
          id="btn-filter-price"
          className="h-fit mx-auto my-auto p-2 flex  items-center gap-2 w-full text-center bg-white border-2 rounded-md py-3 font-semibold text-primary border-primary active:scale-95 transition duration-150 ease-in-out text-sm"
        >
          <span className="mx-auto">Filter</span>
        </button>
      </div>
    </Container>
  );
}
