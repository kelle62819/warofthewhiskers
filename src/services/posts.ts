import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { deletePostImage } from './storage';

const postsRef = collection(db, 'posts');

export async function addPost(post: {
  text: string;
  imageUrl: string | null;
  imagePath: string | null;
}) {
  return addDoc(postsRef, {
    ...post,
    timestamp: serverTimestamp(),
  });
}

export async function deletePost(postId: string, imagePath: string | null) {
  if (imagePath) {
    await deletePostImage(imagePath);
  }
  return deleteDoc(doc(db, 'posts', postId));
}
