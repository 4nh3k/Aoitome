import Container from "../../../components/Container";
import CustomTable from "@/components/CustomTable";
import { DiscountInput } from "@/components/AdminComponents/Input/DiscountInput";
import { useQuery } from "@tanstack/react-query";
import productCouponApi from "@/apis/productCoupon.api";
import { useEffect, useRef, useState } from "react";
import { ProductCoupon } from "@/types/Coupon/ProductCoupon.type";
import CustomButton from "@/components/AdminComponents/CustomButton/CustomButton";
import Plus from "@/assets/icon/plus-outline.svg"
import SearchInput from "@/components/SearchInput/SearchInput";
import { Modal, Tabs, TabsRef } from "flowbite-react";
import AdminDropdown from "@/components/AdminComponents/Input/AdminDropdown";
import AdminInput from "@/components/AdminComponents/Input/AdminInput";
import DatepickerInput from "@/components/AdminComponents/Input/DatepickerInput";

export function VoucherManagement() {
  const headers = [
    {
      label: "Name",
      prop: "name",
      className: "text-gray-900 text-sm",
    },
    {
      label: "Discount Value",
      prop: "discountValue",
      className: "text-gray-900 text-sm",
    },
    {
      label: "Discount Unit",
      prop: "discountUnit",
      className: "text-gray-900 text-sm",
    },
    {
      label: "Valid From",
      prop: "validFrom",
      className: "text-gray-900 text-sm",
    },
    {
      label: "Valid To",
      prop: "validTo",
      className: "text-gray-900 text-sm",
    },
    {
      label: "Minimum Order Value",
      prop: "minimumOrderValue",
      className: "text-gray-900 text-sm",
    },
    {
      label: "Maximum Discount Value",
      prop: "maximumDiscountValue",
      className: "text-gray-900 text-sm",
    },
    {
      label: "Used Time",
      prop: "usedTime",
      className: "text-gray-900 text-sm",
    },
    {
      label: "Is Redeem Allowed",
      prop: "isRedeemAllowed",
      className: "text-gray-900 text-sm",
    },
    {
      label: "Product id",
      prop: "productId",
      className: "text-gray-900 text-sm",
    }
  ];

  const { data: productCouponData, isLoading: isCouponLoading } = useQuery({
    queryKey: ['product-coupons'],
    queryFn: () => {
      return productCouponApi.getAllProductCoupons();
    }
  });

  const [allCoupons, setAllCoupons] = useState<ProductCoupon[]>();

  const [couponsByTab, setCouponsByTab] = useState<ProductCoupon[]>();

  const [coupons, setCoupons] = useState<ProductCoupon[]>();

  useEffect(() => {
    if (isCouponLoading || !productCouponData) return;

    const data = productCouponData.data.result;
    setCoupons(data);
    setAllCoupons(data);

  }, [productCouponData, isCouponLoading]);

  const [searchTerm, setSearchTerm] = useState<string>('');

  const onSearchTermChange = (value: string) => {
    setSearchTerm(value);
  }

  const [searchAttribute, setSearchAttribute] = useState<string>('Product id');

  const onAttributeSearchChange = (type: string) => {
    console.log("Current search by type: " + type);
    setSearchAttribute(type);
  }

  const onSubmit = (value: string) => {
    const filteredCoupons = couponsByTab?.filter(coupon => {
      if (searchAttribute === "Product id") {
        return coupon.productId.toLowerCase().includes(searchTerm.toLowerCase());
      } else if (searchAttribute === "Discount unit") {
        return coupon.discountUnit.toLowerCase().includes(searchTerm.toLowerCase());
      }
      return false;
    });

    setCoupons(filteredCoupons);
  }

  const tabsRef = useRef<TabsRef>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [enableAddCoupon, setEnableAddCoupon] = useState<boolean>(false);
  const getCouponsByTab = (tab: number) => {
    setEnableAddCoupon(false);
    switch (tab) {
      case 0:
        setEnableAddCoupon(true);
        return allCoupons;
      case 1:
        return allCoupons?.filter(coupon => new Date(coupon.validFrom) <= new Date() && new Date(coupon.validTo) >= new Date());
      case 2:
        return allCoupons?.filter(coupon => new Date(coupon.validFrom) > new Date());
      case 3:
        return allCoupons?.filter(coupon => new Date(coupon.validTo) < new Date());
      default:
        return allCoupons;
    }
  };

  useEffect(() => {
    setCouponsByTab(getCouponsByTab(activeTab));
    setCoupons(getCouponsByTab(activeTab));
  }, [activeTab]);

  const [openAddModal, setOpenAddModal] = useState(false);
  const handleAddCoupon = (e) => {
    setOpenAddModal(true);
  }


  return (
    <Container>
      <Tabs aria-label="Tabs with underline" style="underline" ref={tabsRef} onActiveTabChange={(tab) => setActiveTab(tab)}>
        <Tabs.Item active title="All"> </Tabs.Item>
        <Tabs.Item title="Ongoing"> </Tabs.Item>
        <Tabs.Item title="Upcoming"> </Tabs.Item>
        <Tabs.Item title="Ended"> </Tabs.Item>
      </Tabs>
      <div className="flex flex-col justify-between gap-8">
        <div className="flex justify-between items-end w-full">
          <div className="flex w-1/2 space-x-2 items-center">
            <SearchInput
              className={
                "flex flex-col items-strech w-full flex-wrap justify-between"
              }
              placeholder={"Enter search input"}
              dropdownList={["Product id", "Discount unit"]}
              onChange={onSearchTermChange}
              onSubmit={onSubmit}
              onDropdownChange={onAttributeSearchChange}
            />
          </div>

          {enableAddCoupon && <CustomButton
            imgSrc={Plus}
            label={"Add coupon"} textColor={"white"} btnColor={"primary"} onClick={handleAddCoupon} />}
        </div>
        {!isCouponLoading && coupons && <CustomTable
          headers={headers}
          data={coupons?.map(coupon => {
            console.log(coupon);
            return {
              id: coupon.id,
              name: coupon.name,
              discountValue: coupon.discountValue,
              discountUnit: coupon.discountUnit,
              validFrom: new Date(coupon.validFrom).toLocaleDateString(),
              validTo: new Date(coupon.validTo).toLocaleDateString(),
              minimumOrderValue: coupon.minimumOrderValue,
              maximumDiscountValue: coupon.maximumDiscountValue,
              usedTime: coupon.usedTime,
              isRedeemAllowed: coupon.isRedeemAllowed ? 'Yes' : 'No',
              productId: coupon.productId
            }
          })}
        />}
      </div>

      <Modal
        size={'6xl'}
        dismissible
        show={openAddModal}
        onClose={() => setOpenAddModal(false)}
      >
        <Modal.Header>Add new product coupon</Modal.Header>
        <Modal.Body>
          <div className="flex flex-col pt-8 pb-8 px-6 justify-between items-start gap-10 rounded-2xl border-1 border-solid border-gray-300 bg-white w-full">
            <div className="flex w-full flex-wrap items-stretch justify-between gap-8">

              <AdminDropdown
                title="Select product"
                // items={categories !== undefined ? categories.map(c => ({ key: c.id, value: c.name })) : []}
                items={[]}
                name='catalogId'
              // onChange={onDropdownChange}
              />

              <AdminInput
                title={"Product id"}
                placeholder={"Enter product name"}
                // onChange={onInputChange}
                type={"text"}
                name={"productId"}
              // value={product?.name} 
              />
            </div>

            <div className="flex w-full flex-wrap items-stretch justify-between gap-8">
              <AdminInput
                title={"Disscount value"}
                placeholder={"Enter discount value"}
                // onChange={onInputChange}
                type={"number"}
                name={"discountValue"}
              // value={product?.name} 
              />

              <AdminInput
                title={"Discount unit"}
                placeholder={"Enter discount unit"}
                // onChange={onInputChange}
                type={"text"}
                name={"discountUnit"}
              // value={product?.name} 
              />
            </div>

            <div className="flex w-full flex-wrap items-stretch justify-between gap-8">
              <DatepickerInput
                // value={`${book?.publicationDay}-${book?.publicationMonth}-${book?.publicationYear}`} 
                // onChange={onPublicationDateChange} 
                title="Valid from"
              />

              <DatepickerInput
                // value={`${book?.publicationDay}-${book?.publicationMonth}-${book?.publicationYear}`} 
                // onChange={onPublicationDateChange} 
                title="Valid to"
              />
            </div>

            <div className="flex w-full flex-wrap items-stretch justify-between gap-8">
              <AdminInput
                title={"Minimum order value"}
                placeholder={"Enter minimum order value"}
                // onChange={onInputChange}
                type={"number"}
                name={"minimumOrderValue"}
              // value={product?.name} 
              />

              <AdminInput
                title={"Maximum order value"}
                placeholder={"Enter maximum order value"}
                // onChange={onInputChange}
                type={"text"}
                name={"maximumOrderValue"}
              // value={product?.name} 
              />
            </div>

          </div>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
