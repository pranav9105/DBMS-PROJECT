"use client"
import { useState } from "react"
import type { ChangeEvent } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { processReceipt, createWalletPassLink } from "@/lib/actions"
import type { ExtractReceiptDataOutput } from "@/ai/flows/extract-receipt-data"
import { useToast } from "@/hooks/use-toast"
import { ReceiptUploader } from "@/components/receipt-uploader"
import { ReceiptDataDisplay } from "@/components/receipt-data-display"
import { WalletPass } from "@/components/wallet-pass"
import { LandingHeader } from "@/components/landing/header"
import { Button } from "@/components/ui/button"
import { Loader2, ArrowLeft, CheckCircle2, AlertCircle, Sparkles, Receipt, Star, Zap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

type AppState = "idle" | "processing" | "displaying" | "pass_created" | "error"
export type ExtractedDataWithSummary = ExtractReceiptDataOutput & { summary: string }

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -60 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const floatingAnimation = {
  animate: {
    y: [0, -12, 0],
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 4,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  },
}

function normalizeReceiptData(data: ExtractReceiptDataOutput): ExtractReceiptDataOutput {
  const safeItems =
    data.items && data.items.length > 0
      ? data.items.map((it, i) => ({
          name: it.name || `Item ${i + 1}`,
          quantity: it.quantity ?? 1,
          price: it.price ?? 0,
          total: it.total ?? (it.quantity ?? 1) * (it.price ?? 0),
        }))
      : [{ name: "Item 1", quantity: 1, price: 0, total: 0 }]

  const safeDate = data.transactionDate || new Date().toISOString().slice(0, 10)

  return {
    merchantName: data.merchantName || "Unknown Merchant",
    merchantAddress: data.merchantAddress || "",
    merchantPhone: data.merchantPhone || "",
    transactionDate: safeDate,
    transactionTime: data.transactionTime || "",
    items: safeItems,
    currency: data.currency || "USD",
    subtotal: data.subtotal ?? 0,
    discounts: data.discounts ?? 0,
    taxAmount: data.taxAmount ?? 0,
    tipAmount: data.tipAmount ?? 0,
    totalAmount: data.totalAmount ?? safeItems.reduce((s, it) => s + (it.total ?? 0), 0),
    paymentMethod: data.paymentMethod || "",
    last4Digits: data.last4Digits || "",
    receiptId: data.receiptId || `R-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
    summary: (data as any).summary || "No summary provided. Edit before saving to wallet.",
  }
}

export default function UploadReceiptPage() {
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [extractedData, setExtractedData] = useState<ExtractReceiptDataOutput | null>(null)
  const [appState, setAppState] = useState<AppState>("idle")
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [saveUrl, setSaveUrl] = useState<string>("")
  const { toast } = useToast()

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(selectedFile)
      setAppState("idle")
    }
  }

  const handleScanReceipt = async () => {
    if (!file || !previewUrl) {
      toast({
        title: "No file selected",
        description: "Please upload a receipt image to scan.",
        variant: "destructive",
      })
      return
    }

    setAppState("processing")
    setErrorMessage("")

    const { data, error } = await processReceipt({
      photoDataUri: previewUrl,
    })

    if (error || !data) {
      setAppState("error")
      setErrorMessage(error || "An unknown error occurred.")
      toast({ title: "Processing Failed", description: error, variant: "destructive" })
      return
    }

    const normalized = normalizeReceiptData(data)
    setExtractedData(normalized)
    setAppState("displaying")
  }

  const handleCreateWalletPass = async (data: ExtractReceiptDataOutput) => {
    if (!data) return
    const normalized = normalizeReceiptData(data)
    setExtractedData(normalized)

    const { data: passData, error } = await createWalletPassLink({
      merchantName: normalized.merchantName,
      transactionDate: normalized.transactionDate,
      totalAmount: normalized.totalAmount,
      currency: normalized.currency,
      items: normalized.items,
      summary: normalized.summary,
      receiptId: normalized.receiptId,
    })

    if (error || !passData) {
      toast({
        title: "Failed to create pass",
        description: error || "An unknown error occurred.",
        variant: "destructive",
      })
      return
    }

    const url = `https://pay.google.com/gp/v/save/${passData.signedJwt}`
    setSaveUrl(url)
    setAppState("pass_created")
  }

  const resetState = () => {
    setFile(null)
    setPreviewUrl(null)
    setExtractedData(null)
    setAppState("idle")
    setErrorMessage("")
    setSaveUrl("")
  }

  const backToDisplay = () => {
    setAppState("displaying")
  }

  const renderContent = () => {
    switch (appState) {
      case "processing":
        return (
          <motion.div
            key="processing"
            {...fadeInUp}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center text-center p-12 space-y-8 min-h-[500px] bg-gradient-to-br from-emerald-50/85 via-green-50/85 to-teal-50/85 rounded-2xl relative overflow-hidden"
          >
            <div className="absolute inset-0">
              <div className="absolute top-8 left-8 w-3 h-3 bg-emerald-400/25 rounded-full animate-pulse" />
              <div className="absolute top-20 right-12 w-2 h-2 bg-teal-400/30 rounded-full animate-bounce" />
              <div className="absolute bottom-16 left-16 w-4 h-4 bg-green-400/25 rounded-full animate-ping" />
              <div
                className="absolute bottom-8 right-8 w-3 h-3 bg-lime-400/25 rounded-full animate-pulse"
                style={{ animationDelay: "1s" }}
              />
            </div>

            <div className="absolute top-6 right-6">
              <motion.div {...floatingAnimation}>
                <Star className="h-8 w-8 text-yellow-400/60" fill="currentColor" />
              </motion.div>
            </div>
            <div className="absolute bottom-6 left-6">
              <motion.div {...floatingAnimation} transition={{ ...floatingAnimation.animate.transition, delay: 2 }}>
                <Receipt className="h-10 w-10 text-indigo-400/60" />
              </motion.div>
            </div>
            <div className="absolute top-1/3 left-6">
              <motion.div
                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                <Zap className="h-6 w-6 text-purple-400/60" />
              </motion.div>
            </div>

            <motion.div className="relative z-10">
              <motion.div
                animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                transition={{
                  rotate: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                  scale: { duration: 2, repeat: Number.POSITIVE_INFINITY },
                }}
                className="p-6 bg-gradient-to-br from-emerald-500 via-teal-500 to-green-600 rounded-full shadow-2xl relative"
              >
                <Loader2 className="h-20 w-20 text-white" />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="absolute inset-0 rounded-full"
                >
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-yellow-400 rounded-full" />
                  <div className="absolute top-1/2 -right-2 transform -translate-y-1/2 w-3 h-3 bg-pink-400 rounded-full" />
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-green-400 rounded-full" />
                  <div className="absolute top-1/2 -left-2 transform -translate-y-1/2 w-3 h-3 bg-orange-400 rounded-full" />
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div variants={staggerContainer} animate="animate" className="space-y-4 relative z-10">
              <motion.h2
                variants={fadeInUp}
                className="text-4xl font-bold bg-gradient-to-r from-emerald-700 via-teal-700 to-green-700 bg-clip-text text-transparent"
              >
                ✨ AI Magic in Progress...
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-muted-foreground max-w-lg text-xl leading-relaxed">
                Our advanced AI is carefully analyzing your receipt and extracting every detail with{" "}
                <span className="font-semibold text-transparent bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text">
                  precision
                </span>{" "}
                ✨
              </motion.p>
            </motion.div>

            <motion.div
              className="w-full max-w-md relative z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="h-4 bg-white/40 rounded-full overflow-hidden shadow-inner backdrop-blur-sm">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 3, ease: "easeInOut" }}
                  className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-green-600 rounded-full relative"
                >
                  <motion.div
                    animate={{ x: [-30, 400, -30] }}
                    transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    className="absolute inset-y-0 left-0 w-8 bg-white/40 rounded-full blur-sm"
                  />
                </motion.div>
              </div>
              <motion.p
                className="text-center mt-3 text-sm font-medium text-emerald-700"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              >
                🔍 Analyzing receipt data...
              </motion.p>
            </motion.div>
          </motion.div>
        )

      case "displaying":
        if (extractedData) {
          return (
            <motion.div
              key="displaying"
              {...fadeInUp}
              transition={{ duration: 0.4 }}
              className="bg-gradient-to-br from-emerald-50/30 via-green-50/30 to-teal-50/30 rounded-2xl "
            >
              <div className="bg-white/70 backdrop-blur-sm rounded-xl">
                <ReceiptDataDisplay
                  initialData={extractedData}
                  receiptImage={previewUrl!}
                  onSubmit={handleCreateWalletPass}
                  onCancel={resetState}
                />
              </div>
            </motion.div>
          )
        }
        return null

      case "pass_created":
        if (extractedData) {
          return (
            <motion.div
              key="pass_created"
              {...fadeInUp}
              transition={{ duration: 0.4 }}
              className="w-full max-w-md mx-auto p-10 bg-gradient-to-br from-emerald-50/90 via-green-50/90 to-teal-50/90 rounded-2xl relative overflow-hidden"
            >
              <div className="absolute inset-0">
                <div className="absolute top-4 left-4 w-3 h-3 bg-emerald-400/30 rounded-full animate-pulse" />
                <div className="absolute top-8 right-8 w-2 h-2 bg-green-400/40 rounded-full animate-bounce" />
                <div className="absolute bottom-8 left-8 w-4 h-4 bg-teal-400/30 rounded-full animate-ping" />
              </div>

              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="flex items-center justify-center mb-10 relative z-10"
              >
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="p-4 bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500 rounded-full shadow-2xl relative"
                >
                  <CheckCircle2 className="h-16 w-16 text-white" />
                  <motion.div
                    animate={{ scale: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
                    className="absolute inset-0 rounded-full bg-emerald-400/30"
                  />
                </motion.div>
                <div className="ml-6">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-700 via-green-700 to-teal-700 bg-clip-text text-transparent">
                    🎉 Success!
                  </h3>
                  <p className="text-lg text-emerald-600 font-semibold">Pass created perfectly!</p>
                  <p className="text-sm text-muted-foreground">Ready for your wallet ✨</p>
                </div>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} className="relative z-10 mb-8">
                <Button
                  variant="ghost"
                  onClick={backToDisplay}
                  className="hover:bg-emerald-100/80 text-emerald-700 border border-emerald-200"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Edit
                </Button>
              </motion.div>

              <div className="relative z-10">
                <WalletPass data={extractedData} saveUrl={saveUrl} />
              </div>
            </motion.div>
          )
        }
        return null

      case "error":
        return (
          <motion.div
            key="error"
            {...fadeInUp}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center text-center p-12 space-y-8 min-h-[400px] bg-gradient-to-br from-red-50/80 via-orange-50/80 to-pink-50/80 rounded-2xl relative overflow-hidden"
          >
            <div className="absolute inset-0">
              <div className="absolute top-6 left-6 w-3 h-3 bg-red-400/20 rounded-full animate-pulse" />
              <div className="absolute top-16 right-16 w-2 h-2 bg-orange-400/30 rounded-full animate-bounce" />
              <div className="absolute bottom-12 left-12 w-4 h-4 bg-pink-400/20 rounded-full animate-ping" />
            </div>

            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="relative z-10"
            >
              <div className="p-6 bg-gradient-to-br from-red-500 via-orange-500 to-pink-500 rounded-full shadow-2xl relative">
                <AlertCircle className="h-20 w-20 text-white" />
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="absolute inset-0 rounded-full bg-red-400/30"
                />
              </div>
            </motion.div>

            <motion.div variants={staggerContainer} animate="animate" className="space-y-4 relative z-10">
              <motion.h2
                variants={fadeInUp}
                className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent"
              >
                ⚠️ Oops! Something went wrong
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-muted-foreground max-w-lg text-lg leading-relaxed">
                {errorMessage}
              </motion.p>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative z-10">
              <Button
                onClick={resetState}
                className="bg-gradient-to-r from-red-500 via-orange-500 to-pink-500 hover:from-red-600 hover:via-orange-600 hover:to-pink-600 text-white px-10 py-4 text-lg font-bold shadow-2xl border-0"
              >
                <Sparkles className="mr-3 h-5 w-5" />✨ Try Again
              </Button>
            </motion.div>
          </motion.div>
        )

      case "idle":
      default:
        return (
          <motion.div
            key="idle"
            {...fadeInUp}
            transition={{ duration: 0.4 }}
            className="bg-gradient-to-br from-emerald-50/30 via-green-50/30 to-teal-50/30 rounded-2xl p-1"
          >
            <div className="bg-white/70 backdrop-blur-sm rounded-xl">
              <ReceiptUploader
                onFileChange={handleFileChange}
                onScan={handleScanReceipt}
                previewUrl={previewUrl}
                hasFile={!!file}
              />
            </div>
          </motion.div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50/60 to-teal-50/60 relative overflow-hidden">
      <LandingHeader />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-br from-emerald-200/15 to-teal-200/15 rounded-full blur-3xl" />
        <div className="absolute top-1/4 -right-32 w-80 h-80 bg-gradient-to-br from-green-200/15 to-emerald-200/15 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-20 w-[500px] h-[500px] bg-gradient-to-br from-emerald-200/15 to-teal-200/15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-emerald-100/5 to-teal-100/5 rounded-full blur-3xl" />
      </div>

      <main className="flex min-h-[calc(100vh-64px)] w-full flex-col items-center p-4 sm:p-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-2xl"
        >
          <motion.header
            variants={staggerContainer}
            animate="animate"
            className="flex flex-col items-center justify-center text-center mb-16"
          >
            <motion.div variants={fadeInUp} className="relative">
              <motion.h1
                className="text-6xl font-bold font-headline tracking-tight bg-gradient-to-r text-black bg-clip-text text-transparent mb-2 relative"
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
              >
                📋 Upload Receipt
              </motion.h1>

              <motion.div
                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                className="absolute -top-4 -right-12"
              >
                <Star className="h-10 w-10 text-yellow-400/60" fill="currentColor" />
              </motion.div>
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                className="absolute -top-2 -left-12"
              >
                <Sparkles className="h-8 w-8 text-blue-400/60" />
              </motion.div>
            </motion.div>

            <motion.p
              variants={fadeInUp}
              className="mt-6 text-xl text-muted-foreground max-w-2xl leading-relaxed font-medium"
            >
              Upload your receipt and watch our{" "}
              <span className="font-bold text-transparent bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text">
                ✨ magical AI
              </span>{" "}
              extract every detail with incredible precision!
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4 mt-8">
              <div className="px-4 py-2 bg-emerald-100/90 text-emerald-800 rounded-full text-sm font-semibold backdrop-blur-sm">
                🔍 AI-Powered
              </div>
              <div className="px-4 py-2 bg-teal-100/90 text-teal-800 rounded-full text-sm font-semibold backdrop-blur-sm">
                ⚡ Lightning Fast
              </div>
              <div className="px-4 py-2 bg-green-100/90 text-green-800 rounded-full text-sm font-semibold backdrop-blur-sm">
                🎯 Super Accurate
              </div>
            </motion.div>
          </motion.header>

          <motion.div layout transition={{ duration: 0.5, ease: "easeInOut" }}>
            <Card className="w-full overflow-hidden shadow-2xl transition-all duration-700 hover:shadow-3xl bg-white/90 backdrop-blur-md border-0 rounded-2xl">
              <CardContent className="p-0">
                <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </main>
    </div>
  )
}
