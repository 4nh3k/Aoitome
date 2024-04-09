import { Tabs } from "flowbite-react";
import Container from "../../../components/Container";
 import VoucherList from "../../../components/AdminComponents/VoucherList/VoucherList";

export function VoucherManagement() {
  return (
    <Container>
      <Tabs aria-label="Tabs with underline" style="underline">
        <Tabs.Item active title="All">
          <VoucherList />
        </Tabs.Item> 
        <Tabs.Item title="Ongoing">Disabled content</Tabs.Item>
        <Tabs.Item title="Upcoming">Disabled content</Tabs.Item>
        <Tabs.Item title="Ended">Disabled content</Tabs.Item>
      </Tabs>
    </Container>
  );
}
