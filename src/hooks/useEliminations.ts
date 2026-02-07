import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';
import type { Elimination } from '../types';

export function useEliminations() {
  const [eliminations, setEliminations] = useState<Elimination[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'eliminations'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate() ?? new Date(),
      })) as Elimination[];
      setEliminations(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return { eliminations, loading };
}
