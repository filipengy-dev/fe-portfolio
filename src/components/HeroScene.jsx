import { motion, useReducedMotion } from 'framer-motion'
import { Play } from './icons.jsx'

// 3D CSS kostka (6 stěn)
function Cube({ className, spin, reduce, delay = 0 }) {
  return (
    <motion.div
      className={`cube ${className}`}
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
  )
}

function Badge({ className, children, reduce, delay = 0 }) {
  return (
    <motion.div
      className={`app-badge ${className}`}
      animate={reduce ? {} : { y: [0, -10, 0] }}
      transition={{ duration: 5.5 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      {children}
    </motion.div>
  )
}

// Dekorativní 3D scéna v hero: plovoucí kostky, odznaky aplikací a střihová timeline.
export default function HeroScene() {
  const reduce = useReducedMotion()

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

        <Cube className="c1" spin reduce={reduce} delay={0.4} />
        <Cube className="c2" reduce={reduce} delay={1.2} />
        <Cube className="c3" spin reduce={reduce} delay={0.8} />

        <Badge className="b-pr" reduce={reduce} delay={0.2}>Pr</Badge>
        <Badge className="b-ae" reduce={reduce} delay={1.1}>Ae</Badge>
        <Badge className="b-ps" reduce={reduce} delay={0.6}>Ps</Badge>
        <Badge className="b-me" reduce={reduce} delay={1.6}>Me</Badge>

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
            <div className="tl-clips">
              <span className="tl-clip v2" />
              <span className="tl-clip fx">fx</span>
              <span className="tl-clip v3" />
            </div>
          </div>
          <div className="tl-row">
            <span className="tl-label">V1</span>
            <div className="tl-clips">
              <span className="tl-clip v1" />
              <span className="tl-clip fx">fx</span>
              <span className="tl-clip v2" />
            </div>
          </div>
          <div className="tl-row">
            <span className="tl-label">A1</span>
            <div className="tl-clips">
              <span className="tl-clip a1" />
              <span className="tl-clip a2" />
            </div>
          </div>
          <div className="tl-row">
            <span className="tl-label">A2</span>
            <div className="tl-clips">
              <span className="tl-clip a2" />
              <span className="tl-clip fx">fx</span>
              <span className="tl-clip a1" style={{ width: '26%' }} />
            </div>
          </div>

          <motion.div
            className="tl-playhead"
            initial={false}
            animate={reduce ? { left: '42%' } : { left: ['16%', '80%'] }}
            transition={
              reduce
                ? {}
                : { duration: 9, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }
            }
          />
          <motion.div
            className="tl-play"
            animate={reduce ? {} : { y: [0, -8, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Play size={24} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
