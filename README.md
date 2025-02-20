# VisionScribe

VisionScribe is an AI-powered tool that instantly generates accurate and meaningful image captions. Using deep learning, it analyzes images and creates context-aware descriptions, making content more accessible and engaging.

### Built with:

- [Next.js](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Hugging Face API](https://huggingface.co) – Free image captioning model

## Project Features

- Upload Image – Drag & drop or file input
- AI Analysis – Hugging Face API generates a caption
- Show Result – Display image + AI-generated caption
- Copy or Share Caption

## Installation

Clone and run yarn install to install the dependencies.

```bash
yarn install
```

Add the necessary `env.local` variables:

```
HUGGING_FACE_API_KEY={HUGGING_FACE_API_KEY}
```

## Start Locally

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3060](http://localhost:3060) with your browser to see the result.
