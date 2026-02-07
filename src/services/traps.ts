import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase/config';
import type { TrapType } from '../types';

const trapsRef = collection(db, 'traps');

export async function addTrap(trap: {
  name: string;
  type: TrapType;
  location: string;
  baitType: string;
  notes: string;
}) {
  return addDoc(trapsRef, {
    ...trap,
    isActive: true,
    dateAdded: serverTimestamp(),
  });
}

export async function updateTrap(
  trapId: string,
  data: Partial<{
    name: string;
    type: TrapType;
    location: string;
    baitType: string;
    isActive: boolean;
    notes: string;
  }>
) {
  return updateDoc(doc(db, 'traps', trapId), data);
}

export async function deleteTrap(trapId: string) {
  return deleteDoc(doc(db, 'traps', trapId));
}
