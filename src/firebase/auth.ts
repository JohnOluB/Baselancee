
'use client';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from './config';

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    // You can now access user details like user.displayName, user.email, etc.
    return user;
  } catch (error) {
    console.error('Error signing in with Google:', error);
    return null;
  }
};
