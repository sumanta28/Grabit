import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../lib/axiosInstance";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import GoogleIcon from "../assets/icons/GoogleIcon.png";
import FacebookIcon from "../assets/icons/FacebookIcon.png";

const validationSchema = yup.object({
  name: yup
    .string()
    .matches(/^[A-Za-z\s]+$/, "Name must only contain letters")
    .required("Name is required"),

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

  phone: yup.string().when([], {
    is: (_, context) => context?.role === "buyer",
    then: (schema) =>
      schema
        .matches(/^[6-9]\d{9}$/, "Enter a valid Indian phone number")
        .required("Phone number is required"),
  }),

  address: yup.string().when([], {
    is: (_, context) => context?.role === "buyer",
    then: (schema) =>
      schema.min(5, "Address must be at least 5 characters").required("Address is required"),
  }),

  shopName: yup.string().when([], {
    is: (_, context) => context?.role === "vendor",
    then: (schema) =>
      schema
        .matches(/^[A-Za-z0-9\s]+$/, "Shop name must be alphanumeric")
        .required("Shop name is required"),
  }),

  businessCity: yup.string().when([], {
    is: (_, context) => context?.role === "vendor",
    then: (schema) =>
      schema
        .matches(/^[A-Za-z\s]+$/, "Business city must only contain letters")
        .required("Business city is required"),
  }),

  gst: yup
    .string()
    .matches(
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
      "Enter a valid GST number"
    )
    .nullable(),
});

export default function RegisterPage() {
    const [role, setRole] = useState("buyer");
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
        context: { role },
        defaultValues: { role: "buyer" },
    });

    const registerMutation = useMutation({
        mutationFn: async (formData) => {
            const response = await axiosInstance.post("/auth/register", formData);
            return response.data;
        },
        onSuccess: () => {
            toast.success("Account created successfully");
            navigate("/");
        },
        onError: (error) => {
            alert(error.response?.data?.message || "Registration failed");
        },
    });

    const onSubmit = (data) => {
        let payload = {
            name: data.name,
            email: data.email,
            password: data.password,
            role: role,
        };

        if (role === "buyer") {
            payload.phone = data.phone;
            payload.address = data.address;
        } else if (role === "vendor") {
            payload.shopName = data.shopName;
            payload.businessCity = data.businessCity;
            payload.gst = data.gst;
        }

        registerMutation.mutate(payload);
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 p-4 md:p-12 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-4 -left-4 w-72 h-72 bg-gradient-to-r from-blue-300/20 to-purple-300/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-8 -right-8 w-96 h-96 bg-gradient-to-r from-indigo-300/20 to-pink-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>
            
            <div className="w-full max-w-[1100px] rounded-2xl shadow-2xl overflow-hidden relative z-10 flex min-h-[600px] max-h-[90vh]">

                {/* Left Side (Image with Text) */}
                <div
                    className="relative w-1/2 min-h-[600px] bg-left bg-cover bg-no-repeat hidden md:block"
                    style={{ backgroundImage: "url('/image/Right box.png')" }}
                >
                    {/* Gradient overlay for better visual appeal */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10"></div>
                </div>

                {/* Right Side (Form) */}
                <div className="w-full md:w-1/2 flex flex-col justify-start px-8 py-6 text-sm relative bg-white overflow-y-auto max-h-[600px]">
                    {/* Header with enhanced styling */}
                    <div className="text-center mb-4">
                        <h4 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-snug mb-2">
                            Looks like you're new here!
                        </h4>
                        <h2 className="text-gray-600 text-sm font-medium">Let's Go!</h2>
                        <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mt-2"></div>
                    </div>

                    {/* Role Toggle */}
                    <div className="flex justify-center gap-3 mb-4">
                        <button
                            type="button"
                            onClick={() => setRole("buyer")}
                            className={`px-5 py-2 rounded-lg border-2 text-xs font-medium transition-all duration-300 transform hover:scale-105 ${role === "buyer"
                                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white border-transparent shadow-lg"
                                : "bg-white border-gray-200 text-gray-700 hover:border-gray-300 hover:shadow-md"
                                }`}
                        >
                            Buyer
                        </button>
                        <button
                            type="button"
                            onClick={() => setRole("vendor")}
                            className={`px-5 py-2 rounded-lg border-2 text-xs font-medium transition-all duration-300 transform hover:scale-105 ${role === "vendor"
                                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white border-transparent shadow-lg"
                                : "bg-white border-gray-200 text-gray-700 hover:border-gray-300 hover:shadow-md"
                                }`}
                        >
                            Vendor
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                        <div className="group">
                            <input
                                placeholder="Name"
                                className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-xs transition-all duration-300 group-hover:border-gray-300 bg-gray-50/50 focus:bg-white placeholder-gray-400"
                                {...register("name")}
                            />
                            {errors.name?.message && (
                                <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                                    {errors.name?.message}
                                </p>
                            )}
                        </div>

                        <div className="group">
                            <input
                                placeholder="Email"
                                type="email"
                                className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-xs transition-all duration-300 group-hover:border-gray-300 bg-gray-50/50 focus:bg-white placeholder-gray-400"
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
                                className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-xs transition-all duration-300 group-hover:border-gray-300 bg-gray-50/50 focus:bg-white placeholder-gray-400"
                                {...register("password")}
                            />
                            {errors.password?.message && (
                                <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                                    {errors.password?.message}
                                </p>
                            )}
                        </div>

                        {/* Buyer Fields */}
                        {role === "buyer" && (
                            <>
                                <div className="group">
                                    <input
                                        placeholder="Phone Number"
                                        className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-xs transition-all duration-300 group-hover:border-gray-300 bg-gray-50/50 focus:bg-white placeholder-gray-400"
                                        {...register("phone")}
                                    />
                                    {errors.phone?.message && (
                                        <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                                            <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                                            {errors.phone?.message}
                                        </p>
                                    )}
                                </div>
                                <div className="group">
                                    <input
                                        placeholder="Shipping Address"
                                        className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-xs transition-all duration-300 group-hover:border-gray-300 bg-gray-50/50 focus:bg-white placeholder-gray-400"
                                        {...register("address")}
                                    />
                                    {errors.address?.message && (
                                        <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                                            <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                                            {errors.address?.message}
                                        </p>
                                    )}
                                </div>
                            </>
                        )}

                        {/* Vendor Fields */}
                        {role === "vendor" && (
                            <>
                                <div className="group">
                                    <input
                                        placeholder="Shop Name"
                                        className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-xs transition-all duration-300 group-hover:border-gray-300 bg-gray-50/50 focus:bg-white placeholder-gray-400"
                                        {...register("shopName")}
                                    />
                                    {errors.shopName?.message && (
                                        <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                                            <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                                            {errors.shopName?.message}
                                        </p>
                                    )}
                                </div>
                                <div className="group">
                                    <input
                                        placeholder="Business City"
                                        className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-xs transition-all duration-300 group-hover:border-gray-300 bg-gray-50/50 focus:bg-white placeholder-gray-400"
                                        {...register("businessCity")}
                                    />
                                    {errors.businessCity?.message && (
                                        <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                                            <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                                            {errors.businessCity?.message}
                                        </p>
                                    )}
                                </div>
                                <div className="group">
                                    <input
                                        placeholder="GST Number (optional)"
                                        className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-xs transition-all duration-300 group-hover:border-gray-300 bg-gray-50/50 focus:bg-white placeholder-gray-400"
                                        {...register("gst")}
                                    />
                                </div>
                            </>
                        )}

                        <button
                            type="submit"
                            disabled={registerMutation?.isLoading}
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2.5 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-xs font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden"
                        >
                            {/* Button shine effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                            <span className="relative z-10">
                                {registerMutation?.isLoading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Creating...
                                    </span>
                                ) : (
                                    "Register"
                                )}
                            </span>
                        </button>
                    </form>

                    {/* Enhanced Divider */}
                    <div className="flex items-center my-4">
                        <span className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></span>
                        <span className="px-3 text-gray-500 text-xs font-medium bg-white">Or</span>
                        <span className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></span>
                    </div>

                    {/* Enhanced Social Buttons */}
                    <div className="flex justify-center gap-2 mb-4">
                        <a
                            href="https://www.google.com"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-200 text-gray-700 rounded-lg hover:border-gray-300 hover:shadow-lg transition-all duration-300 text-xs font-medium transform hover:scale-105 hover:bg-gray-50"
                        >
                            <img src={GoogleIcon} alt="google" className="w-4 h-4" />
                            Google
                        </a>
                        <a
                            href="https://www.facebook.com"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-200 text-gray-700 rounded-lg hover:border-gray-300 hover:shadow-lg transition-all duration-300 text-xs font-medium transform hover:scale-105 hover:bg-gray-50"
                        >
                            <img src={FacebookIcon} alt="facebook" className="w-4 h-4" />
                            Facebook
                        </a>
                    </div>

                    {/* Enhanced Footer Links */}
                    <div className="text-center space-y-2">
                        <p className="text-xs text-gray-600">
                            Already have an account?{" "}
                            <a href="/login" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-300 hover:underline">
                                Login
                            </a>
                        </p>

                        <p className="text-xs text-gray-500 leading-relaxed">
                            By continuing, you agree to Grabit{" "}
                            <a href="#" className="text-orange-600 hover:text-orange-700 transition-colors duration-300 font-medium hover:underline">
                                Terms of Use
                            </a>{" "}
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