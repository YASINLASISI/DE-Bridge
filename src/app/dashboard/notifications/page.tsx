'use client';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockNotifications } from '@/lib/mock-data';
import { CheckCheck, Calendar, MessageSquare, Star, File, Wallet } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const getIcon = (icon: string) => {
    switch(icon) {
        case 'calendar': return <Calendar className="h-6 w-6" />;
        case 'message': return <MessageSquare className="h-6 w-6" />;
        case 'star': return <Star className="h-6 w-6" />;
        case 'file': return <File className="h-6 w-6" />;
        case 'wallet': return <Wallet className="h-6 w-6" />;
        default: return <Bell className="h-6 w-6" />;
    }
}

export default function NotificationsPage() {
    const [notifications, setNotifications] = useState(mockNotifications);

    const markAsRead = (id: string) => {
        setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    const today = notifications.slice(0, 2);
    const yesterday = notifications.slice(2, 3);
    const thisWeek = notifications.slice(3);


    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                 <div>
                    <h1 className="text-3xl font-bold">Notifications</h1>
                    <p className="text-muted-foreground">Manage your account notifications and updates.</p>
                </div>
                <Button onClick={markAllAsRead} variant="outline">
                    <CheckCheck className="mr-2 h-4 w-4" />
                    Mark all as read
                </Button>
            </div>

            <Card>
                <CardContent className="p-0">
                    <div className="space-y-4">
                        {/* Today */}
                        <div className="p-6">
                            <h3 className="text-lg font-semibold mb-4">Today</h3>
                            {today.map(notification => (
                                <div key={notification.id} className={cn("flex items-start gap-4 p-4 rounded-lg", !notification.read && "bg-primary/5")}>
                                    <div className={cn("p-2 rounded-full", !notification.read ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground")}>{getIcon(notification.icon)}</div>
                                    <div className="flex-grow">
                                        <p className={cn("font-medium", !notification.read && "font-bold")}>{notification.message}</p>
                                        <p className="text-sm text-muted-foreground">{notification.time}</p>
                                    </div>
                                    {!notification.read && (
                                        <button onClick={() => markAsRead(notification.id)} className="h-3 w-3 rounded-full bg-primary ring-4 ring-primary/20" aria-label="Mark as read"></button>
                                    )}
                                </div>
                            ))}
                        </div>

                        <Separator />

                        {/* Yesterday */}
                        <div className="p-6">
                            <h3 className="text-lg font-semibold mb-4">Yesterday</h3>
                             {yesterday.map(notification => (
                                <div key={notification.id} className={cn("flex items-start gap-4 p-4 rounded-lg", !notification.read && "bg-primary/5")}>
                                    <div className={cn("p-2 rounded-full", !notification.read ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground")}>{getIcon(notification.icon)}</div>
                                    <div className="flex-grow">
                                        <p className={cn("font-medium", !notification.read && "font-bold")}>{notification.message}</p>
                                        <p className="text-sm text-muted-foreground">{notification.time}</p>
                                    </div>
                                    {!notification.read && (
                                        <button onClick={() => markAsRead(notification.id)} className="h-3 w-3 rounded-full bg-primary ring-4 ring-primary/20" aria-label="Mark as read"></button>
                                    )}
                                </div>
                            ))}
                        </div>

                         <Separator />

                        {/* This Week */}
                        <div className="p-6">
                            <h3 className="text-lg font-semibold mb-4">This Week</h3>
                             {thisWeek.map(notification => (
                                <div key={notification.id} className={cn("flex items-start gap-4 p-4 rounded-lg", !notification.read && "bg-primary/5")}>
                                    <div className={cn("p-2 rounded-full", !notification.read ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground")}>{getIcon(notification.icon)}</div>
                                    <div className="flex-grow">
                                        <p className={cn("font-medium", !notification.read && "font-bold")}>{notification.message}</p>
                                        <p className="text-sm text-muted-foreground">{notification.time}</p>
                                    </div>
                                    {!notification.read && (
                                        <button onClick={() => markAsRead(notification.id)} className="h-3 w-3 rounded-full bg-primary ring-4 ring-primary/20" aria-label="Mark as read"></button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
