import styles from './styles.module.css'

type Props = {
  level: number
  name: string
  school: string
}

const SpellName: React.FC<Props> = ({ level, name, school }) => {
  return (
    <>
      <h2 className={styles.spellName}>{name}</h2>
      <h3 className={styles.spellSchool}>
        {level === 0 ? `${school} cantrip` : `level ${level} ${school} spell`}
      </h3>{' '}
    </>
  )
}

export { SpellName as default }
