import { CreateDeliveryDTO } from "@/types/Deliveries/CreateDeliveryDto.type";
import { Checkbox, Label, TextInput, Textarea } from "flowbite-react";

interface DeliveryAddressFormProps {
  deliveryAddress: CreateDeliveryDTO;
  setDeliveryAddress: (deliveryAddress: CreateDeliveryDTO) => void;
}

export function DeliveryAddressForm({
  deliveryAddress,
  setDeliveryAddress,
}: DeliveryAddressFormProps) {
  const handleDeliveryAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDeliveryAddress({
      ...deliveryAddress,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="w-full px-5 py-5 space-y-8 bg-white rounded border border-gray-200 flex-col justify-start items-start inline-flex">
      <span className="heading-5">Delivery Adress</span>

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
          onChange={(e) => {
            setDeliveryAddress({
              ...deliveryAddress,
              information: e.target.value,
            });
          }}
          rows={4}
        />
      </div>
      <div className="flex w-full space-x-3">
        <div className="w-full">
          <div className="mb-2 block">
            <Label className="font-medium" value="Province*" />
          </div>
          <TextInput
            placeholder="Enter your province"
            name="province"
            onChange={handleDeliveryAddressChange}
            type="text"
          />
        </div>
      </div>
      <div className="flex w-full space-x-3">
        <div className="w-full">
          <div className="mb-2 block">
            <Label className="font-medium" value="District*" />
          </div>
          <TextInput
            placeholder="Enter your district"
            name="district"
            onChange={handleDeliveryAddressChange}
            type="text"
          />
        </div>
      </div>
      <div className="flex w-full space-x-3">
        <div className="w-full">
          <div className="mb-2 block">
            <Label className="font-medium" value="Ward*" />
          </div>
          <TextInput
            placeholder="Enter your ward"
            name="ward"
            onChange={handleDeliveryAddressChange}
            type="text"
          />
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
