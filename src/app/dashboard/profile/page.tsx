'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UploadCloud, File, Trash2, MoreVertical, CreditCard, PlusCircle, Pencil } from 'lucide-react';
import { mockUser, mockDocuments, mockPaymentMethods } from '@/lib/mock-data';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const getInitials = (name: string) => {
    if(!name) return 'U'
    const names = name.split(' ');
    if (names.length > 1 && names[0] && names[1]) {
      return `${names[0][0]}${names[1][0]}`;
    }
    if (name) return name.substring(0, 2);
    return 'U';
}

const PersonalInfoTab = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details here.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                 <div className="flex items-center gap-6">
                    <Avatar className="h-20 w-20">
                        <AvatarImage src={mockUser.profilePhoto} />
                        <AvatarFallback>{getInitials(mockUser.name)}</AvatarFallback>
                    </Avatar>
                    <Button variant="outline">
                        <Pencil className="mr-2 h-4 w-4" />
                        Change Photo
                    </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" defaultValue={mockUser.name} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" defaultValue={mockUser.email} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" defaultValue="+234 801 234 5678" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" defaultValue="Lagos, Nigeria" />
                    </div>
                </div>
                <Button>Save Changes</Button>
            </CardContent>
        </Card>
    );
};

const DocumentsTab = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>My Documents</CardTitle>
                <CardDescription>Manage your uploaded documents.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="border-2 border-dashed rounded-lg p-12 text-center hover:border-primary transition-colors">
                    <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
                    <p className="mt-4 text-sm text-muted-foreground">Drag & drop files here, or click to browse</p>
                     <Button variant="outline" className="mt-4">
                        <UploadCloud className="mr-2 h-4 w-4" />
                        Upload File
                    </Button>
                </div>
                <div className="space-y-4">
                    <h3 className="font-semibold">Uploaded Files</h3>
                    <div className="space-y-2">
                        {mockDocuments.map(doc => (
                            <div key={doc.id} className="flex items-center justify-between p-3 rounded-md border bg-muted/50">
                                <div className="flex items-center gap-4">
                                    <File className="h-6 w-6 text-primary" />
                                    <div>
                                        <p className="font-medium">{doc.name}</p>
                                        <p className="text-sm text-muted-foreground">{doc.category} - {doc.size}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <p className="text-sm text-muted-foreground hidden md:block">{doc.date}</p>
                                    <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-destructive" /></Button>
                                    <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

const PaymentMethodsTab = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Manage your saved payment methods.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-4">
                    {mockPaymentMethods.map(pm => (
                        <div key={pm.id} className="flex items-center justify-between p-4 rounded-md border">
                            <div className="flex items-center gap-4">
                                <CreditCard className="h-8 w-8 text-muted-foreground" />
                                <div>
                                    <p className="font-semibold capitalize">{pm.brand} ending in {pm.last4}</p>
                                    <p className="text-sm text-muted-foreground">Expires 12/26</p>
                                </div>
                            </div>
                             <Button variant="outline" size="sm">Remove</Button>
                        </div>
                    ))}
                </div>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Payment Method
                </Button>
            </CardContent>
        </Card>
    );
}

const ConsultationHistoryTab = () => {
     return (
        <Card>
            <CardHeader>
                <CardTitle>Consultation History</CardTitle>
                <CardDescription>A log of all your past sessions.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Expert</TableHead>
                            <TableHead>Domain</TableHead>
                             <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>2024-11-20</TableCell>
                            <TableCell>Tunde Bakare</TableCell>
                            <TableCell>Tech</TableCell>
                             <TableCell>₦32,500</TableCell>
                            <TableCell>Completed</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>2024-11-15</TableCell>
                            <TableCell>Dr. Emeka Okoli</TableCell>
                            <TableCell>Healthcare</TableCell>
                             <TableCell>₦47,500</TableCell>
                            <TableCell>Completed</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>2024-10-30</TableCell>
                            <TableCell>Amaka Nwosu</TableCell>
                            <TableCell>Security</TableCell>
                             <TableCell>₦37,500</TableCell>
                            <TableCell>Cancelled</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}


export default function ProfilePage() {

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Manage Your Profile</h1>
                <p className="text-muted-foreground">Keep your account details and documents up to date.</p>
            </div>

            <Tabs defaultValue="personal" className="w-full">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
                    <TabsTrigger value="personal">Personal Info</TabsTrigger>
                    <TabsTrigger value="documents">Documents</TabsTrigger>
                    <TabsTrigger value="payment">Payment Methods</TabsTrigger>
                    <TabsTrigger value="history">Consultation History</TabsTrigger>
                </TabsList>
                <TabsContent value="personal" className='mt-6'>
                   <PersonalInfoTab />
                </TabsContent>
                <TabsContent value="documents" className='mt-6'>
                    <DocumentsTab />
                </TabsContent>
                <TabsContent value="payment" className='mt-6'>
                    <PaymentMethodsTab />
                </TabsContent>
                <TabsContent value="history" className='mt-6'>
                    <ConsultationHistoryTab />
                </TabsContent>
            </Tabs>
        </div>
    );
}
