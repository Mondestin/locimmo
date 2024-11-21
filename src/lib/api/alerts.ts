import { collection, doc, addDoc, updateDoc, deleteDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';

const COLLECTION = 'alerts';

export interface Alert {
  id?: string;
  key_id: string;
  alert_date: string;
  description: string;
  status: 'Pending' | 'Dismissed';
  created_at?: string;
  updated_at?: string;
}

export async function getAlerts() {
  const querySnapshot = await getDocs(collection(db, COLLECTION));
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Alert[];
}

export async function getAlertsByKey(keyId: string) {
  const q = query(collection(db, COLLECTION), where('key_id', '==', keyId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Alert[];
}

export async function addAlert(data: Omit<Alert, 'id'>) {
  return addDoc(collection(db, COLLECTION), {
    ...data,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  });
}

export async function updateAlert(id: string, data: Partial<Alert>) {
  const docRef = doc(db, COLLECTION, id);
  return updateDoc(docRef, {
    ...data,
    updated_at: new Date().toISOString()
  });
}

export async function deleteAlert(id: string) {
  const docRef = doc(db, COLLECTION, id);
  return deleteDoc(docRef);
}