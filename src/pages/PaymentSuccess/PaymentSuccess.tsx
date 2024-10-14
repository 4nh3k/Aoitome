import { useNavigate } from "react-router-dom";
import successIllustration from "../../assets/img/payment-success.svg"; // Make sure to add an appropriate illustration file in the assets directory

const PaymentSuccess = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white shadow-sm p-8 text-center content-border">
      <img
        src={successIllustration}
        alt="Payment Success"
        className="w-32 mx-auto mb-4"
      />
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Payment Successful!
      </h2>
      <p className="text-gray-600 mb-6">
        Thank you for your payment. Your transaction was successful.
      </p>
      <button
        className="w-fit px-2 rounded-md py-2 font-semibold text-white bg-primary active:scale-95 transition duration-150 ease-in-out"
        onClick={() => {
          navigate("/");
        }}
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default PaymentSuccess;
