import {
  RarityType,
  ItemType,
  WeaponType,
  ArmorType,
} from '../../../models/magicItem'

const raritiesRaw: Array<RarityType> = [
  'Common',
  'Uncommon',
  'Rare',
  'Very rare',
  'Legendary',
  'Artifact',
  'Varies',
  'Unknown',
]

const typesRaw: Array<ItemType> = [
  'Potion',
  'Armor',
  'Ring',
  'Rod',
  'Scroll',
  'Staff',
  'Wand',
  'Weapon',
  'Wondrous Item',
]

const weaponsRaw: Array<WeaponType> = [
  'Club',
  'Dagger',
  'Greatclub',
  'Handaxe',
  'Javelin',
  'Light Hammer',
  'Mace',
  'Quarterstaff',
  'Sickle',
  'Spear',
  'Crossbow',
  'Dart',
  'Shortbow',
  'Sling',
  'Battleaxe',
  'Flail',
  'Glaive',
  'Greataxe',
  'Greatsword',
  'Halberd',
  'Lance',
  'Longsword',
  'Maul',
  'Morningstar',
  'Pike',
  'Rapier',
  'Scimitar',
  'Shortsword',
  'Trident',
  'War Pick',
  'Warhammer',
  'Whip',
  'Blowgun',
  'Longbow',
  'Net',
  'Gun',
]

const armorsRaw: Array<ArmorType> = [
  'Robe',
  'Padded',
  'Leather',
  'Studded Leather',
  'Hide',
  'Chain Shirt',
  'Scale Mail',
  'Breastplate',
  'Half Plate',
  'Ring Mail',
  'Chain Mail',
  'Splint',
  'Plate',
  'Shield',
]

export { typesRaw, raritiesRaw, weaponsRaw, armorsRaw }
