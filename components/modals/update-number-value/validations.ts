export default {
  hitPoints: {
    required: 'Hit points are required',
    pattern: {
      value: /[+-]?[0-9][0-9]*/,
      message: 'This is number only.',
    },
  },
  armorClass: {
    required: 'Armor class is required',
    pattern: {
      value: /[+-]?[0-9][0-9]*/,
      message: 'This is number only.',
    },
  },
}
