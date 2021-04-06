import {
  GiTripleYin,
  GiFireSilhouette,
  GiPointyHat,
  GiHighShot,
  GiElfHelmet,
  GiBattleAxe,
  GiLyre,
  GiDaemonSkull,
  GiHood,
  GiClosedBarbute,
  GiHolySymbol,
  GiPawPrint,
} from 'react-icons/gi'

const icons = {
  barbarian: <GiBattleAxe size={28} />,
  bard: <GiLyre size={28} />,
  cleric: <GiHolySymbol size={28} />,
  druid: <GiPawPrint size={28} />,
  fighter: <GiClosedBarbute size={28} />,
  paladin: <GiElfHelmet size={28} />,
  ranger: <GiHighShot size={28} />,
  rogue: <GiHood size={28} />,
  sorcerer: <GiFireSilhouette size={28} />,
  warlock: <GiDaemonSkull size={28} />,
  monk: <GiTripleYin size={28} />,
  wizard: <GiPointyHat size={28} />,
}

export { icons as default }
