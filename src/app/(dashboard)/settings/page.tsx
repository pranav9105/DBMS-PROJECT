import { Settings, User, Bell, Shield, Palette, Globe, HelpCircle } from 'lucide-react';

export default function SettingsPage() {
  const settingsSections = [
    {
      title: 'Profile Settings',
      icon: User,
      items: [
        { name: 'Personal Information', description: 'Update your name, email, and profile picture' },
        { name: 'Account Preferences', description: 'Manage your account settings and preferences' },
        { name: 'Privacy Settings', description: 'Control who can see your information' }
      ]
    },
    {
      title: 'Notifications',
      icon: Bell,
      items: [
        { name: 'Push Notifications', description: 'Receive alerts for new receipts and transactions' },
        { name: 'Email Notifications', description: 'Get weekly summaries and important updates' },
        { name: 'SMS Alerts', description: 'Receive text messages for urgent notifications' }
      ]
    },
    {
      title: 'Security',
      icon: Shield,
      items: [
        { name: 'Two-Factor Authentication', description: 'Add an extra layer of security to your account' },
        { name: 'Password Settings', description: 'Change your password and security questions' },
        { name: 'Login History', description: 'View recent login activity and manage sessions' }
      ]
    },
    {
      title: 'Appearance',
      icon: Palette,
      items: [
        { name: 'Theme Settings', description: 'Choose between light, dark, or auto theme' },
        { name: 'Color Preferences', description: 'Customize the app colors to your liking' },
        { name: 'Display Options', description: 'Adjust font size and layout preferences' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-green-50/50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-200/20 to-green-200/20 rounded-full blur-3xl -translate-y-48 translate-x-48 animate-pulse"></div>
      
      <div className="relative z-10 flex-1 space-y-8 p-4 md:p-8 pt-6">
        {/* Header */}
        <div className="animate-fade-in-down">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 bg-clip-text text-transparent mb-2">
            Settings ⚙️
          </h1>
          <p className="text-slate-600 text-lg">Customize your Walletie experience and manage your preferences.</p>
        </div>

        {/* Settings Sections */}
        <div className="space-y-8">
          {settingsSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-xl shadow-lg animate-fade-in-down" style={{ animationDelay: `${0.1 + sectionIndex * 0.1}s` }}>
              <div className="p-6 border-b border-slate-200/50">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-br from-emerald-100 to-green-100 rounded-lg">
                    <section.icon className="h-5 w-5 text-emerald-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-slate-900">{section.title}</h2>
                </div>
              </div>
              
              <div className="divide-y divide-slate-100">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="p-6 hover:bg-slate-50/50 transition-colors duration-200 cursor-pointer group">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h3 className="font-medium text-slate-900 group-hover:text-emerald-600 transition-colors">
                          {item.name}
                        </h3>
                        <p className="text-sm text-slate-600">{item.description}</p>
                      </div>
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-white text-xs">→</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 animate-fade-in-down" style={{ animationDelay: '0.5s' }}>
          <div className="bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-emerald-100 to-green-100 rounded-lg">
                <Globe className="h-5 w-5 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-slate-900">Language & Region</h3>
            </div>
            <p className="text-sm text-slate-600 mb-4">Change your language and regional settings</p>
            <div className="text-sm font-medium text-emerald-600 group-hover:text-emerald-700">
              Current: English (US)
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg">
                <HelpCircle className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="font-semibold text-slate-900">Help & Support</h3>
            </div>
            <p className="text-sm text-slate-600 mb-4">Get help with using Walletie or contact support</p>
            <div className="text-sm font-medium text-green-600 group-hover:text-green-700">
              Visit Help Center
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-teal-100 to-emerald-100 rounded-lg">
                <Settings className="h-5 w-5 text-teal-600" />
              </div>
              <h3 className="font-semibold text-slate-900">Advanced Settings</h3>
            </div>
            <p className="text-sm text-slate-600 mb-4">Access advanced configuration options</p>
            <div className="text-sm font-medium text-teal-600 group-hover:text-teal-700">
              Configure Advanced
            </div>
          </div>
        </div>

        {/* Account Information */}
        <div className="bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-xl p-6 shadow-lg animate-fade-in-down" style={{ animationDelay: '0.6s' }}>
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Account Information</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-600">Account Type</label>
              <div className="text-sm text-slate-900 bg-emerald-50 px-3 py-2 rounded-lg border border-emerald-200">
                Premium Account
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-600">Member Since</label>
              <div className="text-sm text-slate-900 bg-slate-50 px-3 py-2 rounded-lg border border-slate-200">
                January 2024
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-600">Data Usage</label>
              <div className="text-sm text-slate-900 bg-slate-50 px-3 py-2 rounded-lg border border-slate-200">
                2.3 GB of 10 GB used
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-600">Last Backup</label>
              <div className="text-sm text-slate-900 bg-slate-50 px-3 py-2 rounded-lg border border-slate-200">
                2 hours ago
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}