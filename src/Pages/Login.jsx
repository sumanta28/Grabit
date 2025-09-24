import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../lib/axiosInstance";
import { toast } from "sonner";
import GoogleIcon from "../assets/icons/GoogleIcon.png";
import FacebookIcon from "../assets/icons/FacebookIcon.png";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .matches(
      /^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/,
      "Password must be at least 8 characters and include at least one special symbol"
    )
    .required("Password is required"),
});

export default function LoginPage() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const loginMutation = useMutation({
    mutationFn: async (formData) => {
      const response = await axiosInstance.post("/auth/login", formData);
      return response.data; 
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      toast.success("Successfully logged in!");
      navigate("/")
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Login failed");
    },
  });

  const onSubmit = (data) => {
    loginMutation.mutate({
      email: data.email,
      password: data.password,
    });
  };

  return (
    
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 p-4 md:p-12 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-gradient-to-r from-blue-300/20 to-purple-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-8 -right-8 w-96 h-96 bg-gradient-to-r from-indigo-300/20 to-pink-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="w-full max-w-[1100px] rounded-2xl shadow-2xl overflow-hidden relative z-10 flex min-h-[600px]">

        {/* Left Side (Image with Text) */}
        <div
          className="relative w-1/2 min-h-[600px] bg-left bg-cover bg-no-repeat hidden md:block"
          style={{ backgroundImage: "url('/image/Right box.png')" }}
        >
          {/* Gradient overlay for better visual appeal */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10"></div>
        </div>

        {/* Right Side (Form) */}
        <div className="w-full md:w-1/2 flex flex-col justify-start px-8 py-8 text-sm relative bg-white">
            {/* Header with enhanced styling */}
            <div className="text-center mb-6">
              <h4 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-snug mb-3">
                Welcome Back
              </h4>
              <h2 className="text-gray-600 text-base font-medium">
                Please login to your account
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mt-3"></div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="group">
                <input
                  placeholder="Email"
                  type="email"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm transition-all duration-300 group-hover:border-gray-300 bg-gray-50/50 focus:bg-white placeholder-gray-400"
                  {...register("email")}
                />
                {errors.email?.message && (
                  <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                    {errors.email?.message}
                  </p>
                )}
              </div>

              <div className="group">
                <input
                  placeholder="Password"
                  type="password"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm transition-all duration-300 group-hover:border-gray-300 bg-gray-50/50 focus:bg-white placeholder-gray-400"
                  {...register("password")}
                />
                {errors.password?.message && (
                  <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                    {errors.password?.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loginMutation?.isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-sm font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden"
              >
                {/* Button shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <span className="relative z-10">
                  {loginMutation?.isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Logging in...
                    </span>
                  ) : (
                    "Login"
                  )}
                </span>
              </button>
            </form>

            {/* Enhanced Divider */}
            <div className="flex items-center my-6">
              <span className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></span>
              <span className="px-4 text-gray-500 font-medium bg-white">Or</span>
              <span className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></span>
            </div>

            {/* Enhanced Social Buttons */}
            <div className="flex justify-center gap-3">
              <Link
                to="https://www.google.com"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-xl hover:border-gray-300 hover:shadow-lg transition-all duration-300 text-sm font-medium transform hover:scale-105 hover:bg-gray-50"
              >
                <img src={GoogleIcon} alt="google" className="w-5 h-5" />
                Google
              </Link>
              <Link
                to="https://www.facebook.com"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-xl hover:border-gray-300 hover:shadow-lg transition-all duration-300 text-sm font-medium transform hover:scale-105 hover:bg-gray-50"
              >
                <img src={FacebookIcon} alt="facebook" className="w-5 h-5" />
                Facebook
              </Link>
            </div>

            {/* Enhanced Footer Links */}
            <div className="text-center mt-6 space-y-3">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link to="/signup" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-300 hover:underline">
                  Signup
                </Link>
              </p>

              <p className="text-xs text-gray-500 leading-relaxed">
                By continuing, you agree to Grabit{" "}
                <Link to="#" className="text-orange-600 hover:text-orange-700 transition-colors duration-300 font-medium hover:underline">
                  Terms of Use
                </Link>{" "}
                and{" "}
                <a href="#" className="text-orange-600 hover:text-orange-700 transition-colors duration-300 font-medium hover:underline">
                  Privacy Policy
                </a>
              </p>
            </div>
            </div>
          </div>

    </main>
  );
}