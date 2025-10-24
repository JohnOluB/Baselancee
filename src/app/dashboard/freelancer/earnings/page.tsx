
'use client';
import { useState }from 'react';
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
import { connectWallet } from '@/utils/wallet';
import { useToast } from '@/hooks/use-toast';

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
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [isAddressInvalid, setIsAddressInvalid] = useState(false);
  const [recentWithdrawals, setRecentWithdrawals] = useState(initialWithdrawals);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { toast } = useToast();

  const availableBalance = 1234.56;

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAddress = e.target.value;
    setAddress(newAddress);
    const isValid = /^0x[a-fA-F0-9]{40}$/.test(newAddress);
    setIsAddressInvalid(newAddress.length > 0 && !isValid);
  };
  
  const amountNumber = parseFloat(amount) || 0;
  const networkFee = 2.50;
  const finalAmount = amountNumber > networkFee ? amountNumber - networkFee : 0;
  const isWithdrawDisabled = isLoading || isAddressInvalid || amountNumber < 10 || amountNumber > availableBalance;

  const handleWithdraw = async () => {
    if (isWithdrawDisabled) return;

    setIsLoading(true);

    try {
      // Simulate initiating transaction with wallet
      await connectWallet();
      
      // Simulate API call/blockchain transaction confirmation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newWithdrawal = {
          date: new Date().toISOString().replace('T', ' ').slice(0, 16),
          amount: `${amountNumber.toFixed(2)} USDC`,
          address: `${address.slice(0, 6)}...${address.slice(-4)}`,
          status: 'Completed',
          txHash: `0x${[...Array(6)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')}...${[...Array(6)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`
      };

      setRecentWithdrawals([newWithdrawal, ...recentWithdrawals]);
      setShowSuccess(true);
      setAmount('');
      setAddress('');

    } catch (err: any) {
      toast({
        variant: 'destructive',
        title: 'Withdrawal Failed',
        description: err.message || 'Could not complete the withdrawal.',
      });
    } finally {
      setIsLoading(false);
    }
  }

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
                value={address}
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
                    <span className="text-muted-foreground">Network Fee</span>
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
                    Processing...
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

      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
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
                    <p className="text-3xl font-bold">{finalAmount.toFixed(2)} USDC</p>
                    <p className="text-sm text-muted-foreground mt-1">Has been sent to:</p>
                    <p className="text-sm font-medium break-all mt-2">{address}</p>
                </div>
                <DialogFooter className="sm:justify-center">
                    <Button onClick={() => setShowSuccess(false)}>Done</Button>
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
                                <Button variant="outline" size="sm" asChild>
                                    <a href="#" target="_blank" rel="noopener noreferrer">
                                        View on Basescan
                                        <ExternalLink className="ml-2 h-3 w-3" />
                                    </a>
                                </Button>
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
