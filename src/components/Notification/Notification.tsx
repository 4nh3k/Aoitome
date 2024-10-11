import { Dropdown } from "flowbite-react";
import { PiBell } from "react-icons/pi";
import { NotiItem } from "./NotiItem/NotiItem";

export function Notification() {
  return (
    <>
      <Dropdown
        inline
        className="w-[496px] "
        label={"Noti"}
        renderTrigger={() => (
          <div className="border-none text-sm cursor-pointer flex space-x-1">
            <PiBell size={18} />
            <span className="hidden lg:inline-block">Notification</span>
          </div>
        )}
        arrowIcon={false}
      >
        <Dropdown.Item>
          <NotiItem
            hasRead={true}
            title={"Your order is on the way"}
            content={
              "Your order is still in transit and expected to be delivered within 1-2 days. Please disregard this notification if you have already received your package!"
            }
            time={"2:02 3/9/2024"}
          />
        </Dropdown.Item>
        <Dropdown.Item>
          <NotiItem
            hasRead={false}
            title={"Your order is on the way"}
            content={
              "Your order is still in transit and expected to be delivered within 1-2 days. Please disregard this notification if you have already received your package!"
            }
            time={"2:02 3/9/2024"}
          />
        </Dropdown.Item>
        <Dropdown.Item>
          <NotiItem
            hasRead={true}
            title={"Your order is on the way"}
            content={
              "Your order is still in transit and expected to be delivered within 1-2 days. Please disregard this notification if you have already received your package!"
            }
            time={"2:02 3/9/2024"}
          />
        </Dropdown.Item>
        <Dropdown.Item>
          <NotiItem
            hasRead={true}
            title={"Your order is on the way"}
            content={
              "Your order is still in transit and expected to be delivered within 1-2 days. Please disregard this notification if you have already received your package!"
            }
            time={"2:02 3/9/2024"}
          />
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item
          className="mx-auto w-fit hover:underline text-center text-blue-700 text-xs font-medium"
          href="#"
        >
          See more &rarr;
        </Dropdown.Item>
      </Dropdown>
    </>
  );
}
