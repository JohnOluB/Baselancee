
'use client';
import { useState, useEffect } from 'react';
import {
  Wallet,
  Info,
  ChevronRight,
  Copy,
  CheckCircle,
  Clock,
  XCircle,
  ExternalLink,
  Loader2,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseUnits, formatUnits } from 'viem';

// MOCK ABI and Address - in a real app, this would be imported
const mockContractAddress = '0x7a6962646d6f636b636f6e747261637430313233'; // A valid hex but not a real address
const mockContractAbi = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "balances",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "withdraw",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

const initialWithdrawals = [
  {
    date: '2024-10-26 14:30',
    amount: '1,200.00 USDC',
    address: '0x1234...5678',
    status: 'Completed',
    txHash: '0xabc...def',
  },
  {
    date: '2024-10-24 09:15',
    amount: '500.00 USDC',
    address: '0xabcd...efgh',
    status: 'Pending',
    txHash: '0xghi...jkl',
  },
  {
    date: '2024-10-22 18:45',
    amount: '750.00 USDC',
    address: '0x1234...5678',
    status: 'Failed',
    txHash: '0x mno...pqr',
  },
];

const getStatusBadge = (status: string) => {
    switch(status) {
        case 'Completed':
            return <Badge className="bg-success-green/10 text-success-green hover:bg-success-green/20"><CheckCircle className="mr-1 h-3 w-3"/>{status}</Badge>
        case 'Pending':
            return <Badge className="bg-warning-orange/10 text-warning-orange hover:bg-warning-orange/20"><Clock className="mr-1 h-3 w-3"/>{status}</Badge>
        case 'Failed':
            return <Badge className="bg-destructive/10 text-destructive hover:bg-destructive/20"><XCircle className="mr-1 h-3 w-3"/>{status}</Badge>
        default:
            return <Badge>{status}</Badge>
    }
}

export default function WithdrawPage() {
  const { address: connectedAddress } = useAccount();
  const { toast } = useToast();
  
  const { data: balance, refetch: refetchBalance } = useReadContract({
    address: mockContractAddress,
    abi: mockContractAbi,
    functionName: 'balances',
    args: [connectedAddress],
    query: {
      enabled: !!connectedAddress,
      // Mocking a starting balance for demonstration purposes
      initialData: parseUnits('1234.56', 6), 
    }
  });

  const { data: hash, writeContract, isPending: isWithdrawInitiating, error: withdrawError } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  const [withdrawToAddress, setWithdrawToAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [isAddressInvalid, setIsAddressInvalid] = useState(false);
  const [recentWithdrawals, setRecentWithdrawals] = useState(initialWithdrawals);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [lastWithdrawal, setLastWithdrawal] = useState({ amount: '0.00', address: '' });

  const availableBalance = balance ? parseFloat(formatUnits(balance as bigint, 6)) : 0.0;
  const networkFee = 2.50; // Mock fee

  useEffect(() => {
    if (connectedAddress) {
      setWithdrawToAddress(connectedAddress);
    }
  }, [connectedAddress]);

  useEffect(() => {
    if (isConfirmed) {
      toast({
        title: "Withdrawal Successful!",
        description: "Your funds have been sent to your wallet.",
        variant: 'default',
      });
      setShowSuccessDialog(true);
      refetchBalance(); // Refresh balance after successful withdrawal
      
      const newWithdrawal = {
          date: new Date().toISOString().replace('T', ' ').slice(0, 16),
          amount: `${parseFloat(amount).toFixed(2)} USDC`,
          address: `${withdrawToAddress.slice(0, 6)}...${withdrawToAddress.slice(-4)}`,
          status: 'Completed',
          txHash: hash ?? ''
      };
      setLastWithdrawal({ amount: parseFloat(amount).toFixed(2), address: withdrawToAddress });
      setRecentWithdrawals([newWithdrawal, ...recentWithdrawals]);
      setAmount('');
    }
  }, [isConfirmed, hash, amount, withdrawToAddress, refetchBalance, toast]);

  useEffect(() => {
    if (withdrawError) {
      toast({
        variant: 'destructive',
        title: 'Withdrawal Failed',
        description: withdrawError.shortMessage || 'Could not complete the withdrawal.',
      });
    }
  }, [withdrawError, toast]);

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAddress = e.target.value;
    setWithdrawToAddress(newAddress);
    const isValid = /^0x[a-fA-F0-9]{40}$/.test(newAddress);
    setIsAddressInvalid(newAddress.length > 0 && !isValid);
  };
  
  const amountNumber = parseFloat(amount) || 0;
  const finalAmount = amountNumber > networkFee ? amountNumber - networkFee : 0;
  const isWithdrawDisabled = isWithdrawInitiating || isConfirming || isAddressInvalid || amountNumber < 10 || amountNumber > availableBalance;

  const handleWithdraw = async () => {
    if (isWithdrawDisabled || !connectedAddress) return;
    try {
        const amountInUnits = parseUnits(amount, 6); // Assuming USDC has 6 decimals
        writeContract({
            address: mockContractAddress,
            abi: mockContractAbi,
            functionName: 'withdraw',
            args: [amountInUnits],
        });
    } catch (err: any) {
      console.error('Withdrawal initiation error:', err);
      toast({
        variant: 'destructive',
        title: 'Withdrawal Failed',
        description: err.message || 'Could not initiate the withdrawal process.',
      });
    }
  }

  const isLoading = isWithdrawInitiating || isConfirming;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
       <div>
            <div className="text-sm text-muted-foreground flex items-center gap-2">
                <Link href="/dashboard/freelancer" className="hover:text-primary">Dashboard</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/dashboard/freelancer/earnings" className="hover:text-primary">Wallet</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="font-medium text-foreground">Withdraw</span>
            </div>
            <h1 className="text-3xl font-bold mt-2">Withdraw Funds</h1>
       </div>
       
       <Card className="bg-deep-blue text-white">
            <CardContent className="p-6">
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">Available Balance <Info className="h-4 w-4"/></p>
                        <p className="text-3xl font-bold">{availableBalance.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} USDC</p>
                    </div>
                     <Badge className="bg-crypto-gold text-black hover:bg-crypto-gold/90 text-sm">Base Network</Badge>
                </div>
            </CardContent>
       </Card>

      <Card className="max-w-[600px] mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Create Withdrawal Request</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
           <div>
            <Label htmlFor="wallet-address">Base Network Wallet Address</Label>
            <Input 
                id="wallet-address" 
                placeholder="0x..." 
                value={withdrawToAddress}
                onChange={handleAddressChange}
                className={isAddressInvalid ? 'border-destructive focus-visible:ring-destructive' : ''}
             />
             {isAddressInvalid ? (
                <p className="text-sm text-destructive mt-1">Invalid Ethereum address format.</p>
             ) : (
                <p className="text-sm text-muted-foreground mt-1">Only Base network addresses supported.</p>
             )}
          </div>
          <div>
            <Label htmlFor="amount">Withdrawal Amount (USDC)</Label>
            <div className="relative">
                <Input id="amount" type="number" placeholder="0.00" value={amount} onChange={(e) => setAmount(e.target.value)} />
                <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center">
                     <span className="text-sm text-muted-foreground mr-2">USDC</span>
                     <Button variant="ghost" size="sm" onClick={() => setAmount(String(availableBalance))}>Max</Button>
                </div>
            </div>
            <p className="text-sm text-muted-foreground mt-1">Available: {availableBalance.toLocaleString()} USDC. Minimum withdrawal: $10.00 USDC.</p>
          </div>

           <div className="p-4 rounded-lg bg-muted/50 space-y-2">
                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Withdrawal Amount</span>
                    <span>{amountNumber.toFixed(2)} USDC</span>
                </div>
                 <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Network Fee (est.)</span>
                    <span>- {networkFee.toFixed(2)} USDC</span>
                </div>
                 <div className="flex justify-between font-bold text-base pt-2 border-t">
                    <span>You'll receive</span>
                    <span>{finalAmount.toFixed(2)} USDC</span>
                </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col items-stretch gap-4">
          <Button size="lg" className="w-full shadow-[0_0_20px_hsl(var(--primary)/50%)]" onClick={handleWithdraw} disabled={isWithdrawDisabled}>
            {isLoading ? (
                <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin"/>
                    {isConfirming ? 'Confirming Transaction...' : 'Waiting for approval...'}
                </>
            ) : (
                <>
                    <Wallet className="mr-2 h-5 w-5"/>
                    Withdraw Funds
                </>
            )}
          </Button>
           <p className="text-xs text-muted-foreground text-center">Withdrawals are irreversible. Please double-check the address. Estimated arrival: 2-5 minutes.</p>
        </CardFooter>
      </Card>

      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
            <DialogContent>
                <DialogHeader className="items-center text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-4">
                        <CheckCircle className="h-10 w-10 text-green-600" />
                    </div>
                    <DialogTitle className="text-2xl">Withdrawal Successful!</DialogTitle>
                    <DialogDescription>
                        Your funds are on their way.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4 text-center">
                    <p className="text-3xl font-bold">{lastWithdrawal.amount} USDC</p>
                    <p className="text-sm text-muted-foreground mt-1">Has been sent to:</p>
                    <p className="text-sm font-medium break-all mt-2">{lastWithdrawal.address}</p>
                </div>
                <DialogFooter className="sm:justify-center">
                    <Button onClick={() => setShowSuccessDialog(false)}>Done</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
      
       <div className="pt-8">
         <h2 className="text-2xl font-semibold mb-4">Recent Withdrawals</h2>
         <Card>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Address</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Transaction</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                     {recentWithdrawals.map((tx, i) => (
                        <TableRow key={i}>
                            <TableCell>{tx.date}</TableCell>
                            <TableCell>{tx.amount}</TableCell>
                            <TableCell className="flex items-center gap-2">
                                {tx.address}
                                <Button variant="ghost" size="icon" className="h-6 w-6"><Copy className="h-3 w-3"/></Button>
                            </TableCell>
                            <TableCell>{getStatusBadge(tx.status)}</TableCell>
                            <TableCell className="text-right">
                                {tx.txHash && (
                                     <Button variant="outline" size="sm" asChild>
                                        <a href={`https://sepolia.basescan.org/tx/${tx.txHash}`} target="_blank" rel="noopener noreferrer">
                                            View on Basescan
                                            <ExternalLink className="ml-2 h-3 w-3" />
                                        </a>
                                    </Button>
                                )}
                            </TableCell>
                        </TableRow>
                     ))}
                </TableBody>
            </Table>
         </Card>
       </div>

    </div>
  );
}
