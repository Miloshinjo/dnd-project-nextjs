import styles from './styles.module.css'

const SpellCard = ({ spell }) => {
  return (
    <div className={styles.spellCardContainer}>
      <div className={styles.spellLevel}>
        {spell.level === 0 ? <span>Cantrip</span> : spell.level}
      </div>
      <div className={styles.spellName}>{spell.name}</div>
    </div>
  )
}

export { SpellCard as default }
