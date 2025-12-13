'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CreditCard, PlusCircle, DollarSign, BarChart, MoreVertical } from 'lucide-react';
import { mockPaymentMethods } from '@/lib/mock-data';
import { StatCard } from '@/components/dashboard/stat-card';


export default function PaymentsPage() {

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold">Payments & Billing</h1>
                <p className="text-muted-foreground">Manage your payment methods and view your transaction history.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Total Spent" value="₦125,000" icon={DollarSign} />
                <StatCard title="Total Consultations" value="12" icon={BarChart} />
                <StatCard title="Avg. Per Session" value="₦10,416" icon={DollarSign} />
            </div>

            <Card>
                <CardHeader className='flex-row justify-between items-start'>
                    <div>
                        <CardTitle>Payment Methods</CardTitle>
                        <CardDescription>Your saved credit/debit cards and bank accounts.</CardDescription>
                    </div>
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add New Method
                    </Button>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {mockPaymentMethods.map(pm => (
                            <div key={pm.id} className="flex items-center justify-between p-4 rounded-md border">
                                <div className="flex items-center gap-4">
                                    <CreditCard className="h-8 w-8 text-primary" />
                                    <div>
                                        <p className="font-semibold capitalize flex items-center gap-2">
                                            {pm.brand || pm.name} ending in {pm.last4}
                                            {pm.isDefault && <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">Default</span>}
                                        </p>
                                        {pm.type === 'card' && <p className="text-sm text-muted-foreground">Expires 12/26</p>}
                                    </div>
                                </div>
                                <div className='flex items-center gap-2'>
                                    {!pm.isDefault && <Button variant="ghost" size="sm">Set as default</Button>}
                                    <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">Remove</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Transaction History</CardTitle>
                    <CardDescription>A record of all your payments on DE-Bridge.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell>2024-11-20</TableCell>
                                <TableCell>Consultation with Tunde Bakare</TableCell>
                                <TableCell>₦32,500</TableCell>
                                <TableCell>
                                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-emerald-100 text-emerald-800">Paid</span>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4"/></Button>
                                </TableCell>
                            </TableRow>
                             <TableRow>
                                <TableCell>2024-11-15</TableCell>
                                <TableCell>Consultation with Dr. Emeka Okoli</TableCell>
                                <TableCell>₦47,500</TableCell>
                                <TableCell>
                                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-emerald-100 text-emerald-800">Paid</span>
                                </TableCell>
                                 <TableCell className="text-right">
                                    <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4"/></Button>
                                </TableCell>
                            </TableRow>
                             <TableRow>
                                <TableCell>2024-10-30</TableCell>
                                <TableCell>Consultation with Amaka Nwosu</TableCell>
                                <TableCell>₦37,500</TableCell>
                                <TableCell>
                                     <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">Refunded</span>
                                </TableCell>
                                 <TableCell className="text-right">
                                    <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4"/></Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
