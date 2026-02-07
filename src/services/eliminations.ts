import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase/config';

const eliminationsRef = collection(db, 'eliminations');

export async function addElimination(elimination: {
  trapId: string;
  notes: string;
}) {
  return addDoc(eliminationsRef, {
    ...elimination,
    timestamp: serverTimestamp(),
  });
}

export async function deleteElimination(eliminationId: string) {
  return deleteDoc(doc(db, 'eliminations', eliminationId));
}
