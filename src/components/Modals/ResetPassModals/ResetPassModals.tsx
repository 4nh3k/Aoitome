import authApi from '@/apis/auth.api';
import { ResetPasswordDTO } from '@/types/DTOs/Identity/ResetPasswordDTO.type';
import { useMutation } from '@tanstack/react-query';
import { Button, FloatingLabel, Modal, Spinner } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { MdEmail } from 'react-icons/md';
import { toast } from 'react-toastify';

interface ResetPassModalsProps {
  openModal: boolean;
  onCloseModal: () => void;
  email: string;
}

const ResetPassModals: React.FC<ResetPassModalsProps> = (props) => {
  const [newPassword, setNewPassword] = useState("");
  const [repeatNewPassword, setRepeatNewPassword] = useState("");
  const [resetPassInput, setResetPassInput] = useState<ResetPasswordDTO>({
    email: "",
    resetToken: "",
    newPassword: "",
  })

  useEffect(() => {
    console.log("Reset pass props", props);

    setResetPassInput(resetPassInput => ({
      ...resetPassInput,
      email: props.email
    }))
  }, [props.email]);

  const checkValidPassword = (password: string, password_name: string) => {
    if (password.length < 8) {
      toast.error(`${password_name} must be at least 8 characters`);
      return false;
    }
    if (!/[A-Z]/.test(password)) {
      toast.error(`${password_name} must have at least 1 uppercase letter`);
      return false;
    }
    if (!/[!@#$%^&*]/.test(password)) {
      toast.error(`${password_name} must have at least 1 special character`);
      return false;
    }

    return true;
  }

  const resetPassMutation = useMutation({
    mutationKey: ["resetPass", resetPassInput],
    mutationFn: async (body: { email: string }) => {
      try {
        console.log("Reset pass input", resetPassInput);
        const res = await authApi.resetPassword(resetPassInput);
        
        if (res.status === 200) {
          toast.success("Password reset successfully, please try login again");
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
    if (!resetPassInput.resetToken) {
      toast.error("Please enter reset token");
      return;
    }

    if (!resetPassInput.newPassword) {
      toast.error("Please enter new password");
      return;
    }

    if (!checkValidPassword(newPassword, "New password")){
      return;
    }

    if (resetPassInput.newPassword != repeatNewPassword){
      toast.error("Password and repeat password not matched");
      return;
    }

    await resetPassMutation.mutate(resetPassInput);
  }; 

  return (
    <Modal show={props.openModal} size="md" onClose={props.onCloseModal} popup>
    <Modal.Header />
    <Modal.Body>
      <div className="space-y-6">
        <div className="w-full text-black text-2xl font-bold text-center">
          Forgot pass
        </div>
        <FloatingLabel
          variant="outlined"
          label="Reset token"
          value={resetPassInput.resetToken}
          onChange={(e) => {
            setResetPassInput(resetPassInput => ({
              ...resetPassInput
              , resetToken: e.target.value
            }));
            console.log(resetPassInput);
          }}
        />
        <FloatingLabel
          variant="outlined"
          label="New password"
          type="password"
          value={newPassword}
          onChange={(e) => {
            const password = e.target.value;
            setNewPassword(password);
            setResetPassInput(resetPassInput => ({
              ...resetPassInput
              , newPassword: password
            }))
          }}
        />
        <FloatingLabel
          variant="outlined"
          type="password"
          label="Repeat password"
          value={repeatNewPassword}
          onChange={(e) => setRepeatNewPassword(e.target.value)}
        />
        <Button className="w-full" onClick={handleSubmit}>
          {!resetPassMutation.isPending ? "Confirm" : <Spinner />}
        </Button>
      </div>
    </Modal.Body>
    <Modal.Footer className="border-t mx-auto">
      <div className="w-full text-center">
        <Button onClick={props.onCloseModal}>Back</Button>
      </div>
    </Modal.Footer>
  </Modal>
  )
}

export default ResetPassModals