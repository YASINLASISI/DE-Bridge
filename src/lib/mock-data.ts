export type Expert = {
    id: string;
    name: string;
    domain: string;
    specialty: string;
    workplace: string;
    profilePhoto: string;
    rating: number;
    reviews: number;
    hourlyRate: number;
    isAvailableNow: boolean;
};

export const mockExperts: Expert[] = [
    {
        id: "1",
        name: "Dr. Adebayo Okonkwo",
        domain: "Healthcare",
        specialty: "Cardiologist",
        workplace: "NHS UK",
        profilePhoto: "https://picsum.photos/seed/expert-1/200/200",
        rating: 4.9,
        reviews: 127,
        hourlyRate: 85000,
        isAvailableNow: true,
    },
    {
        id: "2",
        name: "Barr. Ngozi Eze",
        domain: "Legal",
        specialty: "Immigration Lawyer",
        workplace: "Eze Law Firm, Toronto",
        profilePhoto: "https://picsum.photos/seed/expert-2/200/200",
        rating: 4.8,
        reviews: 89,
        hourlyRate: 120000,
        isAvailableNow: false,
    },
    {
        id: "3",
        name: "Tunde Bakare",
        domain: "Tech",
        specialty: "Senior Software Engineer",
        workplace: "Google, USA",
        profilePhoto: "https://picsum.photos/seed/expert-3/200/200",
        rating: 5.0,
        reviews: 203,
        hourlyRate: 65000,
        isAvailableNow: true,
    },
    {
        id: "4",
        name: "Dr. Emeka Okoli",
        domain: "Healthcare",
        specialty: "Neurologist",
        workplace: "Johns Hopkins, USA",
        profilePhoto: "https://picsum.photos/seed/expert-4/200/200",
        rating: 4.9,
        reviews: 156,
        hourlyRate: 95000,
        isAvailableNow: false,
    },
    {
        id: "5",
        name: "Amaka Nwosu",
        domain: "Security",
        specialty: "Cybersecurity Analyst",
        workplace: "Microsoft, UK",
        profilePhoto: "https://picsum.photos/seed/expert-5/200/200",
        rating: 4.7,
        reviews: 94,
        hourlyRate: 75000,
        isAvailableNow: true,
    },
    {
        id: "6",
        name: "Femi Adebayo",
        domain: "Finance",
        specialty: "Investment Banker",
        workplace: "Goldman Sachs, London",
        profilePhoto: "https://picsum.photos/seed/expert-6/200/200",
        rating: 4.8,
        reviews: 112,
        hourlyRate: 150000,
        isAvailableNow: false,
    },
    {
        id: "7",
        name: "Prof. Aisha Bello",
        domain: "Education",
        specialty: "Professor of Literature",
        workplace: "University of Toronto",
        profilePhoto: "https://picsum.photos/seed/expert-7/200/200",
        rating: 4.9,
        reviews: 78,
        hourlyRate: 50000,
        isAvailableNow: true,
    },
    {
        id: "8",
        name: "Chinedu Okoro",
        domain: "Agriculture",
        specialty: "Agribusiness Consultant",
        workplace: "Self-employed, UAE",
        profilePhoto: "https://picsum.photos/seed/expert-8/200/200",
        rating: 4.6,
        reviews: 45,
        hourlyRate: 45000,
        isAvailableNow: true,
    },
    {
        id: "9",
        name: "Yemi Adetola",
        domain: "Creative",
        specialty: "Brand Strategist",
        workplace: "Ogilvy, New York",
        profilePhoto: "https://picsum.photos/seed/expert-9/200/200",
        rating: 4.9,
        reviews: 130,
        hourlyRate: 110000,
        isAvailableNow: false,
    },
    {
        id: "10",
        name: "Dr. Halima Abubakar",
        domain: "Healthcare",
        specialty: "Pediatrician",
        workplace: "Cleveland Clinic, USA",
        profilePhoto: "https://picsum.photos/seed/expert-10/200/200",
        rating: 5.0,
        reviews: 180,
        hourlyRate: 90000,
        isAvailableNow: true,
    },
    {
        id: "11",
        name: "Oluwatobi David",
        domain: "Tech",
        specialty: "AI/ML Engineer",
        workplace: "NVIDIA, USA",
        profilePhoto: "https://picsum.photos/seed/expert-11/200/200",
        rating: 4.8,
        reviews: 115,
        hourlyRate: 130000,
        isAvailableNow: false,
    },
    {
        id: "12",
        name: "Ifeoma Chikezie",
        domain: "Legal",
        specialty: "Corporate Lawyer",
        workplace: "Clifford Chance, London",
        profilePhoto: "https://picsum.photos/seed/expert-12/200/200",
        rating: 4.9,
        reviews: 99,
        hourlyRate: 180000,
        isAvailableNow: true,
    }
];

export const mockUser = {
    name: 'Tunde Adekunle',
    email: 'tunde.adekunle@example.com',
    profilePhoto: 'https://picsum.photos/seed/user/200/200',
    role: 'seeker' as 'seeker' | 'expert'
};

export const mockConsultations = [
    {
        id: '1',
        expert: mockExperts[0],
        date: '2024-12-15',
        time: '02:00 PM',
        type: 'Video' as 'Video' | 'Phone' | 'Chat',
        status: 'Confirmed' as 'Confirmed' | 'Pending' | 'Cancelled'
    },
    {
        id: '2',
        expert: mockExperts[1],
        date: '2024-12-18',
        time: '11:30 AM',
        type: 'Video' as 'Video' | 'Phone' | 'Chat',
        status: 'Confirmed' as 'Confirmed' | 'Pending' | 'Cancelled'
    },
    {
        id: '3',
        expert: mockExperts[2],
        date: '2024-11-20',
        time: '04:00 PM',
        type: 'Chat' as 'Video' | 'Phone' | 'Chat',
        status: 'Completed' as 'Completed' | 'Cancelled'
    },
     {
        id: '4',
        expert: mockExperts[3],
        date: '2024-11-15',
        time: '09:00 AM',
        type: 'Phone' as 'Video' | 'Phone' | 'Chat',
        status: 'Completed' as 'Completed' | 'Cancelled'
    },
     {
        id: '5',
        expert: mockExperts[4],
        date: '2024-10-30',
        time: '01:00 PM',
        type: 'Video' as 'Video' | 'Phone' | 'Chat',
        status: 'Cancelled' as 'Completed' | 'Cancelled'
    },
];

export const mockMessages = [
    {
        id: 'msg1',
        expert: mockExperts[0],
        lastMessage: "Yes, I've received them. I'll review and get back to you shortly.",
        timestamp: '10:45 AM',
        unreadCount: 0
    },
    {
        id: 'msg2',
        expert: mockExperts[3],
        lastMessage: "Can you provide the addtional documents we discussed?",
        timestamp: 'Yesterday',
        unreadCount: 2
    },
    {
        id: 'msg3',
        expert: mockExperts[1],
        lastMessage: "Perfect, thank you!",
        timestamp: '3 days ago',
        unreadCount: 0
    },
    {
        id: 'msg4',
        expert: mockExperts[2],
        lastMessage: "The code seems to be working now. Great job.",
        timestamp: '1 week ago',
        unreadCount: 0
    },
    {
        id: 'msg5',
        expert: mockExperts[6],
        lastMessage: "Let's schedule a follow up call for next week.",
        timestamp: '2 weeks ago',
        unreadCount: 0
    },
];

export const chatWithExpert = [
    { from: 'me', text: 'Good morning Dr. Adebayo. I have uploaded my recent test results.', time: '10:30 AM' },
    { from: 'expert', text: "Good morning Tunde. Thank you for sending those over.", time: '10:31 AM' },
    { from: 'expert', text: "I'm looking at them now.", time: '10:31 AM' },
    { from: 'me', text: 'Thank you, doctor. I am particularly concerned about the cholesterol levels.', time: '10:32 AM' },
    { from: 'expert', text: "I see that. The HDL is a bit lower than ideal, but the LDL is within a good range. We can discuss dietary adjustments.", time: '10:35 AM' },
    { from: 'expert', text: "I'll make some notes and we can go over them in detail during our video call this Friday.", time: '10:36 AM' },
    { from: 'me', text: "That sounds great. Thank you for the quick response!", time: '10:37 AM' },
]

export const mockDocuments = [
    { id: 'doc1', name: 'Blood_Test_Results_Jan24.pdf', category: 'Medical Records', type: 'pdf', size: '2.3 MB', date: '2024-10-15' },
    { id: 'doc2', name: 'MRI_Scan_Spine.jpeg', category: 'Medical Records', type: 'image', size: '4.1 MB', date: '2024-10-15' },
    { id: 'doc3', name: 'Business_Incorporation.pdf', category: 'Legal Documents', type: 'pdf', size: '850 KB', date: '2024-09-22' },
    { id: 'doc4', name: 'Financial_Projections_2025.xlsx', category: 'Financial Statements', type: 'excel', size: '1.2 MB', date: '2024-09-20' },
    { id: 'doc5', name: 'Previous_Consultation_Notes.docx', category: 'Other', type: 'doc', size: '35 KB', date: '2024-08-01' },
];

export const mockPaymentMethods = [
    { id: 'pm1', type: 'card', brand: 'visa', last4: '4242', isDefault: true },
    { id: 'pm2', type: 'card', brand: 'mastercard', last4: '8921', isDefault: false },
    { id: 'pm3', type: 'bank', name: 'GTBank', last4: '0123', isDefault: false },
];

export const mockNotifications = [
    { id: 'n1', icon: 'calendar', message: "Your consultation with Dr. Adebayo starts in 1 hour.", time: '25 minutes ago', read: false },
    { id: 'n2', icon: 'message', message: "You have a new message from Barr. Ngozi Eze.", time: '3 hours ago', read: false },
    { id: 'n3', icon: 'star', message: "Please rate your recent session with Tunde Bakare.", time: 'Yesterday', read: true },
    { id: 'n4', icon: 'file', message: "Dr. Emeka Okoli has requested additional documents for your upcoming session.", time: '2 days ago', read: false },
    { id: 'n5', icon: 'wallet', message: "Your payment of ₦85,000 for consultation was successful.", time: '2 days ago', read: true },
    { id: 'n6', icon: 'calendar', message: "Your booking for Dec 28, 2024 with Amaka Nwosu has been cancelled.", time: '4 days ago', read: true },
];
