import React, { useState, useCallback } from "react";
import { Header } from "./Header";
import { ImageUploader } from "./ImageUploader";
import { PromptInput } from "./PromptInput";
import { Button } from "./Button";
import { ResultDisplay } from "./ResultDisplay";
import { Spinner } from "./Spinner";
import { Icon } from "./Icon";
import type { UploadedImage, GeneratedContent } from "../types";

const App: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null);
  const [prompt, setPrompt] = useState("");
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle uploading image
  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedImage({
        base64: (reader.result as string).split(",")[1],
        mimeType: file.type,
        previewUrl: URL.createObjectURL(file),
      });
    };
    reader.readAsDataURL(file);
    setGeneratedContent(null);
    setError(null);
  };

  // Handle Generate button
  const handleSubmit = useCallback(async () => {
    if (!uploadedImage || !prompt) {
      setError("Please upload an image and provide a prompt.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedContent(null);

    try {
      const response = await fetch("http://localhost:4000/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          base64: uploadedImage.base64,
          mimeType: uploadedImage.mimeType,
          prompt,
        }),
      });

      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setGeneratedContent(data);
      }
    } catch (err) {
      setError("Failed to communicate with server.");
    } finally {
      setIsLoading(false);
    }
  }, [uploadedImage, prompt]);

  // Handle Clear button
  const handleClear = () => {
    setUploadedImage(null);
    setPrompt("");
    setGeneratedContent(null);
    setError(null);
    setIsLoading(false);
  };

  const isGenerateDisabled = !uploadedImage || !prompt || isLoading;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans antialiased">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-2xl border border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Left side: uploader + prompt */}
            <div className="flex flex-col space-y-6">
              <ImageUploader
                onImageUpload={handleImageUpload}
                uploadedImagePreview={uploadedImage?.previewUrl || null}
              />
              <PromptInput
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                disabled={isLoading}
              />
            </div>

            {/* Right side: result + actions */}
            <div className="flex flex-col justify-between space-y-6">
              <div className="h-full">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center h-full bg-gray-900/50 rounded-lg p-4">
                    <Spinner />
                    <p className="mt-4 text-lg text-fuchsia-400 animate-pulse">
                      Designing your masterpiece...
                    </p>
                    <p className="mt-2 text-sm text-gray-400">
                      This can take a moment.
                    </p>
                  </div>
                ) : (
                  <ResultDisplay generatedContent={generatedContent} />
                )}
              </div>

              <div className="flex flex-col space-y-3">
                <Button onClick={handleSubmit} disabled={isGenerateDisabled}>
                  <Icon type="sparkle" />
                  Generate Graphic
                </Button>
                <Button onClick={handleClear} variant="secondary" disabled={isLoading}>
                  <Icon type="clear" />
                  Start Over
                </Button>
              </div>
            </div>
          </div>

          {error && (
            <p className="mt-6 text-center text-red-400 bg-red-900/50 p-3 rounded-lg">
              {error}
            </p>
          )}
        </div>

        <footer className="text-center mt-8 text-gray-500 text-sm">
          <p>Powered by Gemini API. Created for demonstration purposes.</p>
        </footer>
      </main>
    </div>
  );
};

export default App;

