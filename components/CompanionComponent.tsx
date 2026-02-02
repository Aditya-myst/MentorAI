'use client';

import { useEffect, useRef, useState } from 'react'
import { cn, configureAssistant, getSubjectColor } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import Image from "next/image";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import soundwaves from '@/constants/soundwaves.json'
import { addToSessionHistory } from "@/lib/actions/companion.actions";

enum CallStatus {
    INACTIVE = 'INACTIVE',
    CONNECTING = 'CONNECTING',
    ACTIVE = 'ACTIVE',
    FINISHED = 'FINISHED',
}

const CompanionComponent = ({ companionId, subject, topic, name, userName, userImage, style, voice }: CompanionComponentProps) => {
    const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [messages, setMessages] = useState<SavedMessage[]>([]);

    const lottieRef = useRef<LottieRefCurrentProps>(null);

    useEffect(() => {
        if (lottieRef) {
            if (isSpeaking) {
                lottieRef.current?.play()
            } else {
                lottieRef.current?.stop()
            }
        }
    }, [isSpeaking, lottieRef])

    useEffect(() => {
        const onCallStart = () => setCallStatus(CallStatus.ACTIVE);

        const onCallEnd = () => {
            setCallStatus(CallStatus.FINISHED);
            addToSessionHistory(companionId)
        }

        const onMessage = (message: Message) => {
            if (message.type === 'transcript' && message.transcriptType === 'final') {
                const newMessage = { role: message.role, content: message.transcript }
                setMessages((prev) => [newMessage, ...prev])
            }
        }

        const onSpeechStart = () => setIsSpeaking(true);
        const onSpeechEnd = () => setIsSpeaking(false);

        const onError = (error: Error) => console.log('Error', error);

        vapi.on('call-start', onCallStart);
        vapi.on('call-end', onCallEnd);
        vapi.on('message', onMessage);
        vapi.on('error', onError);
        vapi.on('speech-start', onSpeechStart);
        vapi.on('speech-end', onSpeechEnd);

        return () => {
            vapi.off('call-start', onCallStart);
            vapi.off('call-end', onCallEnd);
            vapi.off('message', onMessage);
            vapi.off('error', onError);
            vapi.off('speech-start', onSpeechStart);
            vapi.off('speech-end', onSpeechEnd);
        }
    }, []);

    const toggleMicrophone = () => {
        const isMuted = vapi.isMuted();
        vapi.setMuted(!isMuted);
        setIsMuted(!isMuted)
    }

    const handleCall = async () => {
        setCallStatus(CallStatus.CONNECTING)

        const assistantOverrides = {
            variableValues: { subject, topic, style },
            clientMessages: ["transcript"],
            serverMessages: [],
        }

        // @ts-expect-error
        vapi.start(configureAssistant(voice, style), assistantOverrides)
    }

    const handleDisconnect = () => {
        setCallStatus(CallStatus.FINISHED)
        vapi.stop()
    }

    return (
        <section className="flex flex-col h-[70vh] gap-6">
            <section className="flex gap-8 max-lg:flex-col flex-1 min-h-0">
                <div className="glass-panel rounded-3xl p-8 flex-1 flex flex-col items-center justify-center gap-6 relative overflow-hidden transition-all duration-500">
                    <div className="relative z-10 flex flex-col items-center gap-6 w-full">
                        <div className="relative size-48 md:size-64 flex items-center justify-center rounded-3xl shadow-2xl transition-all duration-500" style={{ backgroundColor: getSubjectColor(subject) }}>
                            <div
                                className={
                                    cn(
                                        'absolute transition-opacity duration-1000 inset-0 flex items-center justify-center',
                                        callStatus === CallStatus.FINISHED || callStatus === CallStatus.INACTIVE ? 'opacity-100' : 'opacity-0',
                                        callStatus === CallStatus.CONNECTING && 'opacity-100 animate-pulse'
                                    )
                                }>
                                <Image src={`/icons/${subject}.svg`} alt={subject} width={100} height={100} className="drop-shadow-lg" />
                            </div>

                            <div className={cn('absolute inset-0 flex items-center justify-center transition-opacity duration-1000', callStatus === CallStatus.ACTIVE ? 'opacity-100' : 'opacity-0')}>
                                <Lottie
                                    lottieRef={lottieRef}
                                    animationData={soundwaves}
                                    autoplay={false}
                                    className="w-full h-full p-4"
                                />
                            </div>
                        </div>
                        <p className="font-bold text-3xl tracking-tight text-center">{name}</p>
                    </div>
                </div>

                <div className="glass-panel rounded-3xl p-8 w-full lg:w-[400px] flex flex-col gap-6 justify-center">
                    <div className="flex flex-col items-center gap-4 py-4">
                        <div className="relative size-32 rounded-full overflow-hidden border-4 border-white/10 shadow-xl">
                            <Image src={userImage} alt={userName} fill className="object-cover" />
                        </div>
                        <p className="font-bold text-2xl text-center">
                            {userName}
                        </p>
                    </div>

                    <div className="space-y-3 w-full mt-auto">
                        <button
                            className="flex items-center justify-center gap-3 w-full p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
                            onClick={toggleMicrophone}
                            disabled={callStatus !== CallStatus.ACTIVE}
                        >
                            <Image src={isMuted ? '/icons/mic-off.svg' : '/icons/mic-on.svg'} alt="mic" width={24} height={24} className="invert dark:invert-0" />
                            <span className="font-semibold text-lg max-sm:hidden">
                                {isMuted ? 'Turn on microphone' : 'Turn off microphone'}
                            </span>
                        </button>

                        <button
                            className={cn(
                                'w-full p-4 rounded-xl font-bold text-lg text-white shadow-lg transition-all transform active:scale-95',
                                callStatus === CallStatus.ACTIVE
                                    ? 'bg-red-500 hover:bg-red-600 shadow-red-500/20'
                                    : 'bg-primary hover:bg-primary/90 shadow-primary/20',
                                callStatus === CallStatus.CONNECTING && 'animate-pulse cursor-wait'
                            )}
                            onClick={callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall}
                        >
                            {callStatus === CallStatus.ACTIVE
                                ? "End Session"
                                : callStatus === CallStatus.CONNECTING
                                    ? 'Connecting...'
                                    : 'Start Session'
                            }
                        </button>
                    </div>
                </div>
            </section>

            <section className="transcript">
                <div className="transcript-message no-scrollbar">
                    {messages.map((message, index) => {
                        if (message.role === 'assistant') {
                            return (
                                <p key={index} className="max-sm:text-sm">
                                    {
                                        name
                                            .split(' ')[0]
                                            .replace(/[.,]/g, '')
                                    }: {message.content}
                                </p>
                            )
                        } else {
                            return <p key={index} className="text-primary max-sm:text-sm">
                                {userName}: {message.content}
                            </p>
                        }
                    })}
                </div>

                <div className="transcript-fade" />
            </section>
        </section>
    )
}

export default CompanionComponent