import authApi from "@/apis/auth.api";
import { RegisterDTO } from "@/types/Auths/RegisterDto.type";
import { useMutation } from "@tanstack/react-query";
import { Button, FloatingLabel, Modal } from "flowbite-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { SendOtpInput } from "./SendOtp";

interface RegisterModalsProps {
  openModal: boolean;
  onCloseModal: () => void;
  onSignInClick: () => void;
}

export function RegisterModals({
  openModal,
  onCloseModal,
  onSignInClick,
}: RegisterModalsProps) {
  const [registerDto, setRegisterDto] = useState<RegisterDTO>({
    email: "",
    name: "",
    phoneNumber: "",
    password: "",
    OTP: "",
  });

  const [repeatPassword, setRepeatPassword] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterDto({ ...registerDto, [e.target.name]: e.target.value });
  };

  const handleRegister = () => {
    if (!registerDto.email) {
      toast.error("Email is required");
      return;
    }
    if (!registerDto.name) {
      toast.error("Name is required");
      return;
    }
    if (!registerDto.phoneNumber) {
      toast.error("Phone number is required");
      return;
    }
    if (!registerDto.password) {
      toast.error("Password is required");
      return;
    }
    if (!registerDto.OTP) {
      toast.error("OTP is required");
      return;
    }
    if (registerDto.password !== repeatPassword) {
      toast.error("Passwords do not match");
      return;
    }
    registerMutation.mutate();
    return;
  };

  const sendOtpMutation = useMutation({
    mutationFn: async () => {
      const res = await authApi.getOTPs({ email: registerDto.email });
      if (res.status === 200) {
        toast.success("We have sent an OTP to your email. Please check it.");
      }
    },
  });

  const registerMutation = useMutation({
    mutationFn: async () => {
      const res = await authApi.register(registerDto);
      if (res.status === 200) {
        toast.success("Register successfully");
      }
    },
  });

  const handleSendOtp = () => {
    if (!registerDto.email) {
      toast.error("Email is required");
      return false;
    }
    sendOtpMutation.mutate();
    return true;
  };

  return (
    <Modal show={openModal} size="md" onClose={onCloseModal} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-5">
          <div className="w-full text-black text-2xl font-bold text-center">
            Sign up
          </div>
          <FloatingLabel
            variant="outlined"
            value={registerDto.email}
            name="email"
            onChange={handleInputChange}
            label="Email"
          />
          <FloatingLabel
            variant="outlined"
            value={registerDto.name}
            name="name"
            onChange={handleInputChange}
            label="Name"
          />
          <FloatingLabel
            variant="outlined"
            value={registerDto.phoneNumber}
            name="phoneNumber"
            onChange={handleInputChange}
            label="Phone number"
          />
          <FloatingLabel
            variant="outlined"
            value={registerDto.password}
            name="password"
            onChange={handleInputChange}
            label="Password"
          />
          <FloatingLabel
            variant="outlined"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            label="Repeat Password"
          />
          <SendOtpInput
            variant="outlined"
            label="OTP"
            name="OTP"
            minLength={6}
            maxLength={6}
            value={registerDto.OTP}
            onChange={handleInputChange}
            sendOtp={handleSendOtp}
          />
          <Button className="w-full" onClick={handleRegister}>
            Sign up
          </Button>
        </div>
      </Modal.Body>
      <Modal.Footer className="border-t">
        <div className="w-full text-center">
          <span className="text-black text-sm font-medium">
            Already have an account?{" "}
          </span>
          <button
            onClick={onSignInClick}
            className="text-primary text-sm font-medium cursor-pointer hover:underline"
          >
            Sign in
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
