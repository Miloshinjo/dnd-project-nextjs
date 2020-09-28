export const listVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, ease: 'easeIn' } },
}

export const itemVariants = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  show: { opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeIn' } },
}
