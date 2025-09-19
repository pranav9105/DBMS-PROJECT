'use client'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Trash2, Eye } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from "@/components/ui/badge";
import { Receipt } from '@/lib/data';
import { useState } from 'react';

export function RecentReceipts({ receiptList, setReceiptList }: { receiptList: Receipt[], setReceiptList: React.Dispatch<React.SetStateAction<Receipt[]>> }) {
    
    const handleDelete = (id: string) => {
        setReceiptList(receiptList.filter(receipt => receipt.id !== id));
    }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Receipts</CardTitle>
        <CardDescription>A list of your most recent receipt uploads.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Merchant</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {receiptList.slice(0, 5).map((receipt) => (
              <TableRow key={receipt.id}>
                <TableCell>{new Date(receipt.date).toLocaleDateString()}</TableCell>
                <TableCell className="font-medium">{receipt.merchant}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{receipt.category}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  ${receipt.total.toFixed(2)}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(receipt.id)} className="text-destructive focus:text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
