import { useState } from 'react';
import { format } from 'date-fns';
import type { Post } from '../../types';
import { deletePost } from '../../services/posts';

export default function PostCard({ post }: { post: Post }) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [expanded, setExpanded] = useState(false);

  async function handleDelete() {
    await deletePost(post.id, post.imagePath);
  }

  return (
    <div className="bg-war-surface border border-war-border rounded-lg overflow-hidden">
      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt=""
          className={`w-full object-cover cursor-pointer transition-all ${
            expanded ? 'max-h-none' : 'max-h-64'
          }`}
          onClick={() => setExpanded(!expanded)}
        />
      )}
      <div className="p-4">
        <p className="text-war-text text-sm whitespace-pre-wrap">{post.text}</p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-war-text-dim text-xs">
            {format(post.timestamp, 'MMM d, yyyy h:mm a')}
          </span>
          {!confirmDelete ? (
            <button
              onClick={() => setConfirmDelete(true)}
              className="text-war-text-dim hover:text-war-red text-xs transition-colors"
            >
              Delete
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleDelete}
                className="text-war-red text-xs font-semibold"
              >
                Confirm
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                className="text-war-text-dim text-xs"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
