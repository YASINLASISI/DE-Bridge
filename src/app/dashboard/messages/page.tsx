'use client';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Send, Paperclip, Phone, Video } from 'lucide-react';
import { mockMessages, chatWithExpert } from '@/lib/mock-data';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';


const getInitials = (name: string) => {
    if(!name) return 'U'
    const names = name.split(' ');
    if (names.length > 1 && names[0] && names[1]) {
      return `${names[0][0]}${names[1][0]}`;
    }
    if (name) return name.substring(0, 2);
    return 'U';
}

export default function MessagesPage() {
    const [selectedChat, setSelectedChat] = useState(mockMessages[0]);

    return (
        <div className="h-[calc(100vh-10rem)] flex flex-col">
            <div className="flex-shrink-0 mb-6">
                <h1 className="text-3xl font-bold">Messages</h1>
                <p className="text-muted-foreground">Chat directly with your experts.</p>
            </div>
            <Card className="flex-grow grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 h-full overflow-hidden">
                {/* Conversation List */}
                <div className="col-span-1 border-r flex flex-col">
                    <div className="p-4 border-b">
                        <div className="relative">
                            <Input placeholder="Search messages..." className="pl-10" />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        </div>
                    </div>
                    <ScrollArea className="flex-grow">
                        {mockMessages.map((msg) => (
                            <div
                                key={msg.id}
                                className={cn(
                                    "flex items-center gap-4 p-4 cursor-pointer hover:bg-muted/50",
                                    selectedChat.id === msg.id && "bg-muted"
                                )}
                                onClick={() => setSelectedChat(msg)}
                            >
                                <Avatar className="h-12 w-12">
                                    <AvatarImage src={msg.expert.profilePhoto} />
                                    <AvatarFallback>{getInitials(msg.expert.name)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-grow overflow-hidden">
                                    <p className="font-semibold truncate">{msg.expert.name}</p>
                                    <p className="text-sm text-muted-foreground truncate">{msg.lastMessage}</p>
                                </div>
                                <div className="flex flex-col items-end text-xs text-muted-foreground">
                                    <p>{msg.timestamp}</p>
                                    {msg.unreadCount > 0 && (
                                        <Badge className="mt-1 bg-primary text-primary-foreground h-5 w-5 p-0 flex items-center justify-center">{msg.unreadCount}</Badge>
                                    )}
                                </div>
                            </div>
                        ))}
                    </ScrollArea>
                </div>

                {/* Active Conversation */}
                <div className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col h-full">
                    <div className="flex items-center justify-between p-4 border-b">
                        <div className="flex items-center gap-4">
                            <Avatar className="h-10 w-10">
                                <AvatarImage src={selectedChat.expert.profilePhoto} />
                                <AvatarFallback>{getInitials(selectedChat.expert.name)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-bold">{selectedChat.expert.name}</p>
                                <div className="flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                                    <p className="text-xs text-muted-foreground">Online</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon"><Phone className="h-5 w-5" /></Button>
                            <Button variant="ghost" size="icon"><Video className="h-5 w-5" /></Button>
                        </div>
                    </div>

                    <ScrollArea className="flex-grow p-6 bg-muted/20">
                        <div className="space-y-6">
                            {chatWithExpert.map((chat, index) => (
                                <div key={index} className={cn("flex items-end gap-3", chat.from === 'me' ? 'justify-end' : 'justify-start')}>
                                    {chat.from === 'expert' && (
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={selectedChat.expert.profilePhoto} />
                                            <AvatarFallback>{getInitials(selectedChat.expert.name)}</AvatarFallback>
                                        </Avatar>
                                    )}
                                    <div className={cn(
                                        "max-w-md rounded-lg px-4 py-3 text-sm",
                                        chat.from === 'me' ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-background rounded-bl-none border'
                                    )}>
                                        <p>{chat.text}</p>
                                        <p className={cn("text-xs mt-1", chat.from === 'me' ? 'text-primary-foreground/70' : 'text-muted-foreground' )}>{chat.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                    
                    <div className="p-4 border-t bg-background">
                        <div className="relative">
                            <Input placeholder="Type a message..." className="pr-24" />
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center">
                                <Button variant="ghost" size="icon"><Paperclip className="h-5 w-5" /></Button>
                                <Button size="icon" className='h-8 w-8'><Send className="h-4 w-4" /></Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}
