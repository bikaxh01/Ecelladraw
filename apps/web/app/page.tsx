"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function Main() {
  const [slug, setSlug] = useState("");
  const router = useRouter();

  const handleJoinRoom = () => {
    router.push(`room/${slug}`);
  };
  return (
    <div className=" w-screen h-screen bg-gray-900 flex items-center justify-center ">
      <div className=" border rounded-md flex flex-col  p-4 gap-5 h-48">
        <input
          type="text"
          className=" h-[2rem] w-[8rem] border text-white rounded-md p-2
        "
        onChange={(e)=>setSlug(e.target.value)}
        />
        <button
          onClick={handleJoinRoom}
          className=" w-[6rem] h-[2rem] text-white border rounded-md "
        >
          Join room
        </button>
      </div>
    </div>
  );
}

export default Main;
