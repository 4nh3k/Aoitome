import { useNavigate } from "react-router-dom";
import successIllustration from "../../assets/img/payment-success.svg"; // Make sure to add an appropriate illustration file in the assets directory

const PaymentSuccess = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 text-center">
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
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
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
