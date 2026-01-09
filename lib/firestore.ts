import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  onSnapshot,
  updateDoc,
  doc,
  Timestamp,
  where
} from 'firebase/firestore';
import { db } from './firebase';

export interface CartItem {
  id: number;
  name: { ko: string; en: string };
  price: string;
  quantity: number;
  image?: string;
}

export interface Order {
  id?: string;
  tableNumber: string;
  branchId: string;
  items: CartItem[];
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'completed';
  timestamp: Timestamp;
}

// 주문 생성
export const createOrder = async (orderData: Omit<Order, 'id' | 'timestamp'>) => {
  try {
    const ordersRef = collection(db, 'orders');
    const docRef = await addDoc(ordersRef, {
      ...orderData,
      timestamp: Timestamp.now()
    });
    return { success: true, orderId: docRef.id };
  } catch (error) {
    console.error('주문 생성 실패:', error);
    return { success: false, error };
  }
};

// 모든 주문 가져오기
export const getOrders = async () => {
  try {
    const ordersRef = collection(db, 'orders');
    const q = query(ordersRef, orderBy('timestamp', 'desc'));
    const querySnapshot = await getDocs(q);

    const orders: Order[] = [];
    querySnapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() } as Order);
    });

    return orders;
  } catch (error) {
    console.error('주문 조회 실패:', error);
    return [];
  }
};

// 실시간 주문 구독
export const subscribeToOrders = (
  callback: (orders: Order[]) => void,
  statusFilter?: string
) => {
  const ordersRef = collection(db, 'orders');
  let q = query(ordersRef, orderBy('timestamp', 'desc'));

  if (statusFilter && statusFilter !== 'all') {
    q = query(ordersRef, where('status', '==', statusFilter), orderBy('timestamp', 'desc'));
  }

  return onSnapshot(q, (snapshot) => {
    const orders: Order[] = [];
    snapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() } as Order);
    });
    callback(orders);
  });
};

// 주문 상태 업데이트
export const updateOrderStatus = async (orderId: string, status: Order['status']) => {
  try {
    const orderRef = doc(db, 'orders', orderId);
    await updateDoc(orderRef, { status });
    return { success: true };
  } catch (error) {
    console.error('주문 상태 업데이트 실패:', error);
    return { success: false, error };
  }
};
