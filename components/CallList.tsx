//@ts-nocheck

'use client'

import { useGetCalls } from '@/hooks/useGetCalls'
import { Call, CallRecording } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import MeetingCard from './MeetingCard';
import Loader from './Loader';
import { useToast } from './ui/use-toast';


const CallList = ({ type }: { type: 'ended' | 'upcoming' | 'recordings' }) => {
    const { endedCalls, upcomingCalls, callRecordings, isLoading } = useGetCalls();
    const router = useRouter();
    const [recordings, setRecordings] = useState<CallRecording[]>([]);
    const { toast } = useToast();
    const getCalls = () => {
        switch (type) {
            case 'ended':
                return endedCalls;
            case 'upcoming':
                return upcomingCalls;
            case 'recordings':
                return recordings;
            default:
                return [];
        }
    }

    const getNoCallsMessage = () => {
        switch (type) {
            case 'ended':
                return 'No Previous Meeting';
            case 'upcoming':
                return 'No Upcoming Meeting';
            case 'recordings':
                return 'No Recordings';
            default:
                return '';
        }
    }

    const getImage = () => {
        switch (type) {
            case 'ended':
                return '/icons/previous.svg';
            case 'upcoming':
                return '/icons/upcoming.svg';
            case 'recordings':
                return '/icons/recordings.svg';
            default:
                return '';
        }
    }

    useEffect(() => {
        const fetchRecordings = async () => {
            try {
                const callData = await Promise.all(callRecordings.map(meeting => meeting.queryRecordings()));
                const recordings = callData
                    .filter(call => call.recordings.length > 0)
                    .flatMap(call => call.recordings)


                setRecordings(recordings);
            } catch (error) {
                toast({ title: 'Try Again Later' })
            }
        }
        if (type === 'recordings') fetchRecordings();
    }, [type, callRecordings])

    const calls = getCalls();
    const image = getImage();

    const noCallsMessage = getNoCallsMessage();

    if (isLoading) return <Loader />

    return (
        <div className='grid grid-cols-1 gap-5 xl:grid-cols-2'>
            {calls && calls.length > 0 ? calls.map((meeting: Call | CallRecording) => (
                <MeetingCard
                    key={meeting.id}
                    icon={image}
                    title={(meeting as Call).state?.custom?.description?.substring(0, 26) || meeting?.filename?.substring(0.20) || 'Personal Room'}
                    date={meeting.state?.startsAt.toLocaleString() || meeting.start_time.toLocaleString()}
                    isPreviousMeeting={type === 'ended'}
                    buttonIcon1={type === 'recordings' ? '/icons/play.svg' : undefined}
                    buttonText={type === 'recordings' ? 'Play' : 'Start'}
                    handleClick={type === 'recordings' ? () => router.push(`${meeting.url}`) : () => router.push(`/meeting/${meeting.id}`)}
                    link={type === 'recordings' ? meeting.url : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meeting.id}`}
                />
            )) : (
                <h1>{noCallsMessage}</h1>
            )}
        </div>
    )
}

export default CallList