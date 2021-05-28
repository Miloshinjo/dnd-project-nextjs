import { BiStats } from 'react-icons/bi'
import { BsTriangle } from 'react-icons/bs'
import { GiMagicSwirl, GiSwapBag } from 'react-icons/gi'
import { HiAdjustments } from 'react-icons/hi'

import { ActiveCharacterScreen } from '../../../../../models/misc'

type NavItem = {
  icon: JSX.Element
  text: string
  key: ActiveCharacterScreen
}

export const navItems: NavItem[] = [
  {
    icon: <BiStats size={28} />,
    text: 'Stats',
    key: 'stats',
  },
  {
    icon: <BsTriangle size={28} />,
    text: 'Class',
    key: 'class',
  },
  {
    icon: <GiMagicSwirl size={28} />,
    text: 'Spells',
    key: 'spells',
  },
  {
    icon: <GiSwapBag size={28} />,
    text: 'Inventory',
    key: 'inventory',
  },
  {
    icon: <HiAdjustments size={28} />,
    text: 'Settings',
    key: 'settings',
  },
]
