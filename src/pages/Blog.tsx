import { useState } from 'react';
import { usePosts } from '../hooks/usePosts';
import PostForm from '../components/posts/PostForm';
import PostCard from '../components/posts/PostCard';

export default function Blog() {
  const { posts, loading } = usePosts();
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-[family-name:var(--font-stencil)] text-2xl text-war-red">Field Dispatches</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-war-red hover:bg-war-red-glow text-white px-4 py-2 rounded text-sm font-semibold transition-colors"
        >
          {showForm ? 'Cancel' : '+ New Dispatch'}
        </button>
      </div>

      {showForm && <PostForm onDone={() => setShowForm(false)} />}

      {loading ? (
        <p className="text-war-text-dim text-center py-8">Loading dispatches...</p>
      ) : posts.length === 0 ? (
        <div className="text-center py-12 text-war-text-dim">
          <p className="text-lg mb-2">No dispatches yet</p>
          <p className="text-sm">Send your first field report.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
