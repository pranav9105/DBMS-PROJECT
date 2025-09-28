import { useForm, Controller, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { motion } from "framer-motion"
import type { ExtractReceiptDataOutput } from "@/ai/flows/extract-receipt-data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CardHeader, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card"
import { Wallet, X, Trash2, Store, Calendar, CreditCard, Receipt, Sparkles, Edit3, Plus } from "lucide-react"
import { useEffect } from "react"
// import sampleReceipt from "@/assets/sample-receipt.jpg"

interface ReceiptDataDisplayProps {
  initialData: ExtractReceiptDataOutput
  receiptImage?: string
  onSubmit: (data: ExtractReceiptDataOutput) => void
  onCancel: () => void
}

const receiptItemSchema = z.object({
  name: z.string().min(1, "Item name is required."),
  quantity: z.coerce.number().min(1).optional(),
  price: z.coerce.number().min(0),
  total: z.coerce.number().optional(),
})

const receiptSchema = z.object({
  merchantName: z.string().min(1, "Merchant name is required."),
  merchantAddress: z.string().optional(),
  merchantPhone: z.string().optional(),
  transactionDate: z.string().min(1, "Date is required."),
  transactionTime: z.string().optional(),
  items: z.array(receiptItemSchema),
  currency: z.string().optional(),
  subtotal: z.coerce.number().optional(),
  discounts: z.coerce.number().optional(),
  taxAmount: z.coerce.number().optional(),
  tipAmount: z.coerce.number().optional(),
  totalAmount: z.coerce.number(),
  paymentMethod: z.string().optional(),
  last4Digits: z.string().optional(),
  receiptId: z.string().optional(),
  summary: z.string().optional(),
})

type FormData = z.infer<typeof receiptSchema>

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export function ReceiptDataDisplay({ initialData, receiptImage, onSubmit, onCancel }: ReceiptDataDisplayProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(receiptSchema),
    defaultValues: {
      merchantName: initialData.merchantName || "Unknown Merchant",
      merchantAddress: initialData.merchantAddress || "",
      merchantPhone: initialData.merchantPhone || "",
      transactionDate: initialData.transactionDate || new Date().toISOString().slice(0, 10),
      transactionTime: initialData.transactionTime || "",
      items:
        initialData.items && initialData.items.length > 0
          ? initialData.items
          : [{ name: "Item", quantity: 1, price: 0, total: 0 }],
      currency: initialData.currency || "USD",
      subtotal: initialData.subtotal ?? 0,
      discounts: initialData.discounts ?? 0,
      taxAmount: initialData.taxAmount ?? 0,
      tipAmount: initialData.tipAmount ?? 0,
      totalAmount: initialData.totalAmount ?? 0,
      paymentMethod: initialData.paymentMethod || "",
      last4Digits: initialData.last4Digits || "",
      receiptId: initialData.receiptId || "",
      summary: initialData.summary || "No summary provided yet. You can edit this description.",
    },
  })

  const { fields, remove, append } = useFieldArray({
    control,
    name: "items",
  })

  useEffect(() => {
    if (fields.length === 0) {
      append({ name: "Item", quantity: 1, price: 0, total: 0 })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fields.length])

  const handleFormSubmit = (data: FormData) => {
    onSubmit(data as ExtractReceiptDataOutput)
  }

  const addNewItem = () => {
    append({
      name: "New Item",
      quantity: 1,
      price: 0,
      total: 0,
    })
  }

  return (
    <div className="w-full max-w-10xl mx-auto bg-gradient-to-br from-emerald-50/40 to-teal-50/40 rounded-2xl overflow-hidden">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        {/* Enhanced Header */}
        <CardHeader className="bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-blue-500/10 border-b border-emerald-200/30 px-8 py-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center space-x-3"
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="p-3 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full shadow-lg"
            >
              <Edit3 className="h-6 w-6 text-white" />
            </motion.div>
            <div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">
                ✨ Extracted Receipt Data
              </CardTitle>
              <CardDescription className="text-lg text-muted-foreground font-medium mt-1">
                Review and edit the AI-extracted information from your receipt
              </CardDescription>
            </div>
          </motion.div>
        </CardHeader>

        <CardContent className="p-2">
          <div className="grid grid-cols-1  gap-8">
            {/* Left Column - Form Fields */}
            <motion.div variants={staggerContainer} animate="animate" className="space-y-8">
              {/* Merchant Details Section */}
              <motion.div
                variants={fadeInUp}
                className="p-6 bg-white/80 backdrop-blur-sm border border-emerald-200/50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center mb-6">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    className="p-2 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full mr-3"
                  >
                    <Store className="h-5 w-5 text-white" />
                  </motion.div>
                  <h4 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    🏪 Merchant Details
                  </h4>
                </div>

                <div className="space-y-5">
                  <div>
                    <Label htmlFor="merchantName" className="text-sm font-semibold text-gray-700 mb-2 block">
                      Merchant Name *
                    </Label>
                    <Controller
                      name="merchantName"
                      control={control}
                      render={({ field }) => (
                        <Input
                          id="merchantName"
                          {...field}
                          placeholder="e.g., Whole Foods Market"
                          className="w-full text-base border-2 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-lg h-11"
                        />
                      )}
                    />
                    {errors.merchantName && (
                      <motion.p
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-sm text-red-500 mt-1 font-medium"
                      >
                        {errors.merchantName.message}
                      </motion.p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <Label htmlFor="merchantAddress" className="text-sm font-semibold text-gray-700 mb-2 block">
                        Address
                      </Label>
                      <Controller
                        name="merchantAddress"
                        control={control}
                        render={({ field }) => (
                          <Input
                            id="merchantAddress"
                            {...field}
                            placeholder="123 Main St, City"
                            className="w-full text-base border-2 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-lg h-11"
                          />
                        )}
                      />
                    </div>
                    <div>
                      <Label htmlFor="merchantPhone" className="text-sm font-semibold text-gray-700 mb-2 block">
                        Phone
                      </Label>
                      <Controller
                        name="merchantPhone"
                        control={control}
                        render={({ field }) => (
                          <Input
                            id="merchantPhone"
                            {...field}
                            placeholder="+1 (555) 012-3456"
                            className="w-full text-base border-2 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-lg h-11"
                          />
                        )}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Transaction Details Section */}
              <motion.div
                variants={fadeInUp}
                className="p-6 bg-white/85 backdrop-blur-sm border border-emerald-200/60 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center mb-6">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="p-2 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full mr-3"
                  >
                    <Calendar className="h-5 w-5 text-white" />
                  </motion.div>
                  <h4 className="text-xl font-bold bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">
                    📅 Transaction Details
                  </h4>
                </div>

                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <Label htmlFor="transactionDate" className="text-sm font-semibold text-gray-700 mb-2 block">
                        Date *
                      </Label>
                      <Controller
                        name="transactionDate"
                        control={control}
                        render={({ field }) => (
                          <Input
                            id="transactionDate"
                            type="date"
                            {...field}
                            className="w-full text-base border-2 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-lg h-11"
                          />
                        )}
                      />
                      {errors.transactionDate && (
                        <motion.p
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="text-sm text-red-500 mt-1 font-medium"
                        >
                          {errors.transactionDate.message}
                        </motion.p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="transactionTime" className="text-sm font-semibold text-gray-700 mb-2 block">
                        Time
                      </Label>
                      <Controller
                        name="transactionTime"
                        control={control}
                        render={({ field }) => (
                          <Input
                            id="transactionTime"
                            type="time"
                            {...field}
                            className="w-full text-base border-2 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-lg h-11"
                          />
                        )}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="receiptId" className="text-sm font-semibold text-gray-700 mb-2 block">
                      Receipt ID
                    </Label>
                    <Controller
                      name="receiptId"
                      control={control}
                      render={({ field }) => (
                        <Input
                          id="receiptId"
                          {...field}
                          placeholder="Optional ID from merchant"
                          className="w-full text-base border-2 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-lg h-11"
                        />
                      )}
                    />
                  </div>
                </div>
              </motion.div>

              {/* Payment Details Section */}
              <motion.div
                variants={fadeInUp}
                className="p-6 bg-white/85 backdrop-blur-sm border border-emerald-200/60 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center mb-6">
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                    className="p-2 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full mr-3"
                  >
                    <CreditCard className="h-5 w-5 text-white" />
                  </motion.div>
                  <h4 className="text-xl font-bold bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">
                    💳 Payment & Totals
                  </h4>
                </div>

                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <Label htmlFor="paymentMethod" className="text-sm font-semibold text-gray-700 mb-2 block">
                        Payment Method
                      </Label>
                      <Controller
                        name="paymentMethod"
                        control={control}
                        render={({ field }) => (
                          <Input
                            id="paymentMethod"
                            {...field}
                            placeholder="e.g., Visa, Cash, Apple Pay"
                            className="w-full text-base border-2 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-lg h-11"
                          />
                        )}
                      />
                    </div>
                    <div>
                      <Label htmlFor="last4Digits" className="text-sm font-semibold text-gray-700 mb-2 block">
                        Last 4 Digits
                      </Label>
                      <Controller
                        name="last4Digits"
                        control={control}
                        render={({ field }) => (
                          <Input
                            id="last4Digits"
                            {...field}
                            placeholder="1234"
                            className="w-full text-base border-2 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-lg h-11"
                          />
                        )}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="currency" className="text-sm font-semibold text-gray-700 mb-2 block">
                      Currency
                    </Label>
                    <Controller
                      name="currency"
                      control={control}
                      render={({ field }) => (
                        <Input
                          id="currency"
                          {...field}
                          placeholder="USD, EUR, GBP"
                          className="w-full text-base border-2 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-lg h-11"
                        />
                      )}
                    />
                  </div>

                  {/* Financial breakdown */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor="subtotal" className="text-sm font-semibold text-gray-700 mb-2 block">
                        Subtotal
                      </Label>
                      <Controller
                        name="subtotal"
                        control={control}
                        render={({ field }) => (
                          <Input
                            id="subtotal"
                            type="number"
                            step="0.01"
                            min="0"
                            placeholder="0.00"
                            {...field}
                            className="w-full text-base font-medium text-gray-900 bg-white border-2 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-lg h-11"
                          />
                        )}
                      />
                    </div>
                    <div>
                      <Label htmlFor="discounts" className="text-sm font-semibold text-gray-700 mb-2 block">
                        Discounts
                      </Label>
                      <Controller
                        name="discounts"
                        control={control}
                        render={({ field }) => (
                          <Input
                            id="discounts"
                            type="number"
                            step="0.01"
                            min="0"
                            placeholder="0.00"
                            {...field}
                            className="w-full text-base font-medium text-gray-900 bg-white border-2 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-lg h-11"
                          />
                        )}
                      />
                    </div>
                    <div>
                      <Label htmlFor="taxAmount" className="text-sm font-semibold text-gray-700 mb-2 block">
                        Tax
                      </Label>
                      <Controller
                        name="taxAmount"
                        control={control}
                        render={({ field }) => (
                          <Input
                            id="taxAmount"
                            type="number"
                            step="0.01"
                            min="0"
                            placeholder="0.00"
                            {...field}
                            className="w-full text-base font-medium text-gray-900 bg-white border-2 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-lg h-11"
                          />
                        )}
                      />
                    </div>
                    <div>
                      <Label htmlFor="totalAmount" className="text-sm font-semibold text-gray-700 mb-2 block">
                        Total *
                      </Label>
                      <Controller
                        name="totalAmount"
                        control={control}
                        render={({ field }) => (
                          <Input
                            id="totalAmount"
                            type="number"
                            step="0.01"
                            min="0"
                            placeholder="0.00"
                            {...field}
                            className="w-full text-base font-bold text-emerald-700 bg-emerald-50 border-2 border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-lg h-11"
                          />
                        )}
                      />
                      {errors.totalAmount && (
                        <motion.p
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="text-sm text-red-500 mt-1 font-medium"
                        >
                          {errors.totalAmount.message}
                        </motion.p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Receipt Image & Items */}
            <motion.div variants={staggerContainer} animate="animate" className="space-y-8">
              {/* Receipt Image */}
              <motion.div variants={fadeInUp} className="relative">
                <div className="relative h-96 w-full rounded-xl overflow-hidden shadow-2xl bg-white/80 backdrop-blur-sm border-2 border-gray-200/50 hover:shadow-3xl transition-all duration-300">
                  <img 
                    src={receiptImage } 
                    alt="Receipt" 
                    className="w-full h-full object-contain p-6"
                  />

                  {/* Image overlay with gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-black/5 rounded-xl pointer-events-none" />

                  {/* Floating label */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="absolute top-4 right-4 bg-emerald-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg"
                  >
                    📸 Original Receipt
                  </motion.div>
                 </div>
               </motion.div>

               {/* Items Section */}
               <motion.div
                 variants={fadeInUp}
                 className="p-6 bg-white/85 backdrop-blur-sm border border-emerald-200/60 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
               >
                 <div className="flex items-center justify-between mb-6">
                   <div className="flex items-center">
                     <motion.div
                       animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                       transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                       className="p-2 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full mr-3"
                     >
                       <Receipt className="h-5 w-5 text-white" />
                     </motion.div>
                     <h4 className="text-xl font-bold bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">
                       🛍️ Items ({fields.length})
                     </h4>
                   </div>

                   <Button
                     type="button"
                     onClick={addNewItem}
                     size="sm"
                     className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white border-0 shadow-lg px-4 py-2"
                   >
                     <Plus className="h-4 w-4 mr-1" />
                     Add Item
                   </Button>
                 </div>

                 <div className="space-y-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                   {fields.length > 0
                     ? fields.map((item, index) => (
                         <motion.div
                           key={item.id}
                           initial={{ opacity: 0, x: -20 }}
                           animate={{ opacity: 1, x: 0 }}
                           transition={{ delay: index * 0.05 }}
                           className="grid grid-cols-[2fr_80px_100px_40px] gap-3 items-center p-4 bg-gradient-to-r from-emerald-50/85 to-teal-50/85 rounded-lg border border-emerald-200/50 hover:shadow-md transition-all duration-200"
                         >
                           <div>
                             <Controller
                               name={`items.${index}.name`}
                               control={control}
                               render={({ field }) => (
                                 <Input
                                   placeholder="Item name"
                                   {...field}
                                   className="w-full text-base border-2 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-md h-10"
                                 />
                               )}
                             />
                             {errors.items?.[index]?.name && (
                               <p className="text-xs text-red-500 mt-1">{errors.items[index].name?.message}</p>
                             )}
                           </div>
                           <Controller
                             name={`items.${index}.quantity`}
                             control={control}
                             render={({ field }) => (
                               <Input
                                 type="number"
                                 className="w-full text-base text-center border-2 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-md h-10"
                                 placeholder="Qty"
                                 {...field}
                               />
                             )}
                           />
                           <Controller
                             name={`items.${index}.price`}
                             control={control}
                             render={({ field }) => (
                               <Input
                                 type="number"
                                 step="0.01"
                                 className="w-full text-base text-center border-2 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-md h-10"
                                 placeholder="Price"
                                 {...field}
                               />
                             )}
                           />
                           <Button
                             type="button"
                             variant="ghost"
                             size="icon"
                             onClick={() => remove(index)}
                             className="h-10 w-10 text-red-500 hover:text-red-700 hover:bg-red-100/80 rounded-full"
                             aria-label="Remove item"
                             title="Remove item"
                           >
                             <Trash2 className="h-4 w-4" />
                           </Button>
                         </motion.div>
                       ))
                     : null}
                 </div>
               </motion.div>

               {/* Summary Section */}
               <motion.div
                 variants={fadeInUp}
                 className="p-6 bg-white/80 backdrop-blur-sm border border-teal-200/50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
               >
                 <div className="flex items-center mb-4">
                   <motion.div
                     animate={{ scale: [1, 1.1, 1] }}
                     transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                     className="p-2 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full mr-3"
                   >
                     <Sparkles className="h-5 w-5 text-white" />
                   </motion.div>
                   <h4 className="text-xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                     📝 AI Summary
                   </h4>
                 </div>

                 <Controller
                   name="summary"
                   control={control}
                   render={({ field }) => (
                     <Textarea
                       id="summary"
                       rows={4}
                       {...field}
                       placeholder="AI-generated summary of your purchase..."
                       className="w-full text-base border-2 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-lg resize-none"
                     />
                   )}
                 />
               </motion.div>
            </motion.div>
          </div>
        </CardContent>

        {/* Enhanced Footer */}
        <CardFooter className="flex justify-between items-center px-8 py-6 bg-gradient-to-r from-gray-50/90 to-emerald-50/70 border-t border-gray-200/30">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="px-6 py-3 border-2 border-gray-300 hover:border-red-400 hover:bg-red-50 text-gray-700 hover:text-red-700 rounded-lg font-semibold transition-all duration-200 bg-transparent text-base"
          >
            <X className="mr-2 h-5 w-5" />
            Cancel
          </Button>

          <Button
            type="submit"
            className="px-8 py-3 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600 text-white rounded-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 border-0 text-base"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="inline-block"
            >
              <Wallet className="mr-3 h-5 w-5 inline" />
            </motion.div>
            ✨ Create Wallet Pass
          </Button>
        </CardFooter>
      </form>
    </div>
  )
}