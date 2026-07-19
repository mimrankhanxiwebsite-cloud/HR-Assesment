import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const FAQS = [
  {
    q: 'How does the AI code review work?',
    a: 'Our AI analyzes candidate code submissions not just for correct output, but for code quality, efficiency (time/space complexity), security vulnerabilities, and adherence to industry best practices.',
  },
  {
    q: 'Can I create my own custom assessments?',
    a: 'Yes! While we provide 50+ scientifically validated templates out of the box, our drag-and-drop builder allows you to create custom exams using your own questions or our question bank.',
  },
  {
    q: 'How does the anti-cheat system work?',
    a: 'We use a combination of tab-switch tracking, copy-paste detection, and fullscreen enforcement to ensure assessment integrity. Any suspicious behavior flags the attempt for manual review.',
  },
  {
    q: 'Does it integrate with my ATS?',
    a: 'We offer out-of-the-box integrations with Greenhouse, Lever, Workday, and BambooHR on our Professional and Enterprise plans. We also provide a comprehensive REST API for custom integrations.',
  },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-24 bg-slate-50 border-t border-slate-100">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <div 
              key={i} 
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-shadow"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <div className="p-6 flex justify-between items-center">
                <h3 className="font-bold text-slate-900 pr-8">{faq.q}</h3>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0"
                >
                  <ChevronDown className="w-5 h-5 text-slate-500" />
                </motion.div>
              </div>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 text-slate-600 leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
