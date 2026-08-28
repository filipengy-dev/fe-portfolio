import { useEffect } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

// Jemná fialová záře, která následuje kurzor po celém webu.
export default function CursorGlow() {
  const reduce = useReducedMotion()
  const mx = useMotionValue(-600)
  const my = useMotionValue(-600)
  const x = useSpring(mx, { stiffness: 120, damping: 26, restDelta: 0.5 })
  const y = useSpring(my, { stiffness: 120, damping: 26, restDelta: 0.5 })

  useEffect(() => {
    if (reduce) return
    const move = (e) => {
      mx.set(e.clientX)
      my.set(e.clientY)
    }
    window.addEventListener('mousemove', move, { passive: true })
    return () => window.removeEventListener('mousemove', move)
  }, [mx, my, reduce])

  if (reduce) return null
  return <motion.div className="cursor-glow" style={{ x, y }} aria-hidden="true" />
}
