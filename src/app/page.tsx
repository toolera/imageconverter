'use client';

import { useState, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [convertedImage, setConvertedImage] = useState<string | null>(null);
  const [targetFormat, setTargetFormat] = useState<'jpeg' | 'png'>('png');
  const [isConverting, setIsConverting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      setSelectedFile(file);
      setConvertedImage(null);
    }
  };

  const convertImage = async () => {
    if (!selectedFile) return;

    setIsConverting(true);
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new window.Image();

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);

        const quality = targetFormat === 'jpeg' ? 0.9 : undefined;
        const mimeType = targetFormat === 'jpeg' ? 'image/jpeg' : 'image/png';
        const dataUrl = canvas.toDataURL(mimeType, quality);
        setConvertedImage(dataUrl);
        setIsConverting(false);
      };

      img.src = URL.createObjectURL(selectedFile);
    } catch (error) {
      console.error('Conversion failed:', error);
      setIsConverting(false);
    }
  };

  const downloadImage = () => {
    if (!convertedImage || !selectedFile) return;

    const link = document.createElement('a');
    link.href = convertedImage;
    const fileName = selectedFile.name.replace(/\.[^/.]+$/, `.${targetFormat}`);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetConverter = () => {
    setSelectedFile(null);
    setConvertedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Image Format Converter",
    "description": "Free online image format converter. Convert between JPEG and PNG formats instantly in your browser.",
    "url": "https://imageconverter.vercel.app",
    "applicationCategory": "Multimedia",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Convert JPEG to PNG",
      "Convert PNG to JPEG", 
      "Client-side processing",
      "No file upload required",
      "Mobile responsive"
    ]
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
            Image Format Converter
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Convert your images between JPEG and PNG formats instantly. Fast, secure, and works entirely in your browser.
          </p>
        </header>

        <main className="space-y-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8">
            <div className="space-y-6">
              <div className="text-center">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="inline-flex items-center justify-center px-6 py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 transition-colors bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  <svg className="w-8 h-8 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Choose an image file (JPEG or PNG)
                  </span>
                </label>
              </div>

              {selectedFile && (
                <div className="space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Selected: <span className="font-medium">{selectedFile.name}</span>
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                    <div className="flex items-center space-x-4">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Convert to:
                      </label>
                      <select
                        value={targetFormat}
                        onChange={(e) => setTargetFormat(e.target.value as 'jpeg' | 'png')}
                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="png">PNG</option>
                        <option value="jpeg">JPEG</option>
                      </select>
                    </div>

                    <button
                      onClick={convertImage}
                      disabled={isConverting}
                      className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition-colors flex items-center space-x-2"
                    >
                      {isConverting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Converting...
                        </>
                      ) : (
                        'Convert Image'
                      )}
                    </button>
                  </div>
                </div>
              )}

              {convertedImage && (
                <div className="space-y-4">
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
                      Converted Image
                    </h3>
                    <div className="flex flex-col items-center space-y-4">
                      <div className="max-w-sm">
                        <Image
                          src={convertedImage}
                          alt="Converted"
                          width={500}
                          height={300}
                          className="max-w-full h-auto rounded-lg shadow-md"
                          unoptimized
                        />
                      </div>
                      <div className="flex space-x-4">
                        <button
                          onClick={downloadImage}
                          className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors flex items-center space-x-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          <span>Download</span>
                        </button>
                        <button
                          onClick={resetConverter}
                          className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors"
                        >
                          Convert Another
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Lightning Fast</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Convert images instantly in your browser without uploading to servers</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">100% Secure</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Your images never leave your device. Complete privacy guaranteed</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Mobile Friendly</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Works perfectly on all devices - desktop, tablet, and mobile</p>
            </div>
          </div>
        </main>

        <footer className="text-center mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            © 2024 Image Format Converter. Convert images securely in your browser.
          </p>
        </footer>
      </div>
    </div>
    </>
  );
}
