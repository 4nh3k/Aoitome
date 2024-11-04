import { orderingApi } from "@/apis/ordering.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dropdown } from "flowbite-react";
import { toast } from "react-toastify";

// Mapping status to Tailwind CSS classes
const colorClasses = {
  info: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  purple:
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  primary: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  success: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  failure: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  default: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
};

// Function to get the color status
const getColor = (status: number) => {
  switch (status) {
    case 1:
      return "info";
    case 2:
      return "purple";
    case 3:
      return "primary";
    case 4:
      return "success";
    case 5:
      return "failure";
    default:
      return "default";
  }
};
interface BadgeProps {
  orderId: number;
  orderStatusId: number;
  orderStatusName: string;
  page: number;
  allowEdit: boolean;
}
const Badge: React.FC<BadgeProps> = ({
  orderStatusId,
  orderStatusName,
  allowEdit = false,
  page,
  orderId,
}) => {
  const queryClient = useQueryClient();

  const colorKey = getColor(orderStatusId);
  const badgeClass = colorClasses[colorKey] || colorClasses.default;
  const updateStatusMutation = useMutation({
    mutationFn: (newStatus: number) =>
      orderingApi.updateOrderStatus(orderId, newStatus),
    onSuccess: () => {
      toast.success("Order status updated successfully!");
      // Optionally, you could call refetch or any other state update logic here
    },
    onError: () => {
      toast.error("Failed to update order status.");
    },
  });
  const handleUpdateStatus = (newStatus: number) => {
    updateStatusMutation.mutate(newStatus);
    queryClient.invalidateQueries({ queryKey: ["order", page - 1] });
    queryClient.invalidateQueries({ queryKey: ["order", userId, page - 1] });
  };
  return (
    <Dropdown
      label=""
      dismissOnClick={false}
      renderTrigger={() => (
        <span
          className={`text-xs font-medium px-2.5 py-0.5 rounded ${badgeClass}`}
        >
          {orderStatusName}
        </span>
      )}
    >
      {allowEdit && (
        <>
          <Dropdown.Item onClick={() => handleUpdateStatus(1)}>
            Submitted
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleUpdateStatus(2)}>
            Stock Confirmed
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleUpdateStatus(3)}>
            Paid
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleUpdateStatus(4)}>
            Shipped
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleUpdateStatus(5)}>
            Canceled
          </Dropdown.Item>
        </>
      )}
    </Dropdown>
  );
};

export default Badge;
