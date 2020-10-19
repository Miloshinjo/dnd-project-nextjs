import styles from './styles.module.css'

type Props = {
  material: string | null
}

const SpellMaterial: React.FC<Props> = ({ material }) => {
  if (!material) return null
  return (
    <div className={styles.container}>
      <div className={styles.title}>Materials required:</div>
      {material}.
    </div>
  )
}

export { SpellMaterial as default }
