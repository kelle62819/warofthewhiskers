import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../firebase/config';

export async function uploadPostImage(file: File): Promise<{ url: string; path: string }> {
  const path = `post-images/${Date.now()}_${file.name}`;
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return { url, path };
}

export async function deletePostImage(path: string) {
  const storageRef = ref(storage, path);
  await deleteObject(storageRef);
}
