import { useRef } from 'react';

export default function ImageUpload({
  preview,
  onFileSelect,
  onClear,
}: {
  preview: string | null;
  onFileSelect: (file: File) => void;
  onClear: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  }

  return (
    <div>
      {preview ? (
        <div className="relative">
          <img
            src={preview}
            alt="Preview"
            className="w-full max-h-48 object-cover rounded border border-war-border"
          />
          <button
            type="button"
            onClick={() => {
              onClear();
              if (inputRef.current) inputRef.current.value = '';
            }}
            className="absolute top-2 right-2 bg-war-bg/80 text-war-text-dim hover:text-war-red rounded-full w-6 h-6 flex items-center justify-center text-xs"
          >
            X
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="w-full border border-dashed border-war-border rounded px-4 py-3 text-war-text-dim text-sm hover:border-war-amber hover:text-war-amber transition-colors"
        >
          + Add Photo
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />
    </div>
  );
}
