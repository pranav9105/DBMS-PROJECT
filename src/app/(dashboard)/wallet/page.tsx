import { Wallet, CreditCard, Plus, TrendingUp, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

export default function WalletPage() {
  const cards = [
    {
      id: 1,
      name: 'Primary Card',
      type: 'Visa',
      last4: '4532',
      balance: 2450.75,
      color: 'emerald'
    },
    {
      id: 2,
      name: 'Savings Card',
      type: 'Mastercard',
      last4: '8901',
      balance: 5680.20,
      color: 'green'
    },
    {
      id: 3,
      name: 'Business Card',
      type: 'American Express',
      last4: '3456',
      balance: 1234.50,
      color: 'teal'
    }
  ];

  const transactions = [
    {
      id: 1,
      type: 'expense',
      merchant: 'Starbucks Coffee',
      amount: 12.50,
      date: '2024-01-15',
      category: 'Food & Drink'
    },
    {
      id: 2,
      type: 'income',
      merchant: 'Salary Deposit',
      amount: 3500.00,
      date: '2024-01-15',
      category: 'Income'
    },
    {
      id: 3,
      type: 'expense',
      merchant: 'Amazon',
      amount: 89.99,
      date: '2024-01-14',
      category: 'Shopping'
    },
    {
      id: 4,
      type: 'expense',
      merchant: 'Uber',
      amount: 23.45,
      date: '2024-01-14',
      category: 'Transport'
    }
  ];

  const getCardGradient = (color: string) => {
    switch (color) {
      case 'emerald': return 'from-emerald-500 to-emerald-600';
      case 'green': return 'from-green-500 to-green-600';
      case 'teal': return 'from-teal-500 to-teal-600';
      default: return 'from-slate-500 to-slate-600';
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
              Wallet 💳
            </h1>
            <p className="text-slate-600 text-lg">Manage your cards and view recent transactions.</p>
          </div>
          <button className="group relative inline-flex items-center justify-center rounded-xl text-sm font-semibold bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:from-emerald-600 hover:to-green-700 shadow-lg hover:shadow-xl hover:scale-105 h-12 px-6 py-3 transition-all duration-300">
            <Plus className="mr-2 h-5 w-5" />
            Add Card
          </button>
        </div>

        {/* Cards Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-slate-900 animate-fade-in-down" style={{ animationDelay: '0.1s' }}>Your Cards</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {cards.map((card, index) => (
              <div key={card.id} className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in-down" style={{ animationDelay: `${0.1 + index * 0.1}s` }}>
                <div className={`h-48 bg-gradient-to-br ${getCardGradient(card.color)} p-6 text-white relative`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
                  
                  <div className="relative z-10 h-full flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium opacity-90">{card.name}</span>
                      <CreditCard className="h-6 w-6 opacity-80" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm opacity-80">•••• •••• •••• {card.last4}</div>
                      <div className="text-xs opacity-70">{card.type}</div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-2xl font-bold">${card.balance.toLocaleString()}</div>
                      <div className="text-xs opacity-80">Available Balance</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-xl shadow-lg animate-fade-in-down" style={{ animationDelay: '0.4s' }}>
          <div className="p-6 border-b border-slate-200/50">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">Recent Transactions</h3>
              <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">View All</button>
            </div>
          </div>
          
          <div className="divide-y divide-slate-100">
            {transactions.map((transaction, index) => (
              <div key={transaction.id} className="p-4 hover:bg-slate-50/50 transition-colors duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.type === 'income' 
                        ? 'bg-emerald-100 text-emerald-600' 
                        : 'bg-red-100 text-red-600'
                    }`}>
                      {transaction.type === 'income' ? (
                        <ArrowDownLeft className="h-5 w-5" />
                      ) : (
                        <ArrowUpRight className="h-5 w-5" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-slate-900">{transaction.merchant}</div>
                      <div className="text-sm text-slate-500">{transaction.category}</div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className={`font-semibold ${
                      transaction.type === 'income' ? 'text-emerald-600' : 'text-slate-900'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                    </div>
                    <div className="text-sm text-slate-500">
                      {new Date(transaction.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Wallet Summary */}
        <div className="grid gap-6 md:grid-cols-3 animate-fade-in-down" style={{ animationDelay: '0.5s' }}>
          <div className="bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-xl p-6 shadow-lg">
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-2 bg-gradient-to-br from-emerald-100 to-green-100 rounded-lg">
                <Wallet className="h-5 w-5 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-slate-900">Total Balance</h3>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-2">
              ${cards.reduce((acc, card) => acc + card.balance, 0).toLocaleString()}
            </div>
            <div className="flex items-center space-x-1 text-emerald-600">
              <TrendingUp className="h-3 w-3" />
              <span className="text-sm">+5.2% this month</span>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-xl p-6 shadow-lg">
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-2 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg">
                <CreditCard className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="font-semibold text-slate-900">Active Cards</h3>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-2">{cards.length}</div>
            <div className="text-sm text-slate-600">Cards in your wallet</div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-xl p-6 shadow-lg">
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-2 bg-gradient-to-br from-teal-100 to-emerald-100 rounded-lg">
                <ArrowUpRight className="h-5 w-5 text-teal-600" />
              </div>
              <h3 className="font-semibold text-slate-900">This Month</h3>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-2">$1,234</div>
            <div className="text-sm text-slate-600">Total spent</div>
          </div>
        </div>
      </div>
    </div>
  );
}