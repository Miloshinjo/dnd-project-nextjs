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
  hitPoints: <GiHealthPotion size={20} color="#3182CE" />,
  maxHitPoints: <GiHealthPotion size={20} color="#3182CE" />,
  armorClass: <GiLayeredArmor size={20} color="#3182CE" />,
  level: <FaLevelUpAlt size={20} color="#3182CE" />,
  strength: <GiBiceps size={20} color="#3182CE" />,
  dexterity: <GiBodyBalance size={20} color="#3182CE" />,
  constitution: <GiHeartWings size={20} color="#3182CE" />,
  intelligence: <GiBrain size={20} color="#3182CE" />,
  wisdom: <GiTripleYin size={20} color="#3182CE" />,
  charisma: <GiDaggerRose size={20} color="#3182CE" />,
  speed: <MdDirectionsRun size={20} color="#3182CE" />,
  arcaneWard: <FiShield size={20} color="#3182CE" />,
  arcaneWardMax: <FiShield size={20} color="#3182CE" />,
}

export { icons as default }
