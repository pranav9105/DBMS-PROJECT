"use client"
import { AnimatePresence, motion } from "framer-motion"
import type { ChangeEvent } from "react"
import Image from "next/image"
import { UploadCloud, ScanLine, FileImage, Sparkles, Zap, Camera, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ReceiptUploaderProps {
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void
  onScan: () => void
  previewUrl: string | null
  hasFile: boolean
}

export function ReceiptUploader({ onFileChange, onScan, previewUrl, hasFile }: ReceiptUploaderProps) {
  return (
    <div className="p-10 text-center bg-gradient-to-br from-emerald-50/50 via-green-50/30 to-teal-50/50 relative overflow-hidden">
      {/* Enhanced background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-6 left-6 w-4 h-4 bg-emerald-300/25 rounded-full animate-pulse" />
        <div className="absolute top-16 right-12 w-3 h-3 bg-teal-300/30 rounded-full animate-bounce" />
        <div className="absolute bottom-12 left-12 w-5 h-5 bg-green-300/25 rounded-full animate-ping" />
        <div
          className="absolute bottom-6 right-6 w-3 h-3 bg-lime-300/25 rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* Floating decorative icons */}
      <div className="absolute top-8 right-8">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
            scale: { duration: 3, repeat: Number.POSITIVE_INFINITY },
          }}
        >
          <Star className="h-8 w-8 text-yellow-400/40" fill="currentColor" />
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-8">
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
        >
          <Camera className="h-7 w-7 text-indigo-400/40" />
        </motion.div>
      </div>

      <div className="absolute top-1/3 left-8">
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
        >
          <Zap className="h-6 w-6 text-purple-400/40" />
        </motion.div>
      </div>

      <motion.label
        htmlFor="receipt-upload"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="relative flex flex-col items-center justify-center w-full min-h-[400px] border-3 border-dashed border-emerald-200/70 rounded-2xl cursor-pointer hover:border-emerald-300 transition-all duration-500 group overflow-hidden backdrop-blur-sm bg-white/80 shadow-xl hover:shadow-2xl"
      >
        {/* Hover effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-teal-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

        <AnimatePresence mode="wait">
          {previewUrl ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
              className="relative w-full h-full"
            >
              <div className="relative w-full h-[350px] rounded-xl overflow-hidden shadow-inner bg-white/90 backdrop-blur-sm">
                <Image
                  src={previewUrl || "/placeholder.svg"}
                  alt="Receipt preview"
                  fill
                  className="object-contain p-6"
                />

                {/* Preview overlay with enhanced effects */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 via-teal-600/10 to-green-600/10 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="bg-white/95 p-4 rounded-full shadow-xl backdrop-blur-md border border-white/20"
                  >
                    <FileImage className="h-10 w-10 text-emerald-600" />
                  </motion.div>
                </motion.div>

                {/* Success indicator */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="absolute top-4 right-4 bg-emerald-500 text-white p-2 rounded-full shadow-lg"
                >
                  ✓
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center pt-12 pb-10 relative z-10"
            >
              {/* Enhanced upload icon with animations */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  scale: [1, 1.1, 1],
                  rotate: [0, 3, -3, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="mb-8 relative"
              >
                <div className="p-6 bg-gradient-to-br from-emerald-500 via-teal-500 to-green-600 rounded-3xl shadow-2xl relative overflow-hidden">
                  <UploadCloud className="w-20 h-20 text-white relative z-10" />

                  {/* Animated gradient overlay */}
                  <motion.div
                    animate={{
                      background: [
                        "linear-gradient(45deg, rgba(16,185,129,0.3) 0%, rgba(13,148,136,0.3) 50%, rgba(22,163,74,0.3) 100%)",
                        "linear-gradient(45deg, rgba(22,163,74,0.3) 0%, rgba(16,185,129,0.3) 50%, rgba(13,148,136,0.3) 100%)",
                        "linear-gradient(45deg, rgba(13,148,136,0.3) 0%, rgba(22,163,74,0.3) 50%, rgba(16,185,129,0.3) 100%)",
                      ],
                    }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                    className="absolute inset-0 rounded-3xl"
                  />

                  {/* Orbiting sparkles */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="absolute inset-0 rounded-3xl"
                  >
                    <motion.div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Sparkles className="h-6 w-6 text-yellow-300" />
                    </motion.div>
                    <motion.div className="absolute top-1/2 -right-3 transform -translate-y-1/2">
                      <div className="w-3 h-3 bg-pink-300 rounded-full" />
                    </motion.div>
                    <motion.div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
                      <div className="w-4 h-4 bg-emerald-300 rounded-full" />
                    </motion.div>
                    <motion.div className="absolute top-1/2 -left-3 transform -translate-y-1/2">
                      <div className="w-3 h-3 bg-orange-300 rounded-full" />
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="space-y-4 text-center"
              >
                <motion.p
                  className="text-2xl font-bold text-foreground"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                >
                  <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 bg-clip-text text-transparent font-extrabold">
                    ✨ Click to upload
                  </span>
                  <span className="text-gray-700"> or drag and drop</span>
                </motion.p>

                <p className="text-lg text-muted-foreground font-semibold">📷 PNG, JPG or PDF • Max 10MB</p>

                {/* Enhanced feature highlights */}
                <div className="flex flex-wrap justify-center gap-3 mt-6">
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0 }}
                    className="px-4 py-2 bg-emerald-100/90 text-emerald-800 rounded-full text-sm font-bold backdrop-blur-sm border border-emerald-200/80"
                  >
                    🤖 AI Powered
                  </motion.div>
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
                    className="px-4 py-2 bg-teal-100/90 text-teal-800 rounded-full text-sm font-bold backdrop-blur-sm border border-teal-200/80"
                  >
                    ⚡ Instant
                  </motion.div>
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                    className="px-4 py-2 bg-green-100/90 text-green-800 rounded-full text-sm font-bold backdrop-blur-sm border border-green-200/80"
                  >
                    🎯 Accurate
                  </motion.div>
                </div>

                {/* Animated dots indicator */}
                <div className="flex items-center justify-center space-x-2 mt-8">
                  <motion.div
                    className="w-3 h-3 bg-emerald-500 rounded-full"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 0 }}
                  />
                  <motion.div
                    className="w-3 h-3 bg-teal-500 rounded-full"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
                  />
                  <motion.div
                    className="w-3 h-3 bg-green-500 rounded-full"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 0.4 }}
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <input
          id="receipt-upload"
          type="file"
          className="hidden"
          accept="image/png, image/jpeg, application/pdf"
          onChange={onFileChange}
        />
      </motion.label>

      {/* Enhanced scan button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-10 relative z-10"
      >
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={onScan}
            disabled={!hasFile}
            className={`relative w-full sm:w-auto px-12 py-5 text-xl font-bold shadow-2xl transition-all duration-500 border-0 ${
              hasFile
                ? "bg-gradient-to-r from-emerald-500 via-teal-500 to-green-600 hover:from-emerald-600 hover:via-teal-600 hover:to-green-700 text-white transform hover:shadow-3xl"
                : "bg-gray-200/80 text-gray-400 cursor-not-allowed backdrop-blur-sm"
            }`}
            size="lg"
          >
            {/* Button content with enhanced animations */}
            <motion.div className="flex items-center justify-center relative z-10">
              <motion.div
                animate={
                  hasFile
                    ? {
                        rotate: [0, 360],
                        scale: [1, 1.1, 1],
                      }
                    : {}
                }
                transition={{
                  rotate: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                  scale: { duration: 1.5, repeat: Number.POSITIVE_INFINITY },
                }}
              >
                <ScanLine className="mr-4 h-7 w-7" />
              </motion.div>

              <span className="relative">{hasFile ? "🚀 Scan Receipt" : "📋 Upload a Receipt First"}</span>
            </motion.div>

            {/* Button background animation for active state */}
            {hasFile && (
              <motion.div
                animate={{
                  background: [
                    "linear-gradient(45deg, rgba(16,185,129,0.2) 0%, rgba(13,148,136,0.2) 50%, rgba(22,163,74,0.2) 100%)",
                    "linear-gradient(45deg, rgba(22,163,74,0.2) 0%, rgba(16,185,129,0.2) 50%, rgba(13,148,136,0.2) 100%)",
                    "linear-gradient(45deg, rgba(13,148,136,0.2) 0%, rgba(22,163,74,0.2) 50%, rgba(16,185,129,0.2) 100%)",
                  ],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                className="absolute inset-0 rounded-lg"
              />
            )}
          </Button>
        </motion.div>

        {/* Enhanced status message */}
        <AnimatePresence>
          {hasFile && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 text-center"
            >
              <motion.p
                animate={{
                  color: ["#6366f1", "#8b5cf6", "#3b82f6", "#6366f1"],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                className="text-base font-bold"
              >
                ✨ Ready to extract data with AI magic!
              </motion.p>
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="inline-block mt-2"
              >
                🎯
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* File upload tips */}
        {!hasFile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-6 text-center"
          >
            <p className="text-sm text-muted-foreground font-medium mb-3">
              💡 <span className="font-semibold">Pro Tips:</span>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-emerald-50/90 p-3 rounded-lg backdrop-blur-sm border border-emerald-100/80">
                <span className="font-semibold text-emerald-700">📱 Clear Image</span>
                <p className="text-emerald-700 mt-1">Take a well-lit photo</p>
              </div>
              <div className="bg-teal-50/90 p-3 rounded-lg backdrop-blur-sm border border-teal-100/80">
                <span className="font-semibold text-teal-700">📐 Full Receipt</span>
                <p className="text-teal-700 mt-1">Include all edges</p>
              </div>
              <div className="bg-green-50/90 p-3 rounded-lg backdrop-blur-sm border border-green-100/80">
                <span className="font-semibold text-green-700">🎯 High Quality</span>
                <p className="text-green-700 mt-1">Readable text preferred</p>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
