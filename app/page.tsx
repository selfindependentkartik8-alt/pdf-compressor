"use client";

import { useState } from "react";
import { compress } from "@quicktoolsone/pdf-compress";

type CompressionLevel = "Low" | "Medium" | "High";

const levels: CompressionLevel[] = [
  "Low",
  "Medium",
  "High",
];

function formatSize(bytes: number) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(2)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export default function Home() {
  const [file, setFile] = useState<File | null>(null);

  const [level, setLevel] =
    useState<CompressionLevel>("Medium");

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState<{
    blob: Blob;
    url: string;
    originalSize: number;
    newSize: number;
  } | null>(null);

  const [error, setError] = useState("");

  const reduction =
    result && result.originalSize > 0
      ? Math.max(
          0,
          Math.round(
            ((result.originalSize - result.newSize) /
              result.originalSize) *
              100
          )
        )
      : 0;

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selected = e.target.files?.[0];

    if (!selected) return;

    setError("");
    setResult(null);

    if (selected.type !== "application/pdf") {
      setFile(null);
      setError("Please select a valid PDF file.");
      return;
    }

    setFile(selected);
  };

  const compressPdf = async () => {
    if (!file) {
      setError("Please upload a PDF first.");
      return;
    }

    if (loading) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const presetMap = {
        Low: "lossless",
        Medium: "balanced",
        High: "max",
      } as const;

      const arrayBuffer = await file.arrayBuffer();

      const compressed = await compress(arrayBuffer, {
        preset: presetMap[level],
      });

      if (!compressed?.pdf) {
        throw new Error(
          "Compression failed. Please try another PDF."
        );
      }

      const blob = new Blob([compressed.pdf], {
        type: "application/pdf",
      });

      if (blob.size === 0) {
        throw new Error(
          "The compressed PDF is empty."
        );
      }

      const url = URL.createObjectURL(blob);

      setResult({
        blob,
        url,
        originalSize: file.size,
        newSize: blob.size,
      });
    } catch (err) {
      console.error(
        "PDF compression error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to compress this PDF."
      );
    } finally {
      setLoading(false);
    }
  };

  const downloadPdf = () => {
    if (!result) return;

    const link = document.createElement("a");

    link.href = result.url;

    link.download = file
      ? `${file.name.replace(
          /\.pdf$/i,
          ""
        )}-compressed.pdf`
      : "compressed.pdf";

    document.body.appendChild(link);

    link.click();

    link.remove();
  };

  const clearAll = () => {
    if (result?.url) {
      URL.revokeObjectURL(result.url);
    }

    setFile(null);
    setResult(null);
    setError("");
    setLevel("Medium");
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-gradient-to-b from-[#17140f] via-[#080807] to-black text-white">

      {/* AMBIENT CREAM GLOW */}

      <div className="pointer-events-none absolute left-1/2 top-[-220px] h-[600px] w-[850px] max-w-[100vw] -translate-x-1/2 rounded-full bg-[#fff1d6]/16 blur-[170px]" />

      <div className="pointer-events-none absolute left-[-180px] top-[45%] h-[350px] w-[350px] rounded-full bg-[#fff1d6]/7 blur-[150px]" />

      <div className="pointer-events-none absolute right-[-180px] top-[65%] h-[350px] w-[350px] rounded-full bg-[#fff1d6]/7 blur-[150px]" />

      {/* NAVBAR */}

      <nav className="relative z-20 mx-4 mt-5 rounded-3xl border border-[#fff1d6]/20 bg-black/75 px-4 py-4 shadow-2xl backdrop-blur-2xl sm:mx-auto sm:max-w-6xl sm:px-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex min-w-0 items-center gap-3">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#fff1d6]/30 bg-[#fff1d6]/10">

              <img
                src="/logo.png"
                alt="KrishAIWorks"
                className="h-full w-full rounded-full object-cover"
              />

            </div>

            <div className="min-w-0">

              <h2 className="truncate text-sm font-bold sm:text-base">
                KrishAIWorks
              </h2>

              <p className="text-[10px] text-zinc-500 sm:text-xs">
                AI Solutions That Work
              </p>

            </div>

          </div>

          <div className="hidden items-center gap-7 text-sm text-zinc-300 md:flex">

            <a
              href="#home"
              className="transition hover:text-[#fff1d6]"
            >
              Home
            </a>

            <a
              href="#features"
              className="transition hover:text-[#fff1d6]"
            >
              Features
            </a>

            <a
              href="#how"
              className="transition hover:text-[#fff1d6]"
            >
              How To Use
            </a>

            <a
              href="#faq"
              className="transition hover:text-[#fff1d6]"
            >
              FAQ
            </a>

            <a
              href="https://www.instagram.com/krishaiworks/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#fff1d6] px-5 py-2 font-medium text-black transition hover:bg-white"
            >
              Follow
            </a>

          </div>

          <a
            href="#compressor"
            className="rounded-full border border-[#fff1d6]/25 bg-[#fff1d6]/10 px-4 py-2 text-xs text-[#fff1d6] md:hidden"
          >
            Compress
          </a>

        </div>

      </nav>

      {/* HERO */}

      <section
        id="home"
        className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-4 pb-16 pt-16 text-center sm:px-8 sm:pt-24"
      >

        <div className="rounded-full border border-[#fff1d6]/30 bg-[#fff1d6]/10 px-4 py-2 text-xs text-[#fff1d6]">
          📄 PDF Compressor
        </div>

        <p className="mt-4 text-xs text-zinc-500">
          Built by{" "}
          <span className="font-semibold text-[#fff1d6]">
            KrishAIWorks
          </span>
        </p>

        <h1 className="mt-7 max-w-4xl text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">

          Compress PDFs.
          <br />

          <span className="bg-gradient-to-r from-white via-[#fff1d6] to-[#ffe8b8] bg-clip-text text-transparent">
            Keep Them Sharp.
          </span>

        </h1>

        <p className="mt-6 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base sm:leading-8">
          Reduce PDF file size quickly while keeping
          your documents clean and easy to share.
        </p>

        <div className="mt-7 flex max-w-full flex-wrap justify-center gap-3">

          <span className="rounded-full border border-[#fff1d6]/20 bg-[#fff1d6]/8 px-4 py-2 text-xs text-zinc-300">
            ⚡ Fast Compression
          </span>

          <span className="rounded-full border border-[#fff1d6]/20 bg-[#fff1d6]/8 px-4 py-2 text-xs text-zinc-300">
            📉 Smaller Files
          </span>

          <span className="rounded-full border border-[#fff1d6]/20 bg-[#fff1d6]/8 px-4 py-2 text-xs text-zinc-300">
            🔒 Private Processing
          </span>

        </div>

      </section>

      {/* COMPRESSOR */}

      <section
        id="compressor"
        className="relative z-10 mx-auto max-w-5xl px-4 pb-24 sm:px-8"
      >

        <div className="rounded-[2rem] border border-[#fff1d6]/20 bg-black/80 p-4 shadow-2xl shadow-[#fff1d6]/5 backdrop-blur-2xl sm:p-7">

          <div className="mb-7">

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ffe8b8]">
              PDF Compressor
            </p>

            <h2 className="mt-3 text-xl font-bold sm:text-2xl">
              Make your PDF smaller in seconds.
            </h2>

          </div>

          {/* UPLOAD */}

          <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Upload PDF
          </label>

          <label className="mt-3 flex min-h-[190px] cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-[#fff1d6]/25 bg-[#0a0907] px-5 text-center transition hover:border-[#fff1d6]/50 hover:bg-[#fff1d6]/5">

            <input
              type="file"
              accept=".pdf,application/pdf"
              onChange={handleFileChange}
              className="hidden"
            />

            <div className="text-4xl">
              📄
            </div>

            <p className="mt-4 break-all text-sm font-semibold text-zinc-200">
              {file
                ? file.name
                : "Choose a PDF file"}
            </p>

            <p className="mt-2 text-xs text-zinc-600">
              {file
                ? formatSize(file.size)
                : "Click to browse from your device"}
            </p>

          </label>

          {/* COMPRESSION LEVEL */}

          <div className="mt-5">

            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Compression Level
            </label>

            <select
              value={level}
              onChange={(e) =>
                setLevel(
                  e.target.value as CompressionLevel
                )
              }
              className="mt-2 h-12 w-full rounded-xl border border-[#fff1d6]/20 bg-[#0a0907] px-4 text-sm text-white outline-none focus:border-[#fff1d6]/50"
            >

              {levels.map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}

            </select>

          </div>

          {/* COMPRESS BUTTON */}

          <button
            type="button"
            onClick={compressPdf}
            disabled={loading}
            className="mt-5 w-full rounded-xl bg-[#fff1d6] px-5 py-4 text-sm font-bold text-black transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
          >

            {loading
              ? "⚙️ Compressing PDF..."
              : "✨ Compress PDF"}

          </button>

          {/* CLEAR */}

          <button
            type="button"
            onClick={clearAll}
            className="mt-3 w-full py-2 text-xs text-zinc-600 transition hover:text-[#fff1d6]"
          >
            Clear Everything
          </button>

          {/* ERROR */}

          {error && (

            <div className="mt-5 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">
              ⚠️ {error}
            </div>

          )}

          {/* RESULT */}

          {result && (

            <div className="mt-8 rounded-3xl border border-[#fff1d6]/25 bg-[#0a0907] p-5 sm:p-7">

              <div className="flex flex-col gap-5">

                {/* RESULT HEADING */}

                <div>

                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ffe8b8]">
                    Compressed Result
                  </p>

                  <h3 className="mt-3 text-2xl font-bold sm:text-3xl">
                    Your PDF Is Ready.
                  </h3>

                </div>

                {/* SIZE STATS */}

                <div className="grid gap-4 sm:grid-cols-3">

                  <div className="rounded-2xl border border-[#fff1d6]/15 bg-black p-5">

                    <p className="text-xs uppercase tracking-wider text-zinc-600">
                      Original Size
                    </p>

                    <p className="mt-3 text-2xl font-bold text-[#fff1d6]">
                      {formatSize(
                        result.originalSize
                      )}
                    </p>

                  </div>

                  <div className="rounded-2xl border border-[#fff1d6]/15 bg-black p-5">

                    <p className="text-xs uppercase tracking-wider text-zinc-600">
                      New Size
                    </p>

                    <p className="mt-3 text-2xl font-bold text-[#fff1d6]">
                      {formatSize(
                        result.newSize
                      )}
                    </p>

                  </div>

                  <div className="rounded-2xl border border-[#fff1d6]/15 bg-black p-5">

                    <p className="text-xs uppercase tracking-wider text-zinc-600">
                      Size Reduction
                    </p>

                    <p className="mt-3 text-2xl font-bold text-[#fff1d6]">
                      {reduction}%
                    </p>

                  </div>

                </div>

                {/* HIGHLIGHT */}

                <div className="rounded-2xl border border-[#fff1d6]/15 bg-black p-5">

                  <div className="rounded-xl border border-[#fff1d6]/20 bg-[#fff1d6]/10 px-4 py-3">

                    <p className="text-sm font-bold text-[#fff1d6]">
                      📉 Optimization Complete
                    </p>

                  </div>

                  <p className="mt-4 text-sm leading-7 text-zinc-400">
                    Your PDF has been processed using
                    the selected compression level.
                  </p>

                </div>

                {/* DOWNLOAD */}

                <button
                  type="button"
                  onClick={downloadPdf}
                  className="w-full rounded-xl bg-[#fff1d6] px-5 py-4 text-sm font-bold text-black transition hover:bg-white"
                >
                  ⬇️ Download Compressed PDF
                </button>

                {/* COMPRESS AGAIN */}

                <button
                  type="button"
                  onClick={compressPdf}
                  disabled={loading}
                  className="w-full rounded-xl border border-[#fff1d6]/25 bg-[#fff1d6]/8 px-5 py-3 text-sm font-semibold text-[#fff1d6] transition hover:bg-[#fff1d6]/15 disabled:opacity-50"
                >
                  🔄 Compress Again
                </button>

              </div>

            </div>

          )}

        </div>

      </section>

      {/* FEATURES */}

      <section
        id="features"
        className="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:px-8"
      >

        <div className="grid gap-5 md:grid-cols-3">

          {[
            [
              "📉",
              "Reduce File Size",
              "Shrink large PDF files so they are easier to upload, store and share.",
            ],
            [
              "⚡",
              "Multiple Compression Levels",
              "Choose the balance between quality and file size.",
            ],
            [
              "🔒",
              "Private Processing",
              "Your PDF can be processed directly in your browser.",
            ],
          ].map(
            ([icon, title, description]) => (

              <div
                key={title}
                className="rounded-3xl border border-[#fff1d6]/10 bg-black/70 p-6 backdrop-blur-xl transition hover:border-[#fff1d6]/30"
              >

                <div className="text-3xl">
                  {icon}
                </div>

                <h3 className="mt-5 text-base font-bold">
                  {title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-500">
                  {description}
                </p>

              </div>

            )
          )}

        </div>

      </section>

      {/* HOW TO USE */}

      <section
        id="how"
        className="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:px-8"
      >

        <div className="text-center">

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ffe8b8]">
            How To Use
          </p>

          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Compress your PDF in three steps.
          </h2>

        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">

          {[
            [
              "01",
              "Upload PDF",
              "Choose the PDF file you want to compress.",
            ],
            [
              "02",
              "Choose Compression",
              "Select Low, Medium or High compression.",
            ],
            [
              "03",
              "Download",
              "Download your optimized PDF instantly.",
            ],
          ].map(
            ([number, title, description]) => (

              <div
                key={number}
                className="rounded-3xl border border-[#fff1d6]/10 bg-black/70 p-6"
              >

                <span className="text-sm font-bold text-[#fff1d6]">
                  {number}
                </span>

                <h3 className="mt-5 text-lg font-bold">
                  {title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-500">
                  {description}
                </p>

              </div>

            )
          )}

        </div>

      </section>

      {/* FAQ */}

      <section
        id="faq"
        className="relative z-10 mx-auto max-w-4xl px-4 py-20 sm:px-8"
      >

        <div className="text-center">

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ffe8b8]">
            FAQ
          </p>

          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Frequently Asked Questions
          </h2>

        </div>

        <div className="mt-10 space-y-4">

          {[
            [
              "What does this tool do?",
              "It reduces the file size of PDF documents so they are easier to store and share.",
            ],
            [
              "Which compression level should I use?",
              "Low prioritizes quality, Medium provides a balanced result, and High prioritizes a smaller file size.",
            ],
            [
              "Does compression work on every PDF?",
              "Compression results depend on the PDF content. Image-heavy PDFs usually have more room for size reduction.",
            ],
            [
              "Can I download the compressed PDF?",
              "Yes. Once processing is complete, you can download the optimized PDF directly.",
            ],
          ].map(
            ([question, answer]) => (

              <div
                key={question}
                className="rounded-3xl border border-[#fff1d6]/10 bg-black/70 p-6"
              >

                <h3 className="text-sm font-bold">
                  {question}
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-500">
                  {answer}
                </p>

              </div>

            )
          )}

        </div>

      </section>

      {/* CTA */}

      <section className="relative z-10 mx-auto max-w-4xl px-4 py-20 text-center sm:px-8">

        <div className="rounded-[2rem] border border-[#fff1d6]/20 bg-gradient-to-b from-[#fff1d6]/12 to-black p-8 sm:p-12">

          <h2 className="text-3xl font-bold sm:text-4xl">
            Make your PDFs easier to share.
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-zinc-500">
            Compress large PDF files quickly and
            download a smaller version in seconds.
          </p>

          <a
            href="#compressor"
            className="mt-7 inline-flex rounded-xl bg-[#fff1d6] px-6 py-3 text-sm font-semibold text-black transition hover:bg-white"
          >
            Compress A PDF
          </a>

        </div>

      </section>

     .{/* FOOTER */}

<footer className="relative z-10 border-t border-[#fff1d6]/10 px-4 py-10">

  <div className="mx-auto max-w-6xl">

    {/* RELATED TOOLS */}

    <div className="mb-10">

      <div className="mb-6 text-center">

        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#fff1d6]/60">
          Explore More
        </p>

        <h3 className="mt-2 text-2xl font-bold">
          More Useful Tools
        </h3>

        <p className="mx-auto mt-2 max-w-xl text-sm text-zinc-500">
          Explore more free tools from KrishAIWorks to make your
          everyday digital tasks easier.
        </p>

      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        {/* PDF AI Summarizer */}

        <a
          href="https://pdfaisummarizer.krishaiworks.com/"
          className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#fff1d6]/30 hover:bg-[#fff1d6]/[0.04]"
        >

          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-[#fff1d6]/20 bg-[#fff1d6]/10 text-lg">
            📄
          </div>

          <h4 className="font-semibold transition-colors group-hover:text-[#fff1d6]">
            PDF AI Summarizer
          </h4>

          <p className="mt-2 text-xs leading-5 text-zinc-500">
            Summarize lengthy PDF documents quickly with AI.
          </p>

        </a>


        {/* PDF Merger & Splitter */}

        <a
          href="https://pdfmergersplitter.krishaiworks.com/"
          className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#fff1d6]/30 hover:bg-[#fff1d6]/[0.04]"
        >

          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-[#fff1d6]/20 bg-[#fff1d6]/10 text-lg">
            📚
          </div>

          <h4 className="font-semibold transition-colors group-hover:text-[#fff1d6]">
            PDF Merger &amp; Splitter
          </h4>

          <p className="mt-2 text-xs leading-5 text-zinc-500">
            Merge multiple PDFs or split documents into separate files.
          </p>

        </a>


        {/* Image to PDF Converter */}

        <a
          href="https://imagetopdfconverter.krishaiworks.com/"
          className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#fff1d6]/30 hover:bg-[#fff1d6]/[0.04]"
        >

          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-[#fff1d6]/20 bg-[#fff1d6]/10 text-lg">
            🖼️
          </div>

          <h4 className="font-semibold transition-colors group-hover:text-[#fff1d6]">
            Image to PDF Converter
          </h4>

          <p className="mt-2 text-xs leading-5 text-zinc-500">
            Convert images into clean PDF documents instantly.
          </p>

        </a>


        {/* AI Study Assistant */}

        <a
          href="https://aistudyassistant.krishaiworks.com/"
          className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#fff1d6]/30 hover:bg-[#fff1d6]/[0.04]"
        >

          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-[#fff1d6]/20 bg-[#fff1d6]/10 text-lg">
            🎓
          </div>

          <h4 className="font-semibold transition-colors group-hover:text-[#fff1d6]">
            AI Study Assistant
          </h4>

          <p className="mt-2 text-xs leading-5 text-zinc-500">
            Get AI-powered help for studying, learning, and revision.
          </p>

        </a>

      </div>

    </div>


    {/* FOOTER BOTTOM */}

    <div className="flex flex-col items-center justify-between gap-5 border-t border-white/10 pt-8 text-center sm:flex-row sm:text-left">

      <div className="flex items-center gap-3">

        <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-[#fff1d6]/25">

          <img
            src="/logo.png"
            alt="KrishAIWorks"
            className="h-full w-full rounded-full object-cover"
          />

        </div>

        <div>

          <p className="text-sm font-bold">
            KrishAIWorks
          </p>

          <p className="text-xs text-zinc-600">
            AI Solutions That Work
          </p>

        </div>

      </div>

      <p className="text-xs text-zinc-600">
        © {new Date().getFullYear()} KrishAIWorks.
        All rights reserved.
      </p>

    </div>

  </div>

</footer>

    </main>
  );
}