import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase 설정
// 실제 사용 시 환경변수로 관리하세요
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "demo-api-key",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "demo.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "demo-project",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "demo.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "demo-app-id"
};

// Firebase 앱 초기화 (이미 초기화되어 있으면 재사용)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Firestore 인스턴스
export const db = getFirestore(app);

export default app;
