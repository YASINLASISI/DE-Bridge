'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


export default function SettingsPage() {

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold">Settings</h1>
                <p className="text-muted-foreground">Manage your account, notifications, and privacy settings.</p>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>Update your email and password.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" defaultValue="tunde.adekunle@example.com" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" placeholder="••••••••" />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>Choose how you want to be notified.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-md border">
                        <div>
                            <Label htmlFor="email-notifs" className='font-semibold'>Email Notifications</Label>
                            <p className='text-sm text-muted-foreground'>Receive updates via your registered email.</p>
                        </div>
                        <Switch id="email-notifs" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-md border">
                        <div>
                            <Label htmlFor="sms-notifs" className='font-semibold'>SMS Notifications</Label>
                             <p className='text-sm text-muted-foreground'>Get important alerts on your phone.</p>
                        </div>
                        <Switch id="sms-notifs" />
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-md border">
                        <div>
                            <Label htmlFor="push-notifs" className='font-semibold'>Push Notifications</Label>
                             <p className='text-sm text-muted-foreground'>Real-time alerts directly on your device.</p>
                        </div>
                        <Switch id="push-notifs" defaultChecked />
                    </div>
                </CardContent>
            </Card>
            
            <Card>
                 <CardHeader>
                    <CardTitle>Language & Timezone</CardTitle>
                    <CardDescription>Set your preferred language and timezone for a personalized experience.</CardDescription>
                </CardHeader>
                <CardContent className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                     <div className="space-y-2">
                        <Label htmlFor="language">Language</Label>
                         <Select defaultValue="en">
                            <SelectTrigger id="language">
                                <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="en">English</SelectItem>
                                <SelectItem value="fr">French</SelectItem>
                                <SelectItem value="yo">Yoruba</SelectItem>
                                <SelectItem value="ig">Igbo</SelectItem>
                                <SelectItem value="ha">Hausa</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="timezone">Timezone</Label>
                         <Select defaultValue="wat">
                            <SelectTrigger id="timezone">
                                <SelectValue placeholder="Select timezone" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="wat">(GMT+1) West Africa Time</SelectItem>
                                <SelectItem value="gmt">(GMT+0) Greenwich Mean Time</SelectItem>
                                <SelectItem value="est">(GMT-5) Eastern Standard Time</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>
            
            <Card className="border-destructive">
                <CardHeader>
                    <CardTitle className="text-destructive">Deactivate Account</CardTitle>
                    <CardDescription>This action is irreversible and will permanently delete all your data.</CardDescription>
                </CardHeader>
                <CardContent>
                     <AlertDialog>
                        <AlertDialogTrigger asChild>
                           <Button variant="destructive">Deactivate My Account</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your
                                account and remove your data from our servers.
                            </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction className='bg-destructive hover:bg-destructive/90'>Deactivate</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </CardContent>
            </Card>

             <div className="pt-4 flex justify-end">
                <Button size="lg">Save All Changes</Button>
            </div>
        </div>
    );
}
