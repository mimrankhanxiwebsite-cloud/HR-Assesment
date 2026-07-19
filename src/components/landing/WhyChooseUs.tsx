import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

function AnimatedCounter({ end, suffix = '', label }: { end: number, suffix?: string, label: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const updateCounter = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / 2000, 1)
      
      // Easing function (easeOutExpo)
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      
      setCount(Math.floor(easeProgress * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCounter)
      }
    }

    animationFrame = requestAnimationFrame(updateCounter)
    return () => cancelAnimationFrame(animationFrame)
  }, [end])

  return (
    <div className="text-center">
      <div className="text-4xl md:text-6xl font-black text-slate-900 mb-2">
        {count}{suffix}
      </div>
      <div className="text-sm md:text-base font-semibold text-slate-500 uppercase tracking-wider">
        {label}
      </div>
    </div>
  )
}

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-white border-y border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 divide-x divide-slate-100">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <AnimatedCounter end={98} suffix="%" label="Assessment Accuracy" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <AnimatedCounter end={75} suffix="%" label="Reduced Hiring Time" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <AnimatedCounter end={20} suffix="K+" label="Monthly Candidates" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
            <AnimatedCounter end={99} suffix=".9%" label="System Uptime" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
