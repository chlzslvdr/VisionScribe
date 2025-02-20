import Head from "next/head";
import ImageUploader from "@components/ImageUploader";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 px-6">
      <Head>
        <title>VisionScribe | AI-Powered Image Captioning</title>
        <meta name="description" content="AI Image Captioning" />
        <meta property="og:title" content="AI Image Captioning" />
        <meta
          property="og:description"
          content="Upload an image and get an AI-generated caption instantly."
        />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">
        VisionScribe
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl text-center">
        Upload an image and let AI generate a meaningful caption instantly.
      </p>

      <div className="mt-8 w-full max-w-xl">
        <ImageUploader />
      </div>

      <footer className="mt-10 text-gray-500 text-sm">
        Built with ❤️ using Next.js & Hugging Face API
      </footer>
    </div>
  );
}
