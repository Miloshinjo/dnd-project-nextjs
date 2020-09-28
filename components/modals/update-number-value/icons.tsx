import {
  GiHealthPotion,
  GiLayeredArmor,
  GiBiceps,
  GiBodyBalance,
  GiBrain,
  GiTripleYin,
  GiDaggerRose,
  GiHeartWings,
} from 'react-icons/gi'
import { FaLevelUpAlt } from 'react-icons/fa'
import { MdDirectionsRun } from 'react-icons/md'

const icons = {
  hitPoints: <GiHealthPotion size={20} color="#fff" />,
  maxHitPoints: <GiHealthPotion size={20} color="#fff" />,
  armorClass: <GiLayeredArmor size={20} color="#fff" />,
  level: <FaLevelUpAlt size={20} color="#fff" />,
  strength: <GiBiceps size={20} color="#fff" />,
  dexterity: <GiBodyBalance size={20} color="#fff" />,
  constitution: <GiHeartWings size={20} color="#fff" />,
  intelligence: <GiBrain size={20} color="#fff" />,
  wisdom: <GiTripleYin size={20} color="#fff" />,
  charisma: <GiDaggerRose size={20} color="#fff" />,
  speed: <MdDirectionsRun size={20} color="#fff" />,
}

export { icons as default }
