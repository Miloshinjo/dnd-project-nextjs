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
import { FiShield } from 'react-icons/fi'

const icons = {
  hitPoints: <GiHealthPotion size={60} color="#eeeeee" />,
  maxHitPoints: <GiHealthPotion size={60} color="#eeeeee" />,
  armorClass: <GiLayeredArmor size={60} color="#eeeeee" />,
  level: <FaLevelUpAlt size={60} color="#eeeeee" />,
  strength: <GiBiceps size={60} color="#eeeeee" />,
  dexterity: <GiBodyBalance size={60} color="#eeeeee" />,
  constitution: <GiHeartWings size={60} color="#eeeeee" />,
  intelligence: <GiBrain size={60} color="#eeeeee" />,
  wisdom: <GiTripleYin size={60} color="#eeeeee" />,
  charisma: <GiDaggerRose size={60} color="#eeeeee" />,
  speed: <MdDirectionsRun size={60} color="#eeeeee" />,
  arcaneWard: <FiShield size={60} color="#eeeeee" />,
  arcaneWardMax: <FiShield size={60} color="#eeeeee" />,
}

export { icons as default }
