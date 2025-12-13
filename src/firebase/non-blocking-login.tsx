'use client';
import {
  Auth,
  signInAnonymously,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  FirebaseError,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { getSdks } from '@/firebase';
import { toast } from '@/hooks/use-toast';

/** Initiate anonymous sign-in (non-blocking). */
export function initiateAnonymousSignIn(authInstance: Auth): void {
  signInAnonymously(authInstance).catch((error: FirebaseError) => {
    toast({
      variant: 'destructive',
      title: 'Sign-in Failed',
      description: 'Could not sign in anonymously. Please try again later.',
    });
  });
}

/** Initiate email/password sign-up (non-blocking). */
export function initiateEmailSignUp(authInstance: Auth, email: string, password: string, fullName: string): void {
  createUserWithEmailAndPassword(authInstance, email, password)
    .then((userCredential) => {
        const { firestore } = getSdks(authInstance.app);
        const userDocRef = doc(firestore, 'users', userCredential.user.uid);
        
        // Create a user profile document in Firestore
        setDoc(userDocRef, {
            id: userCredential.user.uid,
            name: fullName,
            email: email,
            role: null, // Role will be set during onboarding
            createdAt: new Date().toISOString(),
        });
    })
    .catch((error: FirebaseError) => {
    let description = 'An unexpected error occurred. Please try again.';
    if (error.code === 'auth/email-already-in-use') {
      description = 'This email is already registered. Please log in.';
    } else if (error.code === 'auth/weak-password') {
      description = 'The password is too weak. Please use at least 6 characters.';
    } else if (error.code === 'auth/invalid-email') {
        description = 'The email address is not valid.';
    }
    toast({
      variant: 'destructive',
      title: 'Sign-up Failed',
      description: description,
    });
  });
}

/** Initiate email/password sign-in (non-blocking). */
export function initiateEmailSignIn(authInstance: Auth, email: string, password: string): void {
  signInWithEmailAndPassword(authInstance, email, password)
    .then((userCredential) => {
        // Post-login logic can be handled by onAuthStateChanged listener
    })
    .catch((error: FirebaseError) => {
    let description = 'An unexpected error occurred. Please try again.';
    if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
      description = 'Invalid email or password. Please check your credentials.';
    }
     else if (error.code === 'auth/invalid-email') {
        description = 'The email address is not valid.';
    }
    toast({
      variant: 'destructive',
      title: 'Log-in Failed',
      description: description,
    });
  });
}
