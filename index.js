import { useState } from "react";

export default function Home() {
  const [textPrompt, setTextPrompt] = useState("");
  const [textResponse, setTextResponse] = useState("");
  const [imagePrompt, setImagePrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleTextSubmit = async () => {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: textPrompt }),
    });
    const data = await res.json();
    setTextResponse(data.result);
  };

  const handleImageSubmit = async () => {
    const res = await fetch("/api/image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: imagePrompt }),
    });
    const data = await res.json();
    setImageUrl(data.url);
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Gemini AI</h1>

      {/* Text Chat */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Text Chat</h2>
        <textarea
          className="w-full border p-2 mb-2"
          rows={3}
          value={textPrompt}
          onChange={(e) => setTextPrompt(e.target.value)}
        />
        <button
          onClick={handleTextSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Send
        </button>
        <div className="mt-2 p-2 border rounded bg-gray-100">
          {textResponse || "AI response will appear here..."}
        </div>
      </div>

      {/* Image Generation */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Image Generation</h2>
        <input
          type="text"
          placeholder="Describe your image"
          className="w-full border p-2 mb-2"
          value={imagePrompt}
          onChange={(e) => setImagePrompt(e.target.value)}
        />
        <button
          onClick={handleImageSubmit}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Generate Image
        </button>
        {imageUrl && (
          <div className="mt-2">
            <img src={imageUrl} alt="AI Generated" className="rounded" />
          </div>
        )}
      </div>

      {/* Video Placeholder */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Video Upload</h2>
        <p className="text-gray-500">Coming soon...</p>
      </div>
    </div>
  );
            }
