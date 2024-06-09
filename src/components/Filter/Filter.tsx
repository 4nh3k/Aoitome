import { Label, Radio, TextInput } from "flowbite-react";
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
  return (
    <Container className="w-72 px-6 py-6 my-8 h-fit bg-white rounded-xl shadow-sm divide-y space-y-3">
      <div>
        <div className="heading-5 mb-2">Genres</div>

        <button className="text-blue-700 mt-1.5 text-sm flex items-center hover:text-blue-800 font-medium font-['Inter'] leading-none">
          See more <PiArrowRight className="ml-1" />
        </button>
      </div>
      <fieldset>
        <div className="heading-5 mb-2 mt-2">Price</div>
        <button className="text-blue-700 mb-1.5 text-sm flex items-center hover:text-blue-800 font-medium font-['Inter'] leading-none">
          <PiCaretLeft className="mr-1" /> Any price
        </button>
        {priceRanges.map((priceRange) => (
          <div key={priceRange.id} className=" space-x-2 mt-1">
            <Radio id={priceRange.id} name="Price" value={priceRange.name} />
            <Label htmlFor={priceRange.name}>{priceRange.name}</Label>
          </div>
        ))}
        <div className="flex space-x-6 mt-1">
          <div>
            <Label htmlFor="from" value="From" />
            <TextInput id="from" type="number" required />
          </div>
          <div>
            <Label htmlFor="to" value="To" />
            <TextInput id="to" type="number" required />
          </div>
        </div>
      </fieldset>
    </Container>
  );
}
