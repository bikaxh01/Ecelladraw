import React from "react";
import { getRoomId } from "../../../action/room";
import RoomComponent from "../../../components/roomComponent";

async function RoomPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;


  const room = await getRoomId(slug);

  if (!room) {
    return (
      <>
        <h1 className=" text-2xl">Room not found</h1>
      </>
    );
  }
  return (
    <div>
      <RoomComponent roomId={room.id} />
    </div>
  );
}

export default RoomPage;
