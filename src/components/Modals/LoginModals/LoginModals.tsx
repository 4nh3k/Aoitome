import { useMutation } from "@tanstack/react-query";
import {
  Button,
  Checkbox,
  FloatingLabel,
  Label,
  Modal,
  Spinner,
} from "flowbite-react";
import { useState } from "react";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import authApi from "../../../apis/auth.api";
import { useAppContext } from "../../../contexts/app.context";
import { setAccessTokenToLS } from "../../../utils/auth";
import { AuthResponse } from "@/types/Models/Identity/AuthResponse.type";
import { path } from "@/constants/path";

const ADMIN_ROLE = "Admin";
const CUSTOMER_ROLE = "Customer";

interface LoginModalsProps {
  openModal: boolean;
  onCloseModal: () => void;
  onSignUpClick: () => void;
  onForgotPassClick: () => void;
}

export function LoginModals({
  openModal,
  onCloseModal,
  onSignUpClick,
  onForgotPassClick,
}: LoginModalsProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setIsAuthenticated } = useAppContext();
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: async(body: { username: string; password: string }) =>{
      const result = await authApi.login(body);
      if (result.status === 400){
        throw new Error("Username or password is not exist or matched with any account");
      }
      return result.data;
    }
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Perform form validation here
    if (!username || !password) {
      toast.error("Please enter username and password");
      return;
    }

    // Proceed with login
    const data = {
      username: username,
      password: password,
    };
    loginMutation.mutate(data, {
      onSuccess: (data: AuthResponse) => {
        toast.success("Successfully login!");
        console.log("data", data);
        setAccessTokenToLS(data.token as string);
        setIsAuthenticated(true);
        onCloseModal();
        if (data.role === ADMIN_ROLE){
          navigate("../" + path.adminDashboard, {replace: true});
        }
        else navigate("/");
      },
      onError: (error: Error) => {
        toast.error(`Login failed!\n${error.message}`);
      },
    });
  };

  return (
    <Modal show={openModal} size="md" onClose={onCloseModal} popup>
      <form onSubmit={handleSubmit}>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <div className="w-full text-black text-2xl font-bold text-center">
              Sign in
            </div>
            <FloatingLabel
              variant="outlined"
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <FloatingLabel
              variant="outlined"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">Remember me</Label>
              </div>
              <button
                onClick={onForgotPassClick}
                type="button"
                className="text-sm text-cyan-700 hover:underline dark:text-cyan-500"
              >
                Forgot Password?
              </button>
            </div>
            <Button
              className="w-full"
              type="submit"
              disabled={loginMutation.isPending}
            >
              {!loginMutation.isPending ? "Sign in" : <Spinner />}
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
            <span className="text-black text-sm font-medium font-['Inter'] leading-[21px]">
              Not a member yet?{" "}
            </span>
            <button
              onClick={onSignUpClick}
              type="button"
              className="text-blue-700 text-sm font-medium hover:underline cursor-pointer"
            >
              Sign up
            </button>
          </div>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
