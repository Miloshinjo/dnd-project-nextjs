import { Spell } from '../../../generated/graphql'

import styles from './styles.module.css'

type Props = {
  description: Spell['description']
}

const SpellDescription: React.FC<Props> = ({ description }) => {
  return (
    <div
      className={styles.description}
      dangerouslySetInnerHTML={{ __html: description }}
    />
  )
}

export { SpellDescription as default }
