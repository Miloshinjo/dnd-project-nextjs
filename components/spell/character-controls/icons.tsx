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

const icons = {
  Bard: <GiLyre size={60} color="#eeeeee" />,
  Cleric: <GiHolySymbol size={60} color="#eeeeee" />,
  Druid: <GiPawPrint size={60} color="#eeeeee" />,
  Fighter: <GiRelicBlade size={60} color="#eeeeee" />,
  Paladin: <GiElfHelmet size={60} color="#eeeeee" />,
  Ranger: <GiHighShot size={60} color="#eeeeee" />,
  Rogue: <GiHood size={60} color="#eeeeee" />,
  Sorcerer: <GiFireSilhouette size={60} color="#eeeeee" />,
  Warlock: <GiDaemonSkull size={60} color="#eeeeee" />,
  Wizard: <GiPointyHat size={60} color="#eeeeee" />,
}

export { icons as default }
