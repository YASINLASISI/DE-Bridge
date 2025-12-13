'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  MessageSquare,
  Users,
  Settings,
  Bell,
  MoreVertical,
  UploadCloud,
  File as FileIcon,
  Download,
  Send,
  ScreenShare,
  Paperclip,
  Maximize,
  Pipette,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import Logo from '@/components/logo';
import { cn } from '@/lib/utils';
import { mockExperts } from '@/lib/mock-data';
import { ScrollArea } from '@/components/ui/scroll-area';

const expert = mockExperts[0];
const chatMessages = [
    { from: 'You', text: "Doctor, I've uploaded my lab results.", time: '25:10' },
    { from: 'Expert', text: "Thank you! Let me review them quickly.", time: '25:45' },
    { from: 'Expert', text: "I can see your cholesterol is slightly elevated...", time: '26:30' },
];
const sharedFiles = [
    { name: 'Lab_Results.pdf', uploadedBy: 'You' },
    { name: 'Prescription.pdf', uploadedBy: 'Expert' },
    { name: 'Treatment_Plan.pdf', uploadedBy: 'Expert' },
];
const liveNotes = [
    "Patient experiencing chest pain for 2 weeks.",
    "Blood pressure: 140/90 mmHg.",
    "Recommended: ECG test, reduce salt intake.",
    "Discussed family history of heart conditions.",
    "Prescribed Atorvastatin 20mg daily."
];


export default function ConsultationPage() {
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(true);
  const [elapsedTime, setElapsedTime] = useState(25 * 60 + 23); // 25:23 in seconds
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        setIsFullScreen(true);
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
            setIsFullScreen(false);
        }
    }
  };


  return (
    <div className="flex h-screen w-full flex-col bg-gray-900 text-white overflow-hidden">
      {/* Top Navbar */}
      <header className="absolute top-0 left-0 right-0 z-20 flex h-20 items-center justify-between bg-black/30 px-6 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <Logo className="text-white" />
          <div className='hidden md:block'>
            <h1 className="text-lg font-bold">Dr. Adebayo Okonkwo - Cardiology</h1>
            <div className="flex items-center gap-4 text-sm">
                 <div className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                    <span>Recording</span>
                </div>
                 <span>{formatTime(elapsedTime)} / 60:00</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className='flex items-center gap-2 text-sm font-medium text-emerald-400'>
             <span className="h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
             Excellent
          </div>
          <Button variant="ghost" size="icon"><Bell className="h-5 w-5" /></Button>
          <Avatar className="h-9 w-9">
            <AvatarImage src="https://picsum.photos/seed/user/100/100" />
            <AvatarFallback>You</AvatarFallback>
          </Avatar>
          <Button variant="destructive" className="font-bold hidden sm:flex">Leave Call</Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 pt-20 overflow-hidden">
        {/* Video Grid */}
        <div className={cn("relative flex flex-1 flex-col items-center justify-center p-4 transition-all duration-300", isSidePanelOpen && 'pr-0')}>
           {/* Expert Video */}
            <div className="relative w-full h-full bg-black rounded-lg overflow-hidden flex items-center justify-center">
                 <Image src={expert.profilePhoto} alt={expert.name} layout="fill" objectFit="cover" className="opacity-80" />
                 <div className="absolute inset-0 bg-black/30"></div>

                <div className="absolute bottom-4 left-4 text-white">
                    <div className='flex items-center gap-2'>
                        <span className="relative flex h-3 w-3">
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                        </span>
                        <p className="font-bold text-lg">{expert.name}</p>
                    </div>
                    <p className="text-sm">{expert.specialty}, {expert.workplace}</p>
                </div>
            </div>

            {/* Self View */}
            <div className="absolute bottom-8 right-8 h-32 w-48 md:h-40 md:w-64 bg-gray-800 rounded-lg overflow-hidden border-2 border-primary shadow-lg">
                <div className="h-full w-full bg-gray-700 flex items-center justify-center font-bold text-lg">You</div>
                <div className='absolute bottom-2 left-2 text-white text-sm font-medium'>Tunde A.</div>
            </div>
        </div>

        {/* Side Panel */}
        <aside className={cn(
            "flex flex-col bg-gray-950/80 backdrop-blur-md border-l border-gray-700 transition-all duration-300 ease-in-out",
            isSidePanelOpen ? "w-[350px]" : "w-0 overflow-hidden"
        )}>
           <Tabs defaultValue="chat" className="flex flex-col h-full">
                <div className="flex justify-between items-center p-2 border-b border-gray-700">
                     <TabsList className="grid w-full grid-cols-3 bg-transparent p-0">
                        <TabsTrigger value="chat" className='data-[state=active]:bg-gray-700 data-[state=active]:text-white'>Chat</TabsTrigger>
                        <TabsTrigger value="files" className='data-[state=active]:bg-gray-700 data-[state=active]:text-white'>Files</TabsTrigger>
                        <TabsTrigger value="notes" className='data-[state=active]:bg-gray-700 data-[state=active]:text-white'>Notes</TabsTrigger>
                    </TabsList>
                </div>
                 <TabsContent value="chat" className="flex flex-col flex-grow mt-0 overflow-hidden">
                    <ScrollArea className="flex-grow p-4">
                        <div className="space-y-4">
                        {chatMessages.map((msg, i) => (
                            <div key={i} className={cn("flex", msg.from === 'You' ? 'justify-end' : 'justify-start')}>
                                <div className={cn("rounded-lg px-3 py-2 max-w-xs", msg.from === 'You' ? 'bg-primary text-white' : 'bg-gray-700')}>
                                    <p className="text-sm">{msg.text}</p>
                                    <p className="text-xs opacity-70 text-right mt-1">{msg.time}</p>
                                </div>
                            </div>
                        ))}
                        </div>
                    </ScrollArea>
                    <div className="p-4 border-t border-gray-700">
                        <div className="relative">
                            <Input placeholder="Type a message..." className="bg-gray-700 border-gray-600 pr-10" />
                            <Button size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8">
                                <Send className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="files" className="flex-grow p-4 mt-0">
                    <div className="space-y-3">
                         {sharedFiles.map(file => (
                             <div key={file.name} className="flex items-center justify-between p-2 bg-gray-800 rounded-md">
                                 <div className='flex items-center gap-3'>
                                     <FileIcon className="h-5 w-5 text-primary" />
                                    <span className="text-sm font-medium">{file.name}</span>
                                 </div>
                                <Button variant="ghost" size="icon"><Download className="h-4 w-4"/></Button>
                            </div>
                         ))}
                    </div>
                    <Button variant="outline" className="w-full mt-4 bg-transparent border-gray-600 hover:bg-gray-700">
                        <UploadCloud className="mr-2 h-4 w-4" /> Upload File
                    </Button>
                </TabsContent>
                 <TabsContent value="notes" className="flex flex-col flex-grow mt-0 overflow-hidden">
                    <ScrollArea className="flex-grow p-4">
                        <h4 className="font-bold mb-2">AI Generated Notes:</h4>
                        <ul className="space-y-2 list-disc list-inside text-sm">
                            {liveNotes.map((note, i) => <li key={i}>{note}</li>)}
                        </ul>
                    </ScrollArea>
                    <div className="p-4 border-t border-gray-700">
                         <Button className="w-full">Download Notes</Button>
                    </div>
                </TabsContent>
            </Tabs>
        </aside>
      </main>

       {/* Bottom Control Bar */}
      <footer className="absolute bottom-0 left-0 right-0 z-20 flex h-24 items-center justify-center bg-black/20 backdrop-blur-sm">
        <div className="flex items-center gap-4">
            <Button
                variant={isMuted ? 'destructive' : 'secondary'}
                size="icon"
                className="w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 text-white"
                onClick={() => setIsMuted(!isMuted)}
            >
                {isMuted ? <MicOff className="h-7 w-7" /> : <Mic className="h-7 w-7" />}
            </Button>
            <Button
                variant={isCameraOff ? 'destructive' : 'secondary'}
                size="icon"
                className="w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 text-white"
                onClick={() => setIsCameraOff(!isCameraOff)}
            >
                {isCameraOff ? <VideoOff className="h-7 w-7" /> : <Video className="h-7 w-7" />}
            </Button>
             <Button variant="secondary" size="icon" className="w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 text-white hidden md:flex"><ScreenShare className="h-7 w-7" /></Button>
            <Button
                variant="secondary"
                size="icon"
                className="w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 text-white relative"
                onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}
            >
                <MessageSquare className="h-7 w-7" />
                 {chatMessages.length > 0 && <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">3</span>}
            </Button>
            <Button variant="secondary" size="icon" className="w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 text-white"><Settings className="h-7 w-7" /></Button>
            <Button variant="destructive" size="icon" className="w-16 h-16 rounded-full"><PhoneOff className="h-8 w-8" /></Button>
            <Button variant="secondary" size="icon" onClick={toggleFullScreen} className="w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 text-white hidden md:flex">
                {isFullScreen ? <Minimize2 className="h-7 w-7" /> : <Maximize2 className="h-7 w-7" />}
            </Button>
        </div>
      </footer>
    </div>
  );
}
