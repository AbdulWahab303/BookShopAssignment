import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/user";


const Login = () => {
  const router = useRouter();
  const loginDetails = useRef({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const {login}=useUser();
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    loginDetails.current[name] = value;
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = loginDetails.current;

    let isValid = true;
    const newErrors = {};
    if (!email) {
      isValid = false;
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      isValid = false;
      newErrors.email = "Invalid email format.";
    }

    if (!password) {
      isValid = false;
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);

    if (!isValid) return;

    try {
      const result=await login(email,password);
      console.log("SHOWING RESULTS HERE ",result);
      

      if (!result) {
        setErrors({ email: "", password: "Incorrect email or password." });
      } else if (result) {
        router.push("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <div className="min-h-screen bg-blue-200 flex flex-col items-center justify-center">
        <div className="w-full bg-gradient-to-r from-blue-200 via-blue-700 to-blue-200 pb-5 text-center mb-10 shadow-lg rounded-lg">
          <div className="flex flex-col items-center justify-center space-y-4">
            <img
              src="/logo.svg"
              alt="Meal Mover Logo"
              className="h-64 -mb-20 transform transition-transform hover:scale-105"
            />
            <p className="mt-2 text-lg sm:text-xl text-gray-100">
              <span className="font-semibold">
                Your Favorite Book, Delivered Fast!
              </span>
            </p>
            <p className="mt-2 text-gray-50 text-sm sm:text-base max-w-lg">
              Explore 100+ Books and enjoy lightning-fast delivery,
              tailored just for you.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 px-6 mb-10">
          <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center text-center transform transition-transform hover:scale-105">
            <div className="text-yellow-500 text-3xl mb-4">📒</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Fast Delivery
            </h3>
            <p className="text-sm text-gray-600">
              Get your Book delivered fast right to your doorstep.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center text-center transform transition-transform hover:scale-105">
            <div className="text-yellow-500 text-3xl mb-4">📚</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              100+ Books
            </h3>
            <p className="text-sm text-gray-600">
              Choose from a wide variety of your favorite Authors.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center text-center transform transition-transform hover:scale-105">
            <div className="text-yellow-500 text-3xl mb-4">🌟</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Exclusive Offers
            </h3>
            <p className="text-sm text-gray-600">
              Enjoy discounts and deals exclusive to Bookish users.
            </p>
          </div>
        </div>

        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105 duration-300 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
            Login
          </h2>
          <form>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-600 font-medium mb-1"
              >
                Email
              </label>
              <input
                name="email"
                type="email"
                id="email"
                placeholder="Enter your email"
                className={`w-full px-3 py-2 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring ${
                  errors.email ? "focus:ring-red-500" : "focus:ring-yellow-400"
                }`}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-600 font-medium mb-1"
              >
                Password
              </label>
              <input
                name="password"
                type="password"
                id="password"
                placeholder="Enter your password"
                className={`w-full px-3 py-2 border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring ${
                  errors.password
                    ? "focus:ring-red-500"
                    : "focus:ring-yellow-400"
                }`}
                onChange={handleChange}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            <button
              onClick={handleSubmit}
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md focus:outline-none focus:ring focus:ring-yellow-300"
            >
              Login
            </button>
          </form>

          <p className="mt-4 text-center text-gray-600">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-500 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
