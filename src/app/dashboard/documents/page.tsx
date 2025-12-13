'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UploadCloud, File, Trash2, MoreVertical, Download, Search, FileText, FileImage, FileSpreadsheet, Folder } from 'lucide-react';
import { mockDocuments } from '@/lib/mock-data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const getFileIcon = (type: string) => {
    switch(type) {
        case 'pdf': return <FileText className="h-8 w-8 text-red-500" />;
        case 'image': return <FileImage className="h-8 w-8 text-blue-500" />;
        case 'excel': return <FileSpreadsheet className="h-8 w-8 text-green-500" />;
        case 'doc': return <FileText className="h-8 w-8 text-blue-700" />;
        default: return <File className="h-8 w-8 text-muted-foreground" />;
    }
}

const FileCard = ({ doc }: { doc: typeof mockDocuments[0] }) => (
    <Card className="hover:shadow-lg transition-all">
        <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            {getFileIcon(doc.type)}
            <p className="font-semibold mt-2 truncate w-full">{doc.name}</p>
            <p className="text-xs text-muted-foreground">{doc.size}</p>
        </CardContent>
        <div className="p-2 border-t flex justify-evenly">
            <Button variant="ghost" size="icon" className="h-8 w-8"><Download className="h-4 w-4" /></Button>
            <Button variant="ghost" size="icon" className="h-8 w-8"><Trash2 className="h-4 w-4 text-destructive" /></Button>
        </div>
    </Card>
);

export default function DocumentsPage() {
    const [view, setView] = useState('grid');
    const categories = ['Medical Records', 'Legal Documents', 'Financial Statements', 'Other'];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold">My Documents</h1>
                    <p className="text-muted-foreground">Securely store and manage your important files.</p>
                </div>
                 <Button>
                    <UploadCloud className="mr-2 h-4 w-4" />
                    Upload File
                </Button>
            </div>
            
            <Card>
                <CardHeader>
                     <div className="flex justify-between items-center">
                        <div className="relative w-full max-w-sm">
                            <Input placeholder="Search documents..." className="pl-10" />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        </div>
                     </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-8">
                        {categories.map(category => (
                            <div key={category}>
                                <div className="flex items-center gap-2 mb-4">
                                    <Folder className="h-6 w-6 text-primary/70" />
                                    <h3 className="text-xl font-bold">{category}</h3>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                                    {mockDocuments.filter(d => d.category === category).map(doc => (
                                        <FileCard key={doc.id} doc={doc} />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle>Upload New Document</CardTitle>
                    <CardDescription>Files are encrypted and stored securely.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="border-2 border-dashed rounded-lg p-12 text-center hover:border-primary transition-colors cursor-pointer">
                        <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
                        <p className="mt-4 text-sm text-muted-foreground">Drag & drop files here, or click to browse</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
