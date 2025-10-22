
'use client';

import { useState } from 'react';
import {
  Archive,
  FileText,
  Inbox,
  MoreVertical,
  Paperclip,
  Search,
  Send,
  Smile,
  Star,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const conversations = [
  {
    id: 1,
    name: 'John Doe',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    jobTitle: 'Build a React Dashboard',
    lastMessage: "You: Great progress! Let's schedule a call to discuss the next steps.",
    timestamp: '2h ago',
    unreadCount: 0,
    isOnline: true,
  },
  {
    id: 2,
    name: 'Jane Smith',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026705d',
    jobTitle: 'Mobile App Design',
    lastMessage: "Thanks! I'll send the revision over by EOD.",
    timestamp: '5h ago',
    unreadCount: 1,
    isOnline: false,
  },
  {
    id: 3,
    name: 'Alex Johnson',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026706e',
    jobTitle: 'DeFi Protocol',
    lastMessage: 'Perfect, looking forward to it.',
    timestamp: '1d ago',
    unreadCount: 0,
    isOnline: true,
  },
    {
    id: 4,
    name: 'Emily White',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026707d',
    jobTitle: 'Content Writing & SEO',
    lastMessage: 'You: Proposal looks good. Can you start on Monday?',
    timestamp: '3d ago',
    unreadCount: 0,
    isOnline: false,
  },
];

const messages = [
    { type: 'system', content: 'Contract Started: Oct 10, 2025' },
    { type: 'client', content: "Hi John! Excited to start this project. Can we have a kickoff call sometime this week?", timestamp: 'Oct 10, 10:30 AM', read: true },
    { type: 'freelancer', from: 'John Doe', content: "Absolutely! I'm available tomorrow at 2 PM GMT. Does that work?", timestamp: 'Oct 10, 11:15 AM' },
    { type: 'client', content: "Perfect! Here's the Zoom link: ...", timestamp: 'Oct 11, 9:00 AM', read: true },
    { type: 'system', content: '💰 Milestone 1 payment of 400 USDC funded to escrow.' },
    { type: 'freelancer', from: 'John Doe', content: "Here's the first deliverable for your review.", timestamp: 'Oct 12, 9:00 AM', attachment: { name: 'design-mockup-v2.fig', size: '2.4 MB' } },
    { type: 'client', content: "Great progress! Let's schedule a call to discuss the next steps.", timestamp: '2h ago', read: false },
    { type: 'freelancer', from: 'John Doe', isTyping: true },
];

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);

  return (
    <div className="flex h-[calc(100vh-108px)]">
      <aside className="w-full md:w-[350px] lg:w-[400px] border-r flex flex-col">
        <div className="p-4 border-b">
          <h1 className="text-2xl font-bold">Messages</h1>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search conversations..." className="pl-9" />
          </div>
        </div>
        <div className="p-2 border-b">
             <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="flex-1 justify-center bg-muted">All</Button>
                <Button variant="ghost" size="sm" className="flex-1 justify-center">Unread</Button>
                <Button variant="ghost" size="sm" className="flex-1 justify-center">Archived</Button>
            </div>
        </div>
        <div className="flex-1 overflow-y-auto">
            {conversations.map((convo) => (
            <button
                key={convo.id}
                onClick={() => setSelectedConversation(convo)}
                className={cn(
                'flex items-start gap-4 p-4 w-full text-left transition-colors hover:bg-muted/50',
                selectedConversation.id === convo.id && 'bg-muted'
                )}
            >
                <div className="relative">
                    <Avatar className="h-12 w-12">
                        <AvatarImage src={convo.avatar} alt={convo.name} />
                        <AvatarFallback>{convo.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                     {convo.isOnline && <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 ring-2 ring-background" />}
                </div>
                <div className="flex-1 overflow-hidden">
                    <div className="flex justify-between items-center">
                        <p className="font-semibold truncate">{convo.name}</p>
                        <p className="text-xs text-muted-foreground">{convo.timestamp}</p>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{convo.jobTitle}</p>
                    <div className="flex justify-between items-center mt-1">
                        <p className="text-sm text-muted-foreground truncate">{convo.lastMessage}</p>
                        {convo.unreadCount > 0 && (
                            <Badge className="h-5 w-5 flex items-center justify-center p-0">{convo.unreadCount}</Badge>
                        )}
                    </div>
                </div>
            </button>
            ))}
        </div>
      </aside>
      <main className="flex-1 flex flex-col bg-background">
        {selectedConversation ? (
          <>
            <header className="p-4 border-b flex items-center gap-4">
                <div className="relative">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={selectedConversation.avatar} alt={selectedConversation.name} />
                        <AvatarFallback>{selectedConversation.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {selectedConversation.isOnline && <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-background" />}
                </div>
                <div className='flex-1'>
                    <p className="font-semibold">{selectedConversation.name}</p>
                    <p className="text-sm text-muted-foreground">
                        <Link href="#" className="hover:underline">{selectedConversation.jobTitle}</Link>
                    </p>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon"><MoreVertical /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>View Job Details</DropdownMenuItem>
                        <DropdownMenuItem>View Contract</DropdownMenuItem>
                        <DropdownMenuItem>Archive Conversation</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Block User</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </header>
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
               {messages.map((msg, index) => {
                    if (msg.type === 'system') {
                        return (
                            <div key={index} className="text-center text-xs text-muted-foreground my-4">
                                {msg.content}
                            </div>
                        )
                    }

                    if (msg.from === 'John Doe' && msg.isTyping) {
                        return (
                             <div key={index} className="flex items-end gap-2 justify-start">
                                 <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted p-3 rounded-lg rounded-bl-none">
                                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                                </div>
                            </div>
                        )
                    }

                    const isClient = msg.type === 'client';
                    return (
                        <div key={index} className={cn('flex items-end gap-2', !isClient ? 'justify-start' : 'justify-end')}>
                             {!isClient && <Avatar className="h-8 w-8"><AvatarImage src={selectedConversation.avatar}/><AvatarFallback>{selectedConversation.name.charAt(0)}</AvatarFallback></Avatar>}
                            <div className={cn(
                                'max-w-[70%] p-3 rounded-lg', 
                                !isClient ? 'bg-muted rounded-bl-none' : 'bg-primary text-primary-foreground rounded-br-none'
                            )}>
                                <p>{msg.content}</p>
                                {msg.attachment && (
                                     <div className="mt-2 p-2 bg-black/10 rounded-md flex items-center gap-2">
                                        <Paperclip className="h-5 w-5" />
                                        <div>
                                            <p className="text-sm font-medium">{msg.attachment.name}</p>
                                            <p className="text-xs">{msg.attachment.size}</p>
                                        </div>
                                    </div>
                                )}
                                <p className={cn('text-xs mt-1', !isClient ? 'text-muted-foreground' : 'text-primary-foreground/70')}>
                                    {msg.timestamp}
                                    {isClient && msg.read && ' ✓✓'}
                                </p>
                            </div>
                        </div>
                    )
               })}
            </div>
            <footer className="p-4 border-t">
              <div className="relative">
                <Textarea placeholder="Type your message..." className="pr-28" rows={1} />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    <Button variant="ghost" size="icon"><Smile /></Button>
                    <Button variant="ghost" size="icon"><Paperclip /></Button>
                    <Button size="icon"><Send /></Button>
                </div>
              </div>
            </footer>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
            <Inbox className="h-16 w-16 text-muted-foreground" />
            <h2 className="mt-4 text-2xl font-semibold">Select a conversation</h2>
            <p className="mt-2 text-muted-foreground">Choose one of your existing conversations to start chatting.</p>
          </div>
        )}
      </main>
    </div>
  );
}
