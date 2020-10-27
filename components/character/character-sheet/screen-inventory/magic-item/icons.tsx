import {
  GiLeatherArmor,
  GiDrinkMe,
  GiPowerRing,
  GiLunarWand,
  GiScrollUnfurled,
  GiWizardStaff,
  GiBroadsword,
  GiFluffyTrefoil,
} from 'react-icons/gi'
import { ImMagicWand } from 'react-icons/im'

const icons = {
  Weapon: <GiBroadsword size={25} color="#eeeeee" />,
  Armor: <GiLeatherArmor size={25} color="#eeeeee" />,
  Potion: <GiDrinkMe size={25} color="#eeeeee" />,
  Ring: <GiPowerRing size={25} color="#eeeeee" />,
  Rod: <GiLunarWand size={25} color="#eeeeee" />,
  Scroll: <GiScrollUnfurled size={25} color="#eeeeee" />,
  Staff: <GiWizardStaff size={25} color="#eeeeee" />,
  Wand: <ImMagicWand size={25} color="#eeeeee" />,
  'Wondrous Item': <GiFluffyTrefoil size={25} color="#eeeeee" />,
}

export { icons as default }
