import {
  GiHealthPotion,
  GiLayeredArmor,
  GiBiceps,
  GiBodyBalance,
  GiBrain,
  GiTripleYin,
  GiDaggerRose,
  GiHeartWings,
  GiBurningEmbers,
  GiSpellBook,
  GiBowArrow,
  GiSwordAltar,
  GiPrimitiveNecklace,
  GiMusicalNotes,
  GiHood,
  GiWarlockEye,
  GiSwordsEmblem,
  GiHandOfGod,
  GiForest,
} from 'react-icons/gi'
import { ImMagicWand } from 'react-icons/im'
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
  Barbarian: <GiPrimitiveNecklace size={60} color="#eeeeee" />,
  Bard: <GiMusicalNotes size={60} color="#eeeeee" />,
  Cleric: <GiHandOfGod size={60} color="#eeeeee" />,
  Druid: <GiForest size={60} color="#eeeeee" />,
  Fighter: <GiSwordsEmblem size={60} color="#eeeeee" />,
  Paladin: <GiSwordAltar size={60} color="#eeeeee" />,
  Ranger: <GiBowArrow size={60} color="#eeeeee" />,
  Rogue: <GiHood size={60} color="#eeeeee" />,
  Sorcerer: <GiBurningEmbers size={60} color="#eeeeee" />,
  Warlock: <GiWarlockEye size={60} color="#eeeeee" />,
  Monk: <GiTripleYin size={60} color="#eeeeee" />,
  Wizard: <GiSpellBook size={60} color="#eeeeee" />,
  createMagicItem: <ImMagicWand size={60} color="#eeeeee" />,
}

export { icons as default }
