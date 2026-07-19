import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const TESTIMONIALS = [
  {
    name: 'Sarah Chen',
    position: 'VP of Engineering',
    company: 'TechFlow',
    avatar: 'SC',
    color: 'from-blue-500 to-indigo-500',
    review: 'This platform completely transformed how we hire. The AI code review is remarkably accurate and saves our senior engineers over 15 hours a week in technical interviews.',
  },
  {
    name: 'Marcus Johnson',
    position: 'Head of Talent Acquisition',
    company: 'Global AI Solutions',
    avatar: 'MJ',
    color: 'from-emerald-400 to-teal-500',
    review: 'We were struggling with biased hiring processes. The standardized scoring and automated behavioral analysis helped us build a much more diverse and capable team.',
  },
  {
    name: 'Elena Rodriguez',
    position: 'CTO',
    company: 'Nexus Finance',
    avatar: 'ER',
    color: 'from-purple-500 to-pink-500',
    review: 'The system design and architecture assessments are top-notch. It\'s incredibly difficult to test for those skills at scale, but this platform nails it perfectly.',
  },
]

export default function Testimonials() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            Loved by engineering leaders
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what top technical hiring managers have to say.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, i) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-brand-md hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <div className="flex gap-1 mb-6">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star key={star} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-slate-700 leading-relaxed mb-8 flex-1 text-lg">
                "{testimonial.review}"
              </p>
              <div className="flex items-center gap-4 mt-auto">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-white font-bold shadow-inner`}>
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-bold text-slate-900">{testimonial.name}</div>
                  <div className="text-sm text-slate-500">{testimonial.position}, {testimonial.company}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
