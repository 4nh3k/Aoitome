import { Pagination, Tabs } from "flowbite-react";
import Container from "../../components/Container";
import NotiItem from "../../components/Notification/NotiItem";

export function NotificationPage() {
  return (
    <Container>
      <Tabs aria-label="Pills" style="pills">
        <Tabs.Item active title="All">
          <NotiItem
            size="lg"
            hasRead={true}
            title={"Your order is on the way"}
            content={
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat"
            }
            time={"2:02 3/9/2024"}
          />
          <NotiItem
            size="lg"
            hasRead={true}
            title={"Your order is on the way"}
            content={
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat"
            }
            time={"2:02 3/9/2024"}
          />
          <NotiItem
            size="lg"
            hasRead={false}
            title={"Your order is on the way"}
            content={
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat"
            }
            time={"2:02 3/9/2024"}
          />
          <NotiItem
            size="lg"
            hasRead={true}
            title={"Your order is on the way"}
            content={
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat"
            }
            time={"2:02 3/9/2024"}
          />
          <NotiItem
            size="lg"
            hasRead={true}
            title={"Your order is on the way"}
            content={
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat"
            }
            time={"2:02 3/9/2024"}
          />
          <NotiItem
            size="lg"
            hasRead={true}
            title={"Your order is on the way"}
            content={
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat"
            }
            time={"2:02 3/9/2024"}
          />
          <Pagination
            className="w-fit mx-auto"
            currentPage={1}
            onPageChange={function (page: number): void {
              throw new Error("Function not implemented.");
            }}
            totalPages={5}
          />
        </Tabs.Item>
        <Tabs.Item title="Promotion">
          <p className="text-sm text-gray-500 dark:text-gray-400">Content 2</p>
        </Tabs.Item>
        <Tabs.Item title="Order update">
          <p className="text-sm text-gray-500 dark:text-gray-400">Content 3</p>
        </Tabs.Item>
      </Tabs>
    </Container>
  );
}
