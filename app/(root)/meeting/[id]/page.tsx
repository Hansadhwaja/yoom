'use client'

import Loader from "@/components/Loader";
import MeetingRoom from "@/components/MeetingRoom";
import MeetingSetup from "@/components/MeetingSetup";
import { useGetCallById } from "@/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs"
import { StreamCall, StreamTheme, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useState } from "react";

const Meeting = ({ params: { id } }: { params: { id: string } }) => {
  const { user, isLoaded } = useUser();
  const client = useStreamVideoClient();
  const clientId=client?.streamClient.user?.id;
  const userId=user?.id;

  const [isSetUpComplete, setIsSetUpComplete] = useState(false);
  const { call, isCallLoading } = useGetCallById(id);
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${id}`
  if (!isLoaded || isCallLoading) return <Loader />;

  return (
    <main className="h-screen w-full">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetUpComplete ?
            (
              <MeetingSetup setIsSetUpComplete={setIsSetUpComplete} />
            ) : (
              <MeetingRoom meetingLink={meetingLink} owner={clientId === userId} />
            )}
        </StreamTheme>
      </StreamCall>
    </main>
  )
}

export default Meeting