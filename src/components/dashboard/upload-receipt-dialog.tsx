'use client';

import { useState, useEffect, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { UploadCloud, Loader2 } from 'lucide-react';
import { getCategorySuggestion } from '@/app/actions';
import { receiptCategories } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  merchantName: z.string().min(2, {
    message: 'Merchant name must be at least 2 characters.',
  }),
  totalAmount: z.coerce.number().positive({
    message: 'Total amount must be a positive number.',
  }),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Please enter a valid date."
  }),
  category: z.string().min(1, { message: 'Please select a category.' }),
  receiptFile: z.any().optional(),
});

export function UploadReceiptDialog() {
  const [open, setOpen] = useState(false);
  const [isSuggesting, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      merchantName: '',
      totalAmount: 0,
      date: new Date().toISOString().split('T')[0],
      category: '',
    },
  });

  const merchantName = form.watch('merchantName');
  const totalAmount = form.watch('totalAmount');

  useEffect(() => {
    if (merchantName.length > 2 && totalAmount > 0) {
      const timer = setTimeout(() => {
        startTransition(async () => {
          const suggestion = await getCategorySuggestion({ merchantName, totalAmount });
          if (suggestion && receiptCategories.includes(suggestion)) {
            form.setValue('category', suggestion);
          }
        });
      }, 500); // Debounce for 0.5 seconds

      return () => clearTimeout(timer);
    }
  }, [merchantName, totalAmount, form]);


  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Receipt Uploaded",
      description: `${values.merchantName} receipt for $${values.totalAmount} was saved.`,
    })
    setOpen(false);
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <UploadCloud className="mr-2 h-4 w-4" />
          Upload Receipt
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload Receipt</DialogTitle>
          <DialogDescription>
            Add a new receipt to your wallet. Fill in the details below.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="merchantName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Merchant Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., SuperMart" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="totalAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Amount</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" placeholder="e.g., 42.50" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Category</FormLabel>
                    <div className="flex items-center gap-2">
                        <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {receiptCategories.map(cat => (
                                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {isSuggesting && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
                    </div>
                    <FormMessage />
                    </FormItem>
                )}
            />
             <FormField
                control={form.control}
                name="receiptFile"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Receipt Image (optional)</FormLabel>
                    <FormControl>
                        <Input type="file" onChange={(e) => field.onChange(e.target.files)} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
            <DialogFooter>
              <Button type="submit">Save Receipt</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
