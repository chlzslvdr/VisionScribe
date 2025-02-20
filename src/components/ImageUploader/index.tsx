import { useState } from "react";
import { ClipboardIcon, CheckIcon } from "@heroicons/react/24/outline";

export default function ImageUploader() {
  const [image, setImage] = useState<File | null>(null);
  const [caption, setCaption] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Invalid file type. Please upload an image.");
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      setError("File size exceeds 15MB limit.");
      return;
    }

    setError(null);
    setImage(file);
    setCaption(null);
  };

  const generateCaption = async () => {
    if (!image) return;

    setLoading(true);
    setCaption(null);
    setError(null);

    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = async () => {
      try {
        let base64String = reader.result as string;
        base64String = base64String.replace(/^data:image\/\w+;base64,/, "");

        const response = await fetch("/api/caption", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: base64String }),
        });

        if (!response.ok) {
          throw new Error("Failed to generate caption.");
        }

        const data = await response.json();
        setCaption(data.caption || "No caption generated.");
      } catch (error) {
        setError("Something went wrong. Try again.");
      } finally {
        setLoading(false);
      }
    };
  };

  const copyToClipboard = () => {
    if (caption) {
      navigator.clipboard.writeText(caption);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6 bg-white rounded-xl shadow-lg w-full max-w-lg">
      <h2 className="text-2xl font-semibold text-gray-800">Upload an Image</h2>

      <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 border border-blue-700 rounded-lg shadow-sm hover:bg-blue-700 transition">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
        Choose File
      </label>

      {image && (
        <div className="flex flex-col items-center gap-3">
          <img
            src={URL.createObjectURL(image)}
            alt="Uploaded preview"
            className="w-64 h-auto rounded-lg shadow-md"
          />
          <button
            onClick={generateCaption}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Caption"}
          </button>
        </div>
      )}

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {caption && (
        <div className="flex items-center gap-2 bg-gray-50 p-4 rounded-lg shadow-md w-full">
          <p className="text-gray-800 text-lg font-medium flex-1">{caption}</p>
          <button
            onClick={copyToClipboard}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            {copied ? (
              <CheckIcon className="w-5 h-5 text-green-600" />
            ) : (
              <ClipboardIcon className="w-5 h-5" />
            )}
          </button>
        </div>
      )}
    </div>
  );
}
