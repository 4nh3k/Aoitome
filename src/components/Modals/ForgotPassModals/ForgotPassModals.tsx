import authApi from "@/apis/auth.api";
import { useMutation } from "@tanstack/react-query";
import { Button, FloatingLabel, Modal, Spinner } from "flowbite-react";
import { useState } from "react";
import { toast } from "react-toastify";

interface ForgotPassModalsProps {
  openModal: boolean;
  onCloseModal: () => void;
  onTokenReceived: () => void;
  handleStoreEmail: (email: string) => void;
}

export function ForgotPassModals({
  openModal,
  onCloseModal,
  onTokenReceived,
  handleStoreEmail
}: ForgotPassModalsProps) {
  const [email, setEmail] = useState("");

  const forgotPassMutation = useMutation({
    mutationKey: ["forgotPass", email],
    mutationFn: async (body: { email: string }) => {
      try {
        const res = await authApi.getResetPassToken(email);
        
        if (res.status === 200) {
          toast.success("Email sent successfully");
          handleStoreEmail(email);
          onTokenReceived();
        } else {
          toast.error("Something went wrong, please try again later");
        }
      } catch (error: any) {
        // Accessing the response from the error object
        if (error.response) {
          const res = error.response;
          console.log(res);
          toast.error(`${res.data || "Please try again later"}`);
        } else {
          // Handle cases where no response was received (network errors)
          toast.error("Something went wrong, please try again later");
        }
      }
    },
  });

  const handleSubmit = async () => {
    // check if email is valid
    if (!email) {
      toast.error("Please enter email");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Invalid email");
      return;
    }
    console.log("email", email);
    await forgotPassMutation.mutate({ email });
  };

  return (
    <Modal show={openModal} size="md" onClose={onCloseModal} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6">
          <div className="w-full text-black text-2xl font-bold text-center">
            Forgot pass
          </div>
          <FloatingLabel
            variant="outlined"
            label="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <Button className="w-full" onClick={handleSubmit}>
            {!forgotPassMutation.isPending ? "Confirm" : <Spinner />}
          </Button>
        </div>
      </Modal.Body>
      {/* <Modal.Footer className="border-t">
        <div className="w-full text-center">
          <Button>Back</Button>
        </div>
      </Modal.Footer> */}
    </Modal>
  );
}
