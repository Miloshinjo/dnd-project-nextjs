import {
  GiHolySymbol,
  GiPointyHat,
  GiDaemonSkull,
  GiFireSilhouette,
  GiLyre,
  GiRelicBlade,
  GiHood,
  GiPawPrint,
  GiElfHelmet,
  GiHighShot,
} from 'react-icons/gi'

const iconColor = '#eeeeee'

const icons = {
  Bard: <GiLyre size={60} color={iconColor} />,
  Cleric: <GiHolySymbol size={60} color={iconColor} />,
  Druid: <GiPawPrint size={60} color={iconColor} />,
  Fighter: <GiRelicBlade size={60} color={iconColor} />,
  Paladin: <GiElfHelmet size={60} color={iconColor} />,
  Ranger: <GiHighShot size={60} color={iconColor} />,
  Rogue: <GiHood size={60} color={iconColor} />,
  Sorcerer: <GiFireSilhouette size={60} color={iconColor} />,
  Warlock: <GiDaemonSkull size={60} color={iconColor} />,
  Wizard: <GiPointyHat size={60} color={iconColor} />,
}

export { icons as default }
