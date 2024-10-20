import authApi from "@/apis/auth.api";
import { useMutation } from "@tanstack/react-query";
import { Button, FloatingLabel, Modal, Spinner } from "flowbite-react";
import { useState } from "react";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

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
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

  const registerMutation = useMutation({
    mutationKey: ["register"],
    mutationFn: async (data: any) => {
      const res = await authApi.register(data);
      if (res.status === 200) {
        toast.success("Register successfully");
        setRegisterData({
          username: "",
          email: "",
          password: "",
          repeatPassword: "",
        });
        onSignInClick();
      } else {
        toast.error("Register failed");
      }
      return res.data;
    },
  });
  const handleSubmit = async () => {
    if (registerData.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    if (!/[A-Z]/.test(registerData.password)) {
      toast.error("Password must have at least 1 uppercase letter");
      return;
    }
    if (!/[!@#$%^&*]/.test(registerData.password)) {
      toast.error("Password must have at least 1 special character");
      return;
    }
    if (registerData.username.length < 6) {
      toast.error("Username must be at least 6 characters");
      return;
    }
    // check email
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(registerData.email)) {
      toast.error("Invalid email");
      return;
    }
    if (registerData.password !== registerData.repeatPassword) {
      toast.error("Password does not match");
      return;
    }
    registerMutation.mutate(registerData);
  };

  return (
    <Modal show={openModal} size="md" onClose={onCloseModal} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6">
          <div className="w-full text-black text-2xl font-bold text-center">
            Sign up
          </div>
          <FloatingLabel
            variant="outlined"
            value={registerData.username}
            label="Username"
            name="username"
            onChange={handleInputChange}
          />
          <FloatingLabel
            variant="outlined"
            value={registerData.email}
            label="Email"
            name="email"
            onChange={handleInputChange}
          />
          <FloatingLabel
            variant="outlined"
            value={registerData.password}
            label="Password"
            name="password"
            type="password"
            onChange={handleInputChange}
          />
          <FloatingLabel
            variant="outlined"
            value={registerData.repeatPassword}
            label="Repeat Password"
            name="repeatPassword"
            type="password"
            onChange={handleInputChange}
          />

          <Button className="w-full" onClick={handleSubmit}>
            {!registerMutation.isPending ? "Sign up" : <Spinner />}
          </Button>
          <div className="text-gray-600 text-sm font-medium w-full text-center">
            or use a social network
          </div>
          <div className="flex justify-center gap-4">
            <button className="w-9 h-9">
              <FaLinkedin className="text-blue-700" size={36} />
            </button>
            <button>
              <FcGoogle size={36} />
            </button>
            <button className="w-9 h-9">
              <FaFacebook className="text-blue-600" size={36} />
            </button>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="border-t">
        <div className="w-full text-center">
          <span className="text-black text-sm font-medium">
            Already have an account?{" "}
          </span>
          <button
            onClick={onSignInClick}
            className="text-blue-700 text-sm font-medium cursor-pointer hover:underline"
          >
            Sign in
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
