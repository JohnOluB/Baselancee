
'use client';
import { useState } from 'react';
import {
  Wallet,
  Lock,
  Trophy,
  Clock,
  Banknote,
  Copy,
  CheckCircle,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const chartData = [
  { name: 'Jan', earnings: 4000 },
  { name: 'Feb', earnings: 3000 },
  { name: 'Mar', earnings: 5000 },
  { name: 'Apr', earnings: 4500 },
  { name: 'May', earnings: 6000 },
  { name: 'Jun', earnings: 5500 },
];

function BankWithdrawalForm() {
  const [amount, setAmount] = useState('1000');
  const [accountNumber, setAccountNumber] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const handleVerifyAccount = () => {
    // Simulate API call to verify account
    if (accountNumber.length === 10) {
      setIsVerified(true);
    } else {
      setIsVerified(false);
    }
  };

  const fee = 0.005;
  const exchangeRate = 1580;
  const amountNumber = parseFloat(amount) || 0;
  const withdrawalFee = amountNumber * exchangeRate * fee;
  const total = amountNumber * exchangeRate - withdrawalFee;

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="bank-amount">Amount to Withdraw</Label>
        <div className="relative mt-1">
          <Input
            id="bank-amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="1000"
            className="pr-24"
          />
          <div className="absolute inset-y-0 right-0 flex items-center">
            <span className="pr-3 text-muted-foreground">USDC</span>
            <Button
              variant="ghost"
              className="h-full rounded-l-none border-l"
              onClick={() => setAmount('1234.56')}
            >
              Max
            </Button>
          </div>
        </div>
      </div>
      <div className="p-4 rounded-md border bg-muted/50 text-sm space-y-2">
        <div className="flex justify-between">
          <span>Amount:</span>
          <span>{amountNumber.toFixed(2)} USDC</span>
        </div>
        <div className="flex justify-between">
          <span>Exchange Rate:</span>
          <span>1 USDC = {exchangeRate} NGN</span>
        </div>
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>{(amountNumber * exchangeRate).toLocaleString()} NGN</span>
        </div>
        <div className="flex justify-between">
          <span>Withdrawal Fee (0.5%):</span>
          <span className="text-destructive">
            -{withdrawalFee.toLocaleString()} NGN
          </span>
        </div>
        <Separator />
        <div className="flex justify-between font-bold">
          <span>You'll Receive:</span>
          <span>{total.toLocaleString()} NGN</span>
        </div>
      </div>
      <div>
        <Label htmlFor="bank-name">Bank Name</Label>
        <Select>
          <SelectTrigger id="bank-name">
            <SelectValue placeholder="Select a bank" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="gtbank">Guaranty Trust Bank</SelectItem>
            <SelectItem value="zenith">Zenith Bank</SelectItem>
            <SelectItem value="firstbank">First Bank</SelectItem>
            <SelectItem value="access">Access Bank</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="account-number">Account Number</Label>
        <div className="flex gap-2">
          <Input
            id="account-number"
            value={accountNumber}
            onChange={(e) => {
              setAccountNumber(e.target.value);
              setIsVerified(false);
            }}
            placeholder="Enter your 10-digit account number"
          />
          <Button variant="outline" onClick={handleVerifyAccount}>
            Verify
          </Button>
        </div>
      </div>
      {isVerified && (
        <div className="text-sm font-medium text-green-600 flex items-center gap-2">
          <CheckCircle className="h-4 w-4" />
          <span>Verified: JOHN DOE</span>
        </div>
      )}
    </div>
  );
}

function CryptoWithdrawalForm() {
    const [amount, setAmount] = useState('1000');
    const networkFee = 0.01;
    const amountNumber = parseFloat(amount) || 0;
    const total = amountNumber - networkFee;

  return (
    <div className="space-y-6">
       <div>
        <Label htmlFor="crypto-amount">Amount to Withdraw</Label>
        <div className="relative mt-1">
          <Input
            id="crypto-amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="1000"
            className="pr-24"
          />
          <div className="absolute inset-y-0 right-0 flex items-center">
            <span className="pr-3 text-muted-foreground">USDC</span>
            <Button
              variant="ghost"
              className="h-full rounded-l-none border-l"
              onClick={() => setAmount('1234.56')}
            >
              Max
            </Button>
          </div>
        </div>
      </div>
       <div>
        <Label htmlFor="destination-address">Destination Address</Label>
        <Input id="destination-address" placeholder="0x..." />
        <p className='text-xs text-orange-500 mt-2'>⚠️ Ensure this is a Base network address.</p>
      </div>
        <div className="p-4 rounded-md border bg-muted/50 text-sm space-y-2">
            <div className="flex justify-between">
                <span>Amount:</span>
                <span>{amountNumber.toFixed(2)} USDC</span>
            </div>
            <div className="flex justify-between">
                <span>Network Fee:</span>
                <span className="text-destructive">~{networkFee.toFixed(2)} USDC</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold">
                <span>You'll Receive:</span>
                <span>{total.toFixed(2)} USDC</span>
            </div>
      </div>
    </div>
  );
}

function WithdrawModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleWithdraw = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000)); // simulate API call
    setIsLoading(false);
    setIsSuccess(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    // Reset state after a delay to allow for animations
    setTimeout(() => {
        setIsSuccess(false);
        setIsLoading(false);
    }, 300);
  }

  if(isSuccess) {
      return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent>
                <div className="text-center py-8">
                    <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle className="h-8 w-8 text-green-600" />
                        </div>
                    </div>
                    <DialogTitle className="text-2xl">Withdrawal Successful!</DialogTitle>
                    <DialogDescription className="mt-2">
                        1,572,100 NGN is on its way to your bank account.
                    </DialogDescription>
                     <p className="text-sm text-muted-foreground mt-4">Transaction ID: TXN-123456789</p>
                    <p className="text-sm text-muted-foreground">Expected arrival: 5-10 minutes</p>
                    <div className="mt-6 flex flex-col gap-2">
                        <Button variant="outline">View Transaction Details</Button>
                        <Button onClick={handleClose}>Done</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
      )
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Withdraw</Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Withdraw Funds</DialogTitle>
          <DialogDescription>
            Select a method to withdraw your available balance.
          </DialogDescription>
        </DialogHeader>
        <div className="py-6">
          <Tabs defaultValue="bank">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="bank">Bank Account</TabsTrigger>
              <TabsTrigger value="crypto">Crypto Wallet</TabsTrigger>
            </TabsList>
            <div className="pt-6">
              <TabsContent value="bank">
                <BankWithdrawalForm />
              </TabsContent>
              <TabsContent value="crypto">
                <CryptoWithdrawalForm />
              </TabsContent>
            </div>
          </Tabs>
        </div>
        <div className="space-y-4 pt-6 border-t">
          <div className="space-y-2">
            <Label htmlFor="password">Security Verification</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your account password"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="save-method" />
            <Label htmlFor="save-method" className="font-normal">
              Save this withdrawal method for future use
            </Label>
          </div>
        </div>
        <DialogFooter className="pt-6">
          <Button variant="ghost" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleWithdraw} disabled={isLoading}>
            {isLoading ? 'Processing...' : 'Withdraw Funds'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function EarningsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Earnings</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Available Balance
            </CardTitle>
            <Wallet className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234.56 USDC</div>
            <p className="text-xs text-muted-foreground">$1,234.56 USD</p>
            <div className="mt-4">
              <WithdrawModal />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Escrow</CardTitle>
            <Lock className="h-5 w-5 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">600.00 USDC</div>
            <p className="text-xs text-muted-foreground">From 3 active jobs</p>
            <Button variant="link" size="sm" className="p-0 h-auto text-xs mt-4">
              View Details
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Lifetime Earnings
            </CardTitle>
            <Trophy className="h-5 w-5 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4,560.12 USDC</div>
            <p className="text-xs text-muted-foreground">
              Across 28 completed jobs
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Clearance
            </CardTitle>
            <Clock className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">150.00 USDC</div>
            <p className="text-xs text-muted-foreground">
              Available in 2 days
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Earnings Over Time</CardTitle>
          <CardDescription>
            Your earnings for the last 6 months.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="earnings" fill="hsl(var(--primary))" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
