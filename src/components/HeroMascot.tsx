import { motion } from 'framer-motion'

export default function HeroMascot() {
  return (
    <div 
      className="absolute z-40 pointer-events-auto cursor-pointer flex items-center justify-center
                 top-[12%] left-1/2 -translate-x-1/2 -translate-y-0 w-32 h-32
                 md:top-1/2 md:left-[5%] md:-translate-y-1/2 md:-translate-x-0 md:w-[18vw] md:h-[18vw] md:max-w-[250px] md:max-h-[250px]
                 lg:left-[8%] lg:w-[15vw] lg:h-[15vw] lg:max-w-[300px] lg:max-h-[300px]"
    >
      <motion.div 
        className="relative w-full h-full flex items-center justify-center"
        animate={{ y: [-12, 12, -12], rotate: [-1, 1, -1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.img
          src="/assets/mascott.webp"
          alt="hackX Mascot"
          className="w-full h-[600px] object-contain drop-shadow-[0_0_30px_rgba(0,229,255,0.4)] mix-blend-screen"
          initial={{ scaleX: -1.3, scaleY: 1.3 }}
          animate={{ scaleX: -1.3, scaleY: 1.3 }}
        />
      </motion.div>
    </div>
  )
}
