import { motion, useScroll, useSpring } from 'framer-motion'

// Tenká fialová lišta nahoře ukazující průběh scrollu.
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 })
  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />
}
