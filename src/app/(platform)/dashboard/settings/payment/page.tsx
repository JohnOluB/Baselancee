'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function PaymentSettingsPage() {
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
                     <div className="flex justify-start">
                        <ConnectButton />
                    </div>
                </CardContent>
                <CardFooter>
                     <p className="text-xs text-muted-foreground">To change your primary wallet, please disconnect the current one and connect a new one using the button above.</p>
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
