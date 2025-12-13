'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Mic, Video, Volume2, MicOff, VideoOff, Settings } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export default function WaitingRoomPage() {
    const [isMuted, setIsMuted] = useState(false);
    const [isCameraOff, setIsCameraOff] = useState(false);
    const [micLevel, setMicLevel] = useState(0);

    useEffect(() => {
        let audioContext: AudioContext;
        let analyser: AnalyserNode;
        let microphone: MediaStreamAudioSourceNode;
        let javascriptNode: ScriptProcessorNode;

        const setupAudioNodes = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                audioContext = new (window.AudioContext || window.webkitAudioContext)();
                analyser = audioContext.createAnalyser();
                microphone = audioContext.createMediaStreamSource(stream);
                javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);

                analyser.smoothingTimeConstant = 0.8;
                analyser.fftSize = 1024;

                microphone.connect(analyser);
                analyser.connect(javascriptNode);
                javascriptNode.connect(audioContext.destination);

                javascriptNode.onaudioprocess = () => {
                    if (isMuted) {
                        setMicLevel(0);
                        return;
                    }
                    const array = new Uint8Array(analyser.frequencyBinCount);
                    analyser.getByteFrequencyData(array);
                    let values = 0;
                    const length = array.length;
                    for (let i = 0; i < length; i++) {
                        values += (array[i]);
                    }
                    const average = values / length;
                    setMicLevel(average);
                }
            } catch (err) {
                console.error('Error accessing microphone:', err);
            }
        };

        setupAudioNodes();

        return () => {
            if (javascriptNode) javascriptNode.disconnect();
            if (analyser) analyser.disconnect();
            if (microphone) microphone.disconnect();
        };
    }, [isMuted]);

    return (
        <div className="flex flex-col items-center justify-center h-screen w-full bg-gray-900 text-white p-4">
            <Card className="w-full max-w-4xl bg-gray-800 border-gray-700 shadow-2xl">
                <div className="grid md:grid-cols-2 gap-8 p-8">
                    {/* Video Preview */}
                    <div className="relative aspect-video bg-black rounded-lg flex items-center justify-center overflow-hidden">
                        {isCameraOff ? (
                            <div className='text-center'>
                                <VideoOff className="h-16 w-16 text-gray-500" />
                                <p className='mt-2 text-muted-foreground'>Your camera is off</p>
                            </div>
                        ) : (
                             <div className="h-full w-full bg-gray-700 flex items-center justify-center font-bold text-lg">Your Video</div>
                        )}
                        <div className="absolute bottom-4 left-4 flex gap-2">
                             <Button
                                size="icon"
                                onClick={() => setIsMuted(!isMuted)}
                                className={cn("rounded-full h-12 w-12", isMuted ? "bg-red-600" : "bg-gray-600/50 hover:bg-gray-500/50 backdrop-blur-sm")}
                            >
                                {isMuted ? <MicOff /> : <Mic />}
                            </Button>
                            <Button
                                size="icon"
                                onClick={() => setIsCameraOff(!isCameraOff)}
                                className={cn("rounded-full h-12 w-12", isCameraOff ? "bg-red-600" : "bg-gray-600/50 hover:bg-gray-500/50 backdrop-blur-sm")}
                            >
                                {isCameraOff ? <VideoOff /> : <Video />}
                            </Button>
                        </div>
                    </div>

                    {/* Waiting Info */}
                    <div className="flex flex-col justify-center">
                        <h1 className="text-3xl font-bold mb-2">Waiting for the expert to join...</h1>
                        <p className="text-muted-foreground mb-6">Dr. Adebayo Okonkwo will be with you shortly.</p>
                        
                        <div className="space-y-4 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
                             <div className="flex items-center gap-3">
                                <Mic className={cn("h-6 w-6", isMuted ? 'text-red-500' : 'text-primary')}/>
                                <div className="flex-1">
                                    <p className="text-sm font-medium">Microphone {isMuted && '(Muted)'}</p>
                                    <Progress value={isMuted ? 0 : micLevel} className="h-2 mt-1" />
                                </div>
                            </div>
                             <div className="flex items-center gap-3">
                                <Video className={cn("h-6 w-6", isCameraOff ? 'text-red-500' : 'text-primary')}/>
                                <p className="text-sm font-medium">Camera {isCameraOff ? '(Off)' : '(On)'}</p>
                            </div>
                             <div className="flex items-center gap-3">
                                <Volume2 className="h-6 w-6 text-primary"/>
                                <p className="text-sm font-medium">Speakers</p>
                                <Button variant="outline" size="sm" className='ml-auto bg-transparent border-gray-500 hover:bg-gray-700 hover:text-white'>Test</Button>
                            </div>
                        </div>

                        <div className="mt-8 flex gap-4">
                            <Button variant="destructive" size="lg" className="w-full">
                                Leave Waiting Room
                            </Button>
                            <Button variant="secondary" size="lg" className="w-full bg-gray-700 hover:bg-gray-600">
                                <Settings className="mr-2 h-5 w-5" />
                                Device Settings
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}

// A simple polyfill for webkitAudioContext
if (typeof window !== 'undefined') {
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
}
