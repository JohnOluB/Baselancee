// src/app/api/auth/get-nonce/route.ts
import { NextResponse } from 'next/server';
import { randomBytes } from 'crypto';

export async function POST(request: Request) {
  try {
    const { walletAddress } = await request.json();

    if (!walletAddress) {
      return NextResponse.json({ error: 'Wallet address is required' }, { status: 400 });
    }

    // In a real application, you would store this nonce in your database
    // associated with the user's wallet address to prevent replay attacks.
    const nonce = randomBytes(32).toString('hex');

    return NextResponse.json({ nonce });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate nonce' },
      { status: 500 }
    );
  }
}
