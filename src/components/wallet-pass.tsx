"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import type { ExtractReceiptDataOutput } from "@/ai/flows/extract-receipt-data"
import { WalletizeLogo } from "./icons/logo"
import { Button } from "./ui/button"
import { ScrollArea } from "./ui/scroll-area"
import { Separator } from "./ui/separator"
import { Info, Wallet, Star, Sparkles, RefreshCw, CheckCircle2, ArrowRight } from "lucide-react"

interface WalletPassProps {
  data: ExtractReceiptDataOutput
  saveUrl: string
}

export function WalletPass({ data, saveUrl }: WalletPassProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  const formattedDate = new Date(data.transactionDate).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const formattedTime = data.transactionTime
    ? new Date(`1970-01-01T${data.transactionTime}Z`).toLocaleTimeString(undefined, {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
    : ""

  // Validate saveUrl to prevent URL constructor errors
  const isValidUrl = (url: string) => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  const safeCurrency = data.currency || "USD"
  const amountNumber = Number.isFinite(data.totalAmount) ? data.totalAmount : 0
  const currencyFormatter = new Intl.NumberFormat(undefined, { style: "currency", currency: safeCurrency })

  const safeMerchant = data.merchantName || "Unknown Merchant"

  return (
    <div className="w-full max-w-sm mx-auto p-6 bg-gradient-to-br from-emerald-50/80 via-teal-50/80 to-cyan-50/80 rounded-2xl relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-4 left-4 w-3 h-3 bg-emerald-300/30 rounded-full animate-pulse" />
        <div className="absolute top-8 right-8 w-2 h-2 bg-teal-300/40 rounded-full animate-bounce" />
        <div className="absolute bottom-8 left-8 w-4 h-4 bg-cyan-300/30 rounded-full animate-ping" />
        <div
          className="absolute bottom-12 right-6 w-2 h-2 bg-green-300/35 rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* Floating decorative icons */}
      <div className="absolute top-6 right-6">
        <motion.div
          animate={{
            rotate: [0, 15, -15, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
        >
          <Star className="h-6 w-6 text-yellow-400/60" fill="currentColor" />
        </motion.div>
      </div>

      <div className="absolute bottom-20 left-6">
        <motion.div
          animate={{
            y: [0, -8, 0],
            rotate: [0, 10, 0],
          }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
        >
          <Sparkles className="h-5 w-5 text-emerald-400/60" />
        </motion.div>
      </div>

      {/* Pass Container with 3D flip effect */}
      <div className="relative z-10">
        <motion.div
          className="relative w-full aspect-[1.586] [transform-style:preserve-3d] transition-transform duration-700 cursor-pointer"
          style={{ transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
          whileHover={{ scale: 1.02 }}
        >
          {/* Front of the pass */}
          <motion.div
            className="absolute w-full h-full [backface-visibility:hidden] rounded-2xl shadow-2xl bg-gradient-to-br from-white via-emerald-50/50 to-teal-50/50 text-card-foreground overflow-hidden flex flex-col border border-emerald-200/50"
            initial={{ rotateY: 0 }}
          >
            {/* Enhanced Header */}
            <div className="flex items-center p-5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-cyan-600/20" />

              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="relative z-10"
              >
                <WalletizeLogo className="h-10 w-10" />
              </motion.div>

              <div className="ml-4 flex-1 relative z-10">
                <h2 className="text-lg font-bold truncate">{safeMerchant}</h2>
                <p className="text-emerald-100 text-sm font-medium">Digital Receipt</p>
              </div>

              {/* Header decoration */}
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="relative z-10"
              >
                <CheckCircle2 className="h-6 w-6 text-emerald-100" />
              </motion.div>
            </div>

            {/* Enhanced Main Content */}
            <div className="flex-1 flex flex-col justify-center items-center p-6 relative">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="w-full h-full bg-gradient-to-br from-emerald-500 to-teal-500 rounded-br-2xl" />
              </div>

              <motion.div
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="text-center relative z-10"
              >
                <p className="text-sm text-muted-foreground font-semibold mb-2">Total Amount</p>
                <motion.p
                  className="text-6xl font-bold tracking-tight bg-gradient-to-r from-emerald-700 via-teal-700 to-cyan-700 bg-clip-text text-transparent"
                  animate={{
                    textShadow: [
                      "0 0 0 rgba(16,185,129,0)",
                      "0 0 10px rgba(16,185,129,0.3)",
                      "0 0 0 rgba(16,185,129,0)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                >
                  {currencyFormatter.format(amountNumber)}
                </motion.p>
                <motion.p
                  className="text-sm text-muted-foreground mt-2 font-medium"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  📅 {formattedDate}
                </motion.p>
              </motion.div>
            </div>

            {/* Enhanced Footer */}
            <div className="p-4 border-t border-emerald-200/30 flex justify-between items-center bg-gradient-to-r from-emerald-50/50 to-teal-50/50">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsFlipped(true)}
                  className="text-emerald-700 hover:bg-emerald-100/80 hover:text-emerald-800 font-semibold"
                >
                  <Info className="mr-2 h-4 w-4" />
                  Details
                  <ArrowRight className="ml-2 h-3 w-3" />
                </Button>
              </motion.div>

              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="text-emerald-600"
              >
                ✨
              </motion.div>
            </div>
          </motion.div>

          {/* Back of the pass */}
          <motion.div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-2xl shadow-2xl bg-gradient-to-br from-white via-emerald-50/50 to-teal-50/50 text-card-foreground overflow-hidden flex flex-col border border-emerald-200/50">
            {/* Back Header */}
            <div className="p-5 border-b border-emerald-200/40 bg-gradient-to-r from-emerald-50/80 to-teal-50/80">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">
                  📋 Receipt Details
                </h3>
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <RefreshCw className="h-4 w-4 text-emerald-600/70" />
                </motion.div>
              </div>
            </div>

            {/* Enhanced Details Content */}
            <ScrollArea className="flex-1 p-5">
              <div className="space-y-4">
                {/* Transaction Info Grid */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-3 p-4 bg-gradient-to-r from-emerald-50/60 to-teal-50/60 rounded-lg border border-emerald-200/40">
                  <div className="text-xs font-bold text-emerald-700">📅 Date</div>
                  <div className="text-xs font-semibold text-gray-800">{formattedDate || "Unknown Date"}</div>

                  {formattedTime ? (
                    <>
                      <div className="text-xs font-bold text-emerald-700">🕒 Time</div>
                      <div className="text-xs font-semibold text-gray-800">{formattedTime}</div>
                    </>
                  ) : (
                    <>
                      <div className="text-xs font-bold text-emerald-700">🕒 Time</div>
                      <div className="text-xs font-semibold text-gray-800">—</div>
                    </>
                  )}

                  <div className="text-xs font-bold text-emerald-700">🏪 Store</div>
                  <div className="text-xs font-semibold text-gray-800 truncate">{safeMerchant}</div>

                  <div className="text-xs font-bold text-emerald-700">🧾 Receipt ID</div>
                  <div className="text-xs font-semibold text-gray-800 truncate">{data.receiptId || "N/A"}</div>

                  <div className="text-xs font-bold text-emerald-700">💳 Payment</div>
                  <div className="text-xs font-semibold text-gray-800">{data.paymentMethod || "—"}</div>
                </div>

                <Separator className="bg-emerald-200/50" />

                {/* AI Summary Section */}
                <div className="p-4 bg-gradient-to-r from-emerald-50/70 to-teal-50/70 rounded-lg border border-emerald-200/40">
                  <h4 className="text-sm font-bold text-emerald-700 mb-3 flex items-center">
                    <Sparkles className="h-4 w-4 mr-2" />🤖 AI Summary
                  </h4>
                  <p className="text-xs text-gray-700 leading-relaxed">{data.summary || "No summary available."}</p>
                </div>

                {/* Items count if available */}
                {data.items && data.items.length > 0 ? (
                  <div className="p-3 bg-gradient-to-r from-emerald-50/70 to-teal-50/70 rounded-lg border border-emerald-200/40 text-center">
                    <p className="text-sm font-bold text-emerald-700">
                      🛍️ {data.items.length} item{data.items.length !== 1 ? "s" : ""} purchased
                    </p>
                  </div>
                ) : (
                  <div className="p-3 bg-emerald-50/70 rounded-lg border border-emerald-200/40 text-center">
                    <p className="text-sm font-bold text-emerald-700">🛍️ No items listed</p>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Back Footer */}
            <div className="p-4 border-t border-emerald-200/40 flex justify-center bg-gradient-to-r from-emerald-50/70 to-teal-50/70">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFlipped(false)}
                className="text-emerald-700 hover:bg-emerald-100/80 hover:text-emerald-800 font-semibold"
              >
                ← Close Details
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Google Wallet Button */}
      <motion.div
        className="mt-8 text-center relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {isValidUrl(saveUrl) ? (
          <motion.a
            href={saveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 text-white px-8 py-4 rounded-xl hover:from-gray-800 hover:via-blue-800 hover:to-gray-800 transition-all duration-300 flex items-center justify-center gap-3 min-h-[56px] font-bold shadow-2xl hover:shadow-3xl border border-gray-700/50 relative overflow-hidden">
              {/* Button background animation */}
              <motion.div
                animate={{
                  background: [
                    "linear-gradient(45deg, rgba(59,130,246,0.1) 0%, rgba(99,102,241,0.1) 50%, rgba(139,92,246,0.1) 100%)",
                    "linear-gradient(45deg, rgba(139,92,246,0.1) 0%, rgba(59,130,246,0.1) 50%, rgba(99,102,241,0.1) 100%)",
                    "linear-gradient(45deg, rgba(99,102,241,0.1) 0%, rgba(139,92,246,0.1) 50%, rgba(59,130,246,0.1) 100%)",
                  ],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                className="absolute inset-0 rounded-xl"
              />

              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="relative z-10"
              >
                <Wallet className="h-6 w-6" />
              </motion.div>

              <span className="relative z-10 text-lg">Add to Google Wallet</span>

              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                className="relative z-10"
              >
                <ArrowRight className="h-5 w-5" />
              </motion.div>
            </div>
          </motion.a>
        ) : (
          // Fallback for invalid URL
          <div className="bg-gray-300 text-gray-500 px-8 py-4 rounded-xl flex items-center justify-center gap-3 min-h-[56px] font-bold cursor-not-allowed">
            <Wallet className="h-6 w-6" />
            Invalid Wallet URL
          </div>
        )}

        <motion.p
          className="text-sm text-muted-foreground mt-4 font-medium"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          ✨ Click the button above to add this receipt to your Google Wallet
        </motion.p>

        {/* Additional features highlight */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex flex-wrap justify-center gap-2 mt-4"
        >
          <div className="px-3 py-1 bg-emerald-100/80 text-emerald-700 rounded-full text-xs font-bold">🔒 Secure</div>
          <div className="px-3 py-1 bg-blue-100/80 text-blue-700 rounded-full text-xs font-bold">📱 Mobile Ready</div>
          <div className="px-3 py-1 bg-purple-100/80 text-purple-700 rounded-full text-xs font-bold">
            ⚡ Instant Access
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
