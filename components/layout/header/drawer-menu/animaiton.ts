const drawerVariants = {
  closed: {
    x: '-100vw',
    transition: {
      delay: 0.2,
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
  open: {
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 400,
      restDelta: 5,
      damping: 40,
    },
  },
}

export { drawerVariants }
