import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Small Business Owner",
    content: "This app saved me hours of manual receipt entry. The AI is incredibly accurate!",
    rating: 5,
    avatar: "SC"
  },
  {
    name: "Marcus Rodriguez",
    role: "Freelancer",
    content: "Google Wallet integration is seamless. I can access my receipts anywhere, anytime.",
    rating: 5,
    avatar: "MR"
  },
  {
    name: "Emily Watson",
    role: "Marketing Manager",
    content: "The spending insights helped me save 20% on business expenses last quarter.",
    rating: 5,
    avatar: "EW"
  }
];

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-slate-900">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            Loved by Thousands
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.name} className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 hover:border-cyan-500/30 transition-all duration-300">
              <div className="flex items-center gap-2 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-slate-300 mb-4">{testimonial.content}</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-sm text-slate-400">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}