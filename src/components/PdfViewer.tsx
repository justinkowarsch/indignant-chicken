import React, { useEffect, useState } from "react";

// Dynamic imports for PDF components
let Document: any;
let Page: any;
let pdfjs: any;

interface PdfViewerProps {
  pdfUrl: string;
  height?: number;
  title?: string;
}

interface ZoomState {
  scale: number;
  width?: number;
}

const PdfViewer: React.FC<PdfViewerProps> = ({
  pdfUrl,
  height = 600,
  title = "Document Viewer",
}) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [zoom, setZoom] = useState<ZoomState>({ scale: 1.25 }); // Will be adjusted based on screen size
  const [isClient, setIsClient] = useState<boolean>(false);
  const [pdfLibsLoaded, setPdfLibsLoaded] = useState<boolean>(false);

  // Detect mobile screen size and set optimal zoom
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // Tailwind md breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Set optimal zoom based on screen size
  useEffect(() => {
    if (isClient) {
      const optimalScale = isMobile ? 0.5 : 1.25;
      setZoom({ scale: optimalScale });
    }
  }, [isMobile, isClient]);

  // Get optimal scale for current screen
  const getOptimalScale = () => (isMobile ? 0.5 : 1.25);

  // Load PDF libraries only on client side
  useEffect(() => {
    const loadPdfLibs = async () => {
      try {
        const pdfModule = await import("react-pdf");
        const pdfjsModule = pdfModule.pdfjs;

        Document = pdfModule.Document;
        Page = pdfModule.Page;
        pdfjs = pdfjsModule;

        // Set up PDF.js worker
        pdfjs.GlobalWorkerOptions.workerSrc = new URL(
          "pdfjs-dist/build/pdf.worker.min.mjs",
          import.meta.url
        ).toString();

        // Load CSS
        await Promise.all([
          import("react-pdf/dist/Page/AnnotationLayer.css"),
          import("react-pdf/dist/Page/TextLayer.css"),
        ]);

        setPdfLibsLoaded(true);
        setIsClient(true);
      } catch (error) {
        console.error("Failed to load PDF libraries:", error);
        setError("Failed to load PDF viewer");
        setIsClient(true);
      }
    };

    loadPdfLibs();
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setLoading(false);
    setError(null);
  }

  function onDocumentLoadError(error: Error) {
    setError(`Failed to load PDF: ${error.message}`);
    setLoading(false);
  }

  function goToPrevPage() {
    setPageNumber((page) => Math.max(1, page - 1));
  }

  function goToNextPage() {
    setPageNumber((page) => Math.min(numPages, page + 1));
  }

  function zoomIn() {
    setZoom((prev) => ({ scale: Math.min(prev.scale + 0.25, 3) }));
  }

  function zoomOut() {
    setZoom((prev) => ({ scale: Math.max(prev.scale - 0.25, 0.5) }));
  }

  function resetToOptimal() {
    setZoom({ scale: getOptimalScale() }); // Reset to optimal scale based on screen size
  }

  // Show loading state during SSR and until PDF libraries are loaded
  if (!isClient || !pdfLibsLoaded) {
    return (
      <div className="border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 p-4 my-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200 dark:border-gray-600">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center">
            📄 {title}
          </h4>
          <a
            href={pdfUrl}
            download
            className="inline-flex items-center px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200"
          >
            {isMobile ? "Download" : "⬇️ Download PDF"}
          </a>
        </div>

        {/* Loading placeholder */}
        <div
          className="flex items-center justify-center py-8"
          style={{ height: `${height}px` }}
        >
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <span className="text-gray-600 dark:text-gray-400">
              Loading PDF viewer...
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 p-4 my-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200 dark:border-gray-600">
        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center">
          📄 {title}
        </h4>
        <a
          href={pdfUrl}
          download
          className="inline-flex items-center px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200"
        >
          {isMobile ? "Download" : "⬇️ Download PDF"}
        </a>
      </div>

      {/* PDF Content */}
      <div className="flex flex-col items-center">
        {loading && (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600 dark:text-gray-400">
              Loading document...
            </span>
          </div>
        )}

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4 mb-4">
            <div className="flex items-center">
              <span className="text-red-600 dark:text-red-400 text-sm">
                ❌ {error}
              </span>
            </div>
          </div>
        )}

        {/* Zoom Controls */}
        {!loading && !error && (
          <div className="flex items-center justify-center space-x-2 mb-4">
            <button
              onClick={zoomOut}
              disabled={zoom.scale <= 0.5}
              className={`px-2 py-1 text-sm rounded transition-colors ${
                zoom.scale <= 0.5
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700"
                  : "bg-gray-600 text-white hover:bg-gray-700 dark:bg-gray-600 dark:hover:bg-gray-500"
              }`}
            >
              {isMobile ? "−" : "🔍−"}
            </button>

            <span className="text-sm text-gray-600 dark:text-gray-400 min-w-[60px] text-center">
              {Math.round(zoom.scale * 100)}%
            </span>

            <button
              onClick={zoomIn}
              disabled={zoom.scale >= 3}
              className={`px-2 py-1 text-sm rounded transition-colors ${
                zoom.scale >= 3
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700"
                  : "bg-gray-600 text-white hover:bg-gray-700 dark:bg-gray-600 dark:hover:bg-gray-500"
              }`}
            >
              {isMobile ? "+" : "🔍+"}
            </button>

            <button
              onClick={resetToOptimal}
              className="px-2 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Optimal ({Math.round(getOptimalScale() * 100)}%)
            </button>
          </div>
        )}

        {/* PDF Document */}
        <div
          className="border border-gray-300 dark:border-gray-600 rounded overflow-auto shadow-lg bg-gray-50 dark:bg-gray-900 relative z-50"
          style={{ height: `${height}px` }}
        >
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading=""
            error=""
            className="flex justify-center p-4"
          >
            <Page
              pageNumber={pageNumber}
              scale={zoom.scale}
              width={zoom.width}
              renderTextLayer={true}
              renderAnnotationLayer={true}
              className="shadow-lg"
            />
          </Document>
        </div>

        {/* Navigation Controls */}
        {numPages > 0 && (
          <div className="flex items-center justify-between w-full mt-4 px-4">
            <button
              onClick={goToPrevPage}
              disabled={pageNumber <= 1}
              className={`flex items-center ${
                isMobile ? "px-2" : "px-3"
              } py-2 rounded text-sm transition-colors duration-200 ${
                pageNumber <= 1
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500"
                  : "bg-gray-600 text-white hover:bg-gray-700 dark:bg-gray-600 dark:hover:bg-gray-500"
              }`}
            >
              {isMobile ? "←" : "← Previous"}
            </button>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Page {pageNumber} of {numPages}
              </span>
            </div>

            <button
              onClick={goToNextPage}
              disabled={pageNumber >= numPages}
              className={`flex items-center ${
                isMobile ? "px-2" : "px-3"
              } py-2 rounded text-sm transition-colors duration-200 ${
                pageNumber >= numPages
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500"
                  : "bg-gray-600 text-white hover:bg-gray-700 dark:bg-gray-600 dark:hover:bg-gray-500"
              }`}
            >
              {isMobile ? "→" : "Next →"}
            </button>
          </div>
        )}
      </div>

      {/* Footer with PDF info */}
      {!loading && !error && (
        <div className="mt-4 pt-2 border-t border-gray-200 dark:border-gray-600">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            📊 Document contains {numPages} page{numPages !== 1 ? "s" : ""} •
            Use zoom controls above or download for better readability
          </p>
        </div>
      )}
    </div>
  );
};

export default PdfViewer;
