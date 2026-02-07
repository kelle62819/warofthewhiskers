import { useState } from 'react';
import { addPost } from '../../services/posts';
import { uploadPostImage } from '../../services/storage';
import ImageUpload from './ImageUpload';

export default function PostForm({ onDone }: { onDone: () => void }) {
  const [text, setText] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function handleFileSelect(f: File) {
    setFile(f);
    setPreview(URL.createObjectURL(f));
  }

  function handleClearImage() {
    if (preview) URL.revokeObjectURL(preview);
    setFile(null);
    setPreview(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;

    setSubmitting(true);
    try {
      let imageUrl: string | null = null;
      let imagePath: string | null = null;

      if (file) {
        const result = await uploadPostImage(file);
        imageUrl = result.url;
        imagePath = result.path;
      }

      await addPost({ text: text.trim(), imageUrl, imagePath });
      setText('');
      handleClearImage();
      onDone();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-war-surface border border-war-border rounded-lg p-4 mb-6">
      <h3 className="font-[family-name:var(--font-stencil)] text-war-amber text-lg mb-3">New Dispatch</h3>
      <textarea
        className="w-full bg-war-bg border border-war-border rounded px-3 py-2 text-war-text text-sm focus:outline-none focus:border-war-amber resize-y min-h-20"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Report from the field..."
        rows={3}
        required
      />
      <div className="mt-3">
        <ImageUpload preview={preview} onFileSelect={handleFileSelect} onClear={handleClearImage} />
      </div>
      <div className="flex gap-3 mt-3">
        <button
          type="submit"
          disabled={submitting || !text.trim()}
          className="bg-war-red hover:bg-war-red-glow text-white px-4 py-2 rounded text-sm font-semibold transition-colors disabled:opacity-50"
        >
          {submitting ? 'Transmitting...' : 'Send Dispatch'}
        </button>
        <button
          type="button"
          onClick={onDone}
          className="text-war-text-dim hover:text-war-text px-4 py-2 rounded text-sm transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
