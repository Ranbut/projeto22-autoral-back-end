import Joi from 'joi';

const races = [
'DRAGONBORN', 
'DWARF', 
'ELF', 
'GNOME', 
'HALF_ELF', 
'HALFLING', 
'HALF_ORC', 
'HUMAN', 
'TIEFLING'
];

const classes = [
  'BARBARIAN', 
  'BARD', 
  'CLERIC', 
  'DRUID', 
  'FIGHTER', 
  'MONK', 
  'PALADIN', 
  'RANGER', 
  'ROGUE', 
  'SORCERER', 
  'WARLOCK', 
  'WIZARD'
];

const aligments = [
  'CHAOTIC_EVIL',
  'CHAOTIC_GOOD',
  'CHAOTIC_NEUTRAL',
  'LAWFUL_EVIL',
  'LAWFUL_GOOD',
  'LAWFUL_NEUTRAL',
  'NEUTRAL',
  'NEUTRAL_EVIL',
  'NEUTRAL_GOOD'
];

export const characterSchema = Joi.object ({
  name: Joi.string().required(),
  portrait: Joi.string(),
  level: Joi.number().min(1).max(20).required(),
  race: Joi.string().valid(...races).required(),
  class: Joi.string().valid(...classes).required(),
  aligment: Joi.string().valid(...aligments).required(),
  background: Joi.string(),
  strenght: Joi.number().min(1).max(30).required(),
  dexterity: Joi.number().min(1).max(30).required(),
  constitution: Joi.number().min(1).max(30).required(),
  intelligence: Joi.number().min(1).max(30).required(),
  wisdom: Joi.number().min(1).max(30).required(),
  charisma: Joi.number().min(1).max(30).required(),
  languages: Joi.string().required(),
  personality_traits: Joi.string(),
  bonds: Joi.string(),
  flaws: Joi.string(),
  hair: Joi.string(),
  skin: Joi.string(),
  eyes: Joi.string(),
  height: Joi.string(),
  weight: Joi.number(),
  age: Joi.number(),
  organizations: Joi.string(),
  allies: Joi.string(),
  enemies: Joi.string(),
  backstory: Joi.string(),
  other_notes: Joi.string(),
});
