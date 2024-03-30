import { Checkbox, Label, Select, TextInput, Textarea } from "flowbite-react";

export function DeliveryAddressForm() {
  return (
    <div className="w-full px-5 py-5 space-y-8 bg-white rounded border border-gray-200 flex-col justify-start items-start inline-flex">
      {/* <fieldset className="flex max-w-md gap-4">
        <div className="flex items-center gap-2">
          <Radio
            id="united-state"
            name="countries"
            value="USA"
            defaultChecked
          />
          <Label htmlFor="united-state">Individual</Label>
        </div>
        <div className="flex items-center gap-2">
          <Radio id="germany" name="countries" value="Germany" />
          <Label htmlFor="germany">Company</Label>
        </div>
      </fieldset> */}
      <span className="heading-5">Delivery Adress</span>
      <div className="w-full">
        <div className="mb-2 block">
          <Label className="font-medium" value="Save address" />
        </div>
        <Select id="countries" required>
          <option>United States</option>
          <option>Canada</option>
          <option>France</option>
          <option>Germany</option>
        </Select>
      </div>
      <div className="flex w-full space-x-3">
        <div className="w-full">
          <div className="mb-2 block">
            <Label className="font-medium" value="First Name*" />
          </div>
          <TextInput placeholder="Enter your first name" type="text" />
        </div>
        <div className="w-full">
          <div className="mb-2 block">
            <Label className="font-medium" value="Last Name*" />
          </div>
          <TextInput placeholder="Enter your last name" type="text" />
        </div>
      </div>
      <div className="w-full">
        <div className="mb-2 block">
          <Label className="font-medium" value="Phone Number*" />
        </div>
        <TextInput placeholder="Enter your phone number" type="text" />
      </div>
      <div className="w-full">
        <div className="mb-2 block">
          <Label className="font-medium" value="Your Address*" />
        </div>
        <Textarea
          id="comment"
          placeholder="Write your address here..."
          required
          rows={4}
        />
      </div>
      <div className="flex w-full space-x-3">
        <div className="w-full">
          <div className="mb-2 block">
            <Label className="font-medium" value="Country*" />
          </div>
          <Select id="countries" required>
            <option>United States</option>
            <option>Canada</option>
            <option>France</option>
            <option>Germany</option>
          </Select>
        </div>
        <div className="w-full">
          <div className="mb-2 block">
            <Label className="font-medium" value="City*" />
          </div>
          <Select id="countries" required>
            <option>United States</option>
            <option>Canada</option>
            <option>France</option>
            <option>Germany</option>
          </Select>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="accept" defaultChecked />
        <Label htmlFor="accept" className="flex">
          Save the data in the address list
        </Label>
      </div>
    </div>
  );
}
