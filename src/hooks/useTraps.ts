import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';
import type { Trap } from '../types';

export function useTraps() {
  const [traps, setTraps] = useState<Trap[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'traps'), orderBy('dateAdded', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        dateAdded: doc.data().dateAdded?.toDate() ?? new Date(),
      })) as Trap[];
      setTraps(data);
      setLoading(false);
    }, (err) => {
      console.error('useTraps error:', err);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return { traps, loading };
}
