import { Pagination, Tabs } from "flowbite-react";
import Container from "../../components/Container";
import OrderList from "../../components/OrderList";
import Coupon from "../../components/Coupon/Coupon";

export function UserCouponManagement() {
  return (
    <Container>
      <Tabs aria-label="Tabs with underline" style="underline">
        <Tabs.Item active title="Unused coupons">
          <Coupon />
          <Pagination className="ml-auto mr-auto text-center" currentPage={0} onPageChange={function (page: number): void {
            throw new Error("Function not implemented.");
          } } totalPages={3} />
        </Tabs.Item>
        <Tabs.Item title="Used coupons">Disabled content</Tabs.Item>
        <Tabs.Item title="Expired coupons">Disabled content</Tabs.Item>
      </Tabs>
    </Container>
  );
}
