
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

const initialProposals = [
  {
    id: 'prop-1',
    jobId: '1',
    jobTitle: 'Build a React Dashboard for Analytics Platform',
    client: {
      name: 'TechCorp Inc.',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026706e',
      isVerified: true,
      location: 'San Francisco, CA',
    },
    status: 'Viewed by Client',
    submitted: '2 hours ago',
    budget: '$800 - $1,200',
    bid: '1,000 USDC',
    timeline: '2 weeks',
    views: 3,
    lastViewed: '15 minutes ago',
    competing: 12,
    rank: 'Top 20%',
    tab: 'pending',
  },
  {
    id: 'prop-2',
    jobId: '1',
    jobTitle: 'Senior Blockchain Engineer (DeFi)',
    client: {
      name: 'Crypto-Innovate',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026707d',
      isVerified: true,
      location: 'Global',
    },
    status: 'Interview Requested',
    submitted: '1 day ago',
    budget: '$120 - $180 / hr',
    bid: '150 USDC / hr',
    timeline: '3+ months',
    tab: 'interviewing',
  },
  {
    id: 'prop-3',
    jobId: '1',
    jobTitle: 'UI/UX Designer for Mobile App',
    client: {
      name: 'Creative Solutions',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026708d',
      isVerified: true,
      location: 'Canada',
    },
    status: 'Accepted',
    submitted: '3 days ago',
    budget: '$3,000',
    bid: '2,800 USDC',
    timeline: '1 month',
    tab: 'accepted',
  },
  {
    id: 'prop-4',
    jobId: '1',
    jobTitle: 'Content Writer for Tech Blog',
    client: {
      name: 'Blogify',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026709f',
      isVerified: false,
      location: 'Remote',
    },
    status: 'Declined',
    submitted: '1 week ago',
    budget: '$500',
    bid: '450 USDC',
    timeline: '2 weeks',
    reason: 'Chose another freelancer with more specific experience.',
    tab: 'declined',
  },
  {
    id: 'prop-5',
    jobId: '1',
    jobTitle: 'Social Media Manager for NFT Project',
    client: {
        name: 'ArtChain',
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e2902670af',
        isVerified: true,
        location: 'Remote',
    },
    status: 'Draft',
    saved: '2 days ago',
    budget: '$1000 - $1500',
    bid: '1200 USDC',
    timeline: '1 month',
    tab: 'draft',
  },
];


type Proposal = typeof initialProposals[0];

interface ProposalContextType {
  proposals: Proposal[];
  withdrawProposal: (id: string) => void;
}

const ProposalContext = createContext<ProposalContextType | undefined>(undefined);

export const ProposalProvider = ({ children }: { children: ReactNode }) => {
  const [proposals, setProposals] = useState<Proposal[]>(initialProposals);

  const withdrawProposal = (id: string) => {
    setProposals(prevProposals => prevProposals.filter(p => p.id !== id));
  };

  return (
    <ProposalContext.Provider value={{ proposals, withdrawProposal }}>
      {children}
    </ProposalContext.Provider>
  );
};

export const useProposals = () => {
  const context = useContext(ProposalContext);
  if (context === undefined) {
    throw new Error('useProposals must be used within a ProposalProvider');
  }
  return context;
};
