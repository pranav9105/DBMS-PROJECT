import { CreditCard, Plus, Shield, Calendar, TrendingUp } from 'lucide-react';

export default function CardsPage() {
  const cards = [
    {
      id: 1,
      name: 'Emerald Rewards Card',
      type: 'Visa',
      last4: '4532',
      balance: 2450.75,
      limit: 5000,
      color: 'emerald',
      rewards: '2% Cashback',
      expires: '12/26'
    },
    {
      id: 2,
      name: 'Green Savings Card',
      type: 'Mastercard',
      last4: '8901',
      balance: 5680.20,
      limit: 10000,
      color: 'green',
      rewards: '1.5% APY',
      expires: '08/27'
    },
    {
      id: 3,
      name: 'Business Platinum',
      type: 'American Express',
      last4: '3456',
      balance: 1234.50,
      limit: 15000,
      color: 'teal',
      rewards: '3x Points',
      expires: '04/25'
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
              Cards 💳
            </h1>
            <p className="text-slate-600 text-lg">Manage your credit and debit cards with detailed insights.</p>
          </div>
          <button className="group relative inline-flex items-center justify-center rounded-xl text-sm font-semibold bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:from-emerald-600 hover:to-green-700 shadow-lg hover:shadow-xl hover:scale-105 h-12 px-6 py-3 transition-all duration-300">
            <Plus className="mr-2 h-5 w-5" />
            Add New Card
          </button>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, index) => (
            <div key={card.id} className="group animate-fade-in-down" style={{ animationDelay: `${0.1 + index * 0.1}s` }}>
              {/* Card Visual */}
              <div className="relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 mb-4">
                <div className={`h-56 bg-gradient-to-br ${getCardGradient(card.color)} p-6 text-white relative`}>
                  <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-16 -translate-x-16"></div>
                  
                  <div className="relative z-10 h-full flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium opacity-90">{card.name}</div>
                        <div className="text-xs opacity-70 mt-1">{card.rewards}</div>
                      </div>
                      <CreditCard className="h-8 w-8 opacity-80" />
                    </div>
                    
                    <div className="space-y-4">
                      <div className="text-xl font-mono tracking-wider">
                        •••• •••• •••• {card.last4}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xs opacity-70">EXPIRES</div>
                          <div className="text-sm font-medium">{card.expires}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs opacity-70">{card.type.toUpperCase()}</div>
                          <div className="text-sm font-medium">CARD</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Details */}
              <div className="bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-xl p-6 shadow-lg">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-600">Current Balance</span>
                    <span className="text-lg font-bold text-slate-900">${card.balance.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-600">Credit Limit</span>
                    <span className="text-sm text-slate-700">${card.limit.toLocaleString()}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-slate-600">Usage</span>
                      <span className="text-sm text-emerald-600">
                        {Math.round((card.balance / card.limit) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className={`h-2 bg-gradient-to-r ${getCardGradient(card.color)} rounded-full transition-all duration-700`}
                        style={{ width: `${(card.balance / card.limit) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="pt-2 border-t border-slate-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Available Credit</span>
                      <span className="font-semibold text-emerald-600">
                        ${(card.limit - card.balance).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Card Statistics */}
        <div className="grid gap-6 md:grid-cols-3 animate-fade-in-down" style={{ animationDelay: '0.4s' }}>
          <div className="bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-xl p-6 shadow-lg">
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-2 bg-gradient-to-br from-emerald-100 to-green-100 rounded-lg">
                <CreditCard className="h-5 w-5 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-slate-900">Total Credit</h3>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-2">
              ${cards.reduce((acc, card) => acc + card.limit, 0).toLocaleString()}
            </div>
            <div className="text-sm text-slate-600">Available across all cards</div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-xl p-6 shadow-lg">
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-2 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="font-semibold text-slate-900">Total Balance</h3>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-2">
              ${cards.reduce((acc, card) => acc + card.balance, 0).toLocaleString()}
            </div>
            <div className="text-sm text-slate-600">Current outstanding balance</div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-xl p-6 shadow-lg">
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-2 bg-gradient-to-br from-teal-100 to-emerald-100 rounded-lg">
                <Shield className="h-5 w-5 text-teal-600" />
              </div>
              <h3 className="font-semibold text-slate-900">Credit Utilization</h3>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-2">
              {Math.round((cards.reduce((acc, card) => acc + card.balance, 0) / cards.reduce((acc, card) => acc + card.limit, 0)) * 100)}%
            </div>
            <div className="text-sm text-slate-600">Overall utilization rate</div>
          </div>
        </div>

        {/* Security Features */}
        <div className="bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-xl p-6 shadow-lg animate-fade-in-down" style={{ animationDelay: '0.5s' }}>
          <div className="flex items-center space-x-2 mb-6">
            <Shield className="h-5 w-5 text-emerald-600" />
            <h3 className="text-lg font-semibold text-slate-900">Security & Protection</h3>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: 'Fraud Protection', status: 'Active', color: 'emerald' },
              { title: 'Real-time Alerts', status: 'Enabled', color: 'green' },
              { title: 'Secure Transactions', status: 'Protected', color: 'teal' },
              { title: 'Identity Monitoring', status: 'Active', color: 'emerald' }
            ].map((feature, index) => (
              <div key={index} className="text-center p-4 rounded-lg bg-gradient-to-br from-emerald-50 to-green-50">
                <p className="text-sm font-medium text-slate-600 mb-2">{feature.title}</p>
                <p className="text-sm font-semibold text-emerald-600">{feature.status}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}