import { genresApi } from "@/apis/genres.api";
import { useQuery } from "@tanstack/react-query";
import { Checkbox, Label, Radio, Spinner, TextInput } from "flowbite-react";
import { PiArrowRight, PiCaretLeft } from "react-icons/pi";
import Container from "../Container";

const priceRanges = [
  { id: "1", name: "Under $10" },
  { id: "2", name: "$10 - $20" },
  { id: "3", name: "$20 - $30" },
  { id: "4", name: "$30 - $40" },
  { id: "5", name: "Over $40" },
];

export function Filter() {
  const { data, isLoading } = useQuery({
    queryKey: ["genres", 0, 10],
    queryFn: async () => {
      const res = await genresApi.getGenresByPage(0, 10);
      console.log(res.data);
      return res.data;
    },
  });
  
  return (
    <Container className="w-[21rem] px-4 py-4 my-8 h-fit bg-white rounded-xl shadow-sm divide-y space-y-3 content-border">
      <div>
        <div className="heading-5 mb-2">Genres</div>
        {data?.data.map((genre) => (
          <div key={genre.id} className="ml-2 space-x-2 mt-1 mb-2">
            <Checkbox id={genre.name} />
            <Label htmlFor={genre.name}>{genre.name}</Label>
          </div>
        ))}
        <button className="text-blue-700 mt-1.5 text-sm flex items-center hover:text-blue-800 font-medium font-['Inter'] leading-none">
          See more <PiArrowRight className="ml-1" />
        </button>
      </div>
      
      <fieldset>
        <div className="heading-5 mb-2 mt-2">Price</div>
        <button className="text-blue-700 mb-1.5 text-sm flex items-center hover:text-blue-800 font-medium font-['Inter'] leading-none">
          <PiCaretLeft className="ml-2 mr-1 mb-2" /> Any price
        </button>
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
    </Container>
  );
}
