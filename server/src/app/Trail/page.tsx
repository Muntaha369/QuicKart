"use client";

import { useState } from "react";

export default function ProductUploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [domain, setDomain] = useState("");
  const [subdomain, setSubdomain] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setMessage("Please upload a file.");
      return;
    }

    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("domain", domain);
    formData.append("subdomain", subdomain);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);

    try {
      const res = await fetch("http://localhost:3000/api/Add-Items", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setMessage("✅ Product uploaded successfully!");
        setDomain("");
        setSubdomain("");
        setName("");
        setPrice("");
        setDescription("");
        setFile(null);
      } else {
        setMessage("❌ " + data.message);
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Upload failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg space-y-4"
      >
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Upload Product
        </h1>

        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder="Domain"
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          value={subdomain}
          onChange={(e) => setSubdomain(e.target.value)}
          placeholder="Subdomain"
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product Name"
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          className="w-full border p-2 rounded"
          required
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full border p-2 rounded h-24"
          required
        ></textarea>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload Product"}
        </button>

        {message && (
          <p className="text-center text-sm font-medium mt-2">{message}</p>
        )}
      </form>
    </div>
  );
}
