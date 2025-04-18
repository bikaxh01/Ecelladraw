"use client";
import axios from "axios";
import React, { FormEvent, useState } from "react";
import { primaryBackend } from "@repo/backend-common/index.ts";
import { useRouter } from "next/navigation";
function SignUpForm() {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:5000/`, {
        email,
        password,
      });
      router.push("/sign-in");
      alert("Created successfully");
    } catch (error) {
      alert("something went wrong");
    }
  };

  return (
    <div className=" border   rounded-md">
      <form
        className="flex flex-col gap-4 p-4 rounded-md"
        onSubmit={handleSignUp}
      >
        <div className=" flex flex-col">
          <label className=" text-sm">Email</label>
          <input
            className=" border rounded-md text-white p-2"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className=" flex flex-col">
          <label className=" text-sm">Password</label>
          <input
            className=" border rounded-md text-white p-2"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className=" flex flex-col">
          <label className=" text-sm">Confirm password</label>
          <input
            className=" border rounded-md text-white p-2"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button className=" border rounded-md">Sign-Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;
