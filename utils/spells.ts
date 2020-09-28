const arrangeSpellsByLevel = (spells) => {
  return spells.reduce((total, current) => {
    if (!total[current.level]) {
      total[current.level] = []
    }
    total[current.level].push(current)

    return total
  }, {})
}

export { arrangeSpellsByLevel }
