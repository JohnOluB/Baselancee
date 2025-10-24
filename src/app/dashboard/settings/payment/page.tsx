
'use client';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Wallet, CheckCircle, CreditCard, Pencil, Trash2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function PaymentSettingsPage() {
    const [connectedWallet, setConnectedWallet] = useState('0x1234...5678');

    const handleDisconnect = () => {
        setConnectedWallet('');
    };

    const handleConnect = () => {
        // In a real app, this would trigger the wallet connection flow
        setConnectedWallet('0x1234...5678');
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold">Payment Methods</h1>
                <p className="text-muted-foreground">Manage your connected wallets and billing details.</p>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>Connected Wallet</CardTitle>
                    <CardDescription>This is your primary wallet for receiving payments and interacting with the platform.</CardDescription>
                </CardHeader>
                <CardContent>
                    {connectedWallet ? (
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg bg-muted/50">
                            <div className="flex items-center gap-4">
                                <Wallet className="h-8 w-8 text-primary" />
                                <div>
                                    <p className="font-mono font-semibold text-lg">{connectedWallet}</p>
                                    <div className="flex items-center gap-2">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                        </span>
                                        <p className="text-sm text-muted-foreground">Connected on Base Network</p>
                                    </div>
                                </div>
                            </div>
                            <Button variant="destructive" className="mt-4 sm:mt-0" onClick={handleDisconnect}>Disconnect</Button>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg">
                            <p className="text-muted-foreground mb-4">No wallet connected.</p>
                            <Button onClick={handleConnect}>
                                <Wallet className="mr-2 h-4 w-4" />
                                Connect Wallet
                            </Button>
                        </div>
                    )}
                </CardContent>
                <CardFooter>
                     <p className="text-xs text-muted-foreground">To change your primary wallet, please disconnect the current one and connect a new one.</p>
                </CardFooter>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Preferences</CardTitle>
                    <CardDescription>Manage your default currency settings.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="currency">Default Currency</Label>
                        <Select defaultValue="usdc">
                            <SelectTrigger className="w-full md:w-[280px]">
                                <SelectValue placeholder="Select a currency" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="usdc">USDC (USD Coin)</SelectItem>
                                <SelectItem value="usdt">USDT (Tether)</SelectItem>
                                <SelectItem value="dai">DAI (Dai Stablecoin)</SelectItem>
                            </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground">This currency will be used for displaying balances and setting rates across the platform.</p>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button>Save Preferences</Button>
                </CardFooter>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Billing Address</CardTitle>
                    <CardDescription>This address is used for invoices and tax purposes. It will not be shared publicly.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div className="space-y-2">
                            <Label htmlFor="country">Country</Label>
                             <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select country" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="us">United States</SelectItem>
                                    <SelectItem value="ca">Canada</SelectItem>
                                    <SelectItem value="ng">Nigeria</SelectItem>
                                     <SelectItem value="gb">United Kingdom</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="address">Address Line 1</Label>
                            <Input id="address" placeholder="123 Main St" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input id="city" placeholder="San Francisco" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="state">State / Province</Label>
                            <Input id="state" placeholder="California" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="zip">ZIP / Postal Code</Label>
                            <Input id="zip" placeholder="94103" />
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button>Save Billing Address</Button>
                </CardFooter>
            </Card>
        </div>
    );
}
