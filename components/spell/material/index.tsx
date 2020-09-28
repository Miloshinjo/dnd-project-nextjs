import styles from './styles.module.css'

type Props = {
  material: string | null
}

const Material = ({ material }) => {
  if (!material) return null
  return (
    <div className={styles.container}>
      <div className={styles.title}>Materials required:</div>
      {material}.
    </div>
  )
}

export { Material as default }
