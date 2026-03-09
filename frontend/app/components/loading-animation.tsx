import { motion, type Variants } from "motion/react"

function TypingIndicator() {
  const dotVariants: Variants = {
    bounce: {
      y: [5, -5, 5],
      transition: { duration: 0.8, repeat: Infinity, ease: "easeInOut" },
    },
  }

  return (
    <motion.div
      animate="bounce"
      transition={{ staggerChildren: 0.15 }}
      className="flex items-center gap-4"
    >
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          variants={dotVariants}
          className="size-8 shrink-0 rounded-full bg-muted-foreground opacity-50"
        />
      ))}
    </motion.div>
  )
}

export default function LoadingAnimation() {
  return (
    <div className="relative h-screen w-full">
      <motion.div
        initial={{ opacity: 0, y: 8, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.25 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="relative flex h-40 w-fit items-center justify-center rounded-[40px] bg-muted px-16 shadow-md">
          <TypingIndicator />
          <svg
            width="30"
            height="36"
            viewBox="0 0 20 24"
            className="absolute -bottom-8 left-8 fill-muted"
          >
            <path d="M0 0 L0 24 L20 0 Z" />
          </svg>
        </div>
      </motion.div>
    </div>
  )
}
