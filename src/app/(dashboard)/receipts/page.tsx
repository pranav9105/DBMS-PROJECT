"use client"
import { useState } from 'react';
import { Receipt, Search, Filter, Plus, Calendar, DollarSign, Tag } from 'lucide-react';
import { receipts as initialReceipts } from '../data';

export default function ReceiptsPage() {
  const [receipts] = useState(initialReceipts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'groceries', 'food', 'shopping', 'transport', 'entertainment'];
  
  const filteredReceipts = receipts.filter(receipt => {
    const matchesSearch = receipt.merchant.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || receipt.category.toLowerCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'groceries': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'food': return 'bg-green-100 text-green-700 border-green-200';
      case 'shopping': return 'bg-teal-100 text-teal-700 border-teal-200';
      case 'transport': return 'bg-cyan-100 text-cyan-700 border-cyan-200';
      case 'entertainment': return 'bg-lime-100 text-lime-700 border-lime-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-green-50/50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-200/20 to-green-200/20 rounded-full blur-3xl -translate-y-48 translate-x-48 animate-pulse"></div>
      
      <div className="relative z-10 flex-1 space-y-8 p-4 md:p-8 pt-6">
        {/* Header */}
        <div className="flex items-center justify-between animate-fade-in-down">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 bg-clip-text text-transparent">
              All Receipts 📄
            </h1>
            <p className="text-slate-600 text-lg">Manage and organize all your receipts in one place.</p>
          </div>
          <button className="group relative inline-flex items-center justify-center rounded-xl text-sm font-semibold bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:from-emerald-600 hover:to-green-700 shadow-lg hover:shadow-xl hover:scale-105 h-12 px-6 py-3 transition-all duration-300">
            <Plus className="mr-2 h-5 w-5" />
            Add Receipt
          </button>
        </div>

        {/* Search and Filter */}
        <div className="bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-xl p-6 shadow-lg animate-fade-in-down" style={{ animationDelay: '0.1s' }}>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search receipts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-white"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Receipts Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 animate-fade-in-down" style={{ animationDelay: '0.2s' }}>
          {filteredReceipts.map((receipt, index) => (
            <div key={receipt.id} className="group bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-green-100 rounded-xl flex items-center justify-center">
                  <Receipt className="h-6 w-6 text-emerald-600" />
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getCategoryColor(receipt.category)}`}>
                  {receipt.category}
                </span>
              </div>
              
              <div className="space-y-3">
                <h3 className="font-semibold text-slate-900 text-lg">{receipt.merchant}</h3>
                
                <div className="flex items-center space-x-2 text-slate-600">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">
                    {new Date(receipt.date).toLocaleDateString('en-US', { 
                      weekday: 'short', 
                      month: 'short', 
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-emerald-600" />
                    <span className="font-bold text-xl text-slate-900">${receipt.total.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-slate-500">
                    <Tag className="h-3 w-3" />
                    <span className="text-xs">{receipt.items?.length || 0} items</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredReceipts.length === 0 && (
          <div className="text-center py-12 animate-fade-in-down" style={{ animationDelay: '0.3s' }}>
            <Receipt className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-600 mb-2">No receipts found</h3>
            <p className="text-slate-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}