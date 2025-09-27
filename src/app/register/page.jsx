"use client";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

const defaultData = {
  Firstname: "",
  Lastname: "",
  Email: "",
  PhoneNumber: "",
  Password: "",
};

export default function Register() {
  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onValueChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onRegister = async (e) => {
    e.preventDefault();

    if (
      !data.Firstname ||
      !data.Lastname ||
      !data.Email ||
      !data.PhoneNumber ||
      !data.Password
    ) {
      alert("Please fill all mandatory fields");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("/api/users/register", data);
      setData(defaultData);

      if (response.status >= 200 && response.status < 300) {
        router.replace("/signIn");
      }
    } catch (error) {
      console.log(error);
      alert("Error while creating account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fbfaf8] relative px-6 pt-28">
      {/* Register Card */}
      <div className="bg-[#F6E6CB] shadow-xl rounded-2xl w-full max-w-md px-10 py-6 z-10">
        <h1 className="text-2xl font-bold text-center text-[#A0937D] mb-4">
          Create Account
        </h1>

        <form onSubmit={onRegister} className="space-y-3">
          {/* First name */}
          <div>
            <label className="block text-sm font-semibold text-[#A0937D]">
              First Name
            </label>
            <input
              type="text"
              name="Firstname"
              placeholder="Enter first name"
              value={data.Firstname}
              onChange={onValueChange}
              className="w-full bg-white border border-[#E3CDC1] rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#A0937D]"
            />
          </div>

          {/* Last name */}
          <div>
            <label className="block text-sm font-semibold text-[#A0937D]">
              Last Name
            </label>
            <input
              type="text"
              name="Lastname"
              placeholder="Enter last name"
              value={data.Lastname}
              onChange={onValueChange}
              className="w-full bg-white border border-[#E3CDC1] rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#A0937D]"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-[#A0937D]">
              Email
            </label>
            <input
              type="email"
              name="Email"
              placeholder="Enter email"
              value={data.Email}
              onChange={onValueChange}
              className="w-full bg-white border border-[#E3CDC1] rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#A0937D]"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-semibold text-[#A0937D]">
              Phone Number
            </label>
            <input
              type="text"
              name="PhoneNumber"
              placeholder="Enter phone number"
              value={data.PhoneNumber}
              onChange={onValueChange}
              className="w-full bg-white border border-[#E3CDC1] rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#A0937D]"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-[#A0937D]">
              Password
            </label>
            <input
              type="password"
              name="Password"
              placeholder="Enter password"
              value={data.Password}
              onChange={onValueChange}
              className="w-full bg-white border border-[#E3CDC1] rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#A0937D]"
            />
          </div>

          {/* Button */}
          <button
            className={`w-full py-2 rounded-lg text-white font-semibold transition-all duration-200 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#A0937D] hover:bg-[#8a7b67]"
            }`}
            type="submit"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        {/* Sign in link */}
        <p className="mt-4 text-center text-sm text-[#A0937D]">
          Already have an account?{" "}
          <Link href="/signIn" className="font-semibold hover:text-[#8a7b67]">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
