import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { Play } from './icons.jsx'

// 3D CSS kostka (6 stěn) + scroll parallax na obalu
function Cube({ className, spin, reduce, delay = 0, py }) {
  return (
    <motion.div className={`cube ${className}`} style={reduce ? {} : { y: py }}>
      <motion.div
        animate={reduce ? {} : { y: [0, -14, 0] }}
        transition={{ duration: 7 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
      >
        <motion.div
          className="cube3d"
          animate={reduce || !spin ? {} : { rotateY: [38, 398] }}
          transition={{ duration: 42, repeat: Infinity, ease: 'linear' }}
        >
          <span className="face f-front" />
          <span className="face f-back" />
          <span className="face f-right" />
          <span className="face f-left" />
          <span className="face f-top" />
          <span className="face f-bottom" />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

// Odznak aplikace: plave (loop) + letí při scrollu (parallax + natočení)
function Badge({ className, children, reduce, delay = 0, py, pr }) {
  return (
    <motion.div
      className={`app-badge ${className}`}
      style={reduce ? {} : { y: py, rotate: pr }}
    >
      <motion.div
        style={{ display: 'grid', placeItems: 'center', width: '100%', height: '100%' }}
        animate={reduce ? {} : { y: [0, -10, 0] }}
        transition={{ duration: 5.5 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

// Dekorativní 3D scéna v hero — reaguje na scroll:
// playhead scrubuje timeline, klipy se posouvají, ikony a kostky mají parallax.
export default function HeroScene() {
  const reduce = useReducedMotion()

  const { scrollY } = useScroll()
  const smooth = useSpring(scrollY, { stiffness: 60, damping: 20, restDelta: 0.5 })

  // playhead = scrollem řízený "přehrávač"
  const playheadLeft = useTransform(smooth, [0, 650], ['14%', '82%'])
  // posun klipů v jednotlivých stopách (různé směry = paralaxa)
  const rowX1 = useTransform(smooth, [0, 650], [0, -26])
  const rowX2 = useTransform(smooth, [0, 650], [0, 20])
  const rowX3 = useTransform(smooth, [0, 650], [0, -14])
  const rowX4 = useTransform(smooth, [0, 650], [0, 10])
  // timeline lehce odjíždí nahoru
  const tlY = useTransform(smooth, [0, 650], [0, -55])
  // ikony aplikací — každá letí jinak rychle + se natáčí
  const prY = useTransform(smooth, [0, 650], [0, -120])
  const prR = useTransform(smooth, [0, 650], [0, 10])
  const aeY = useTransform(smooth, [0, 650], [0, -70])
  const aeR = useTransform(smooth, [0, 650], [0, -8])
  const psY = useTransform(smooth, [0, 650], [0, -95])
  const psR = useTransform(smooth, [0, 650], [0, 6])
  const meY = useTransform(smooth, [0, 650], [0, -55])
  const meR = useTransform(smooth, [0, 650], [0, -10])
  // kostky
  const c1Y = useTransform(smooth, [0, 650], [0, -50])
  const c2Y = useTransform(smooth, [0, 650], [0, 38])
  const c3Y = useTransform(smooth, [0, 650], [0, -80])

  return (
    <motion.div
      className="scene"
      aria-hidden="true"
      initial={{ opacity: 0, scale: 0.92, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="scene-inner">
        <div className="scene-glow" />

        <Cube className="c1" spin reduce={reduce} delay={0.4} py={c1Y} />
        <Cube className="c2" reduce={reduce} delay={1.2} py={c2Y} />
        <Cube className="c3" spin reduce={reduce} delay={0.8} py={c3Y} />

        <Badge className="b-pr" reduce={reduce} delay={0.2} py={prY} pr={prR}>Pr</Badge>
        <Badge className="b-ae" reduce={reduce} delay={1.1} py={aeY} pr={aeR}>Ae</Badge>
        <Badge className="b-ps" reduce={reduce} delay={0.6} py={psY} pr={psR}>Ps</Badge>
        <Badge className="b-me" reduce={reduce} delay={1.6} py={meY} pr={meR}>Me</Badge>

        <motion.div className="tl-wrap" style={reduce ? {} : { y: tlY }}>
          <div className="timeline">
            <div className="tl-ruler">
              <span>00:00</span>
              <span>00:15</span>
              <span>00:30</span>
              <span>00:45</span>
              <span>01:00</span>
            </div>
            <div className="tl-row">
              <span className="tl-label">V2</span>
              <motion.div className="tl-clips" style={reduce ? {} : { x: rowX1 }}>
                <span className="tl-clip v2" />
                <span className="tl-clip fx">fx</span>
                <span className="tl-clip v3" />
              </motion.div>
            </div>
            <div className="tl-row">
              <span className="tl-label">V1</span>
              <motion.div className="tl-clips" style={reduce ? {} : { x: rowX2 }}>
                <span className="tl-clip v1" />
                <span className="tl-clip fx">fx</span>
                <span className="tl-clip v2" />
              </motion.div>
            </div>
            <div className="tl-row">
              <span className="tl-label">A1</span>
              <motion.div className="tl-clips" style={reduce ? {} : { x: rowX3 }}>
                <span className="tl-clip a1" />
                <span className="tl-clip a2" />
              </motion.div>
            </div>
            <div className="tl-row">
              <span className="tl-label">A2</span>
              <motion.div className="tl-clips" style={reduce ? {} : { x: rowX4 }}>
                <span className="tl-clip a2" />
                <span className="tl-clip fx">fx</span>
                <span className="tl-clip a1" style={{ width: '26%' }} />
              </motion.div>
            </div>

            <motion.div
              className="tl-playhead"
              style={reduce ? { left: '42%' } : { left: playheadLeft }}
            />
            <motion.div
              className="tl-play"
              animate={reduce ? {} : { y: [0, -8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Play size={24} />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
