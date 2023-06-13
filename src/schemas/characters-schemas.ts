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

const alignments = [
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
  portrait: Joi.string().allow('').optional(),
  level: Joi.number().min(1).max(20).required(),
  race: Joi.string().valid(...races).required(),
  class: Joi.string().valid(...classes).required(),
  aligment: Joi.string().valid(...alignments).required(),
  background: Joi.string().allow('').optional(),
  strenght: Joi.number().min(1).max(30).required(),
  dexterity: Joi.number().min(1).max(30).required(),
  constitution: Joi.number().min(1).max(30).required(),
  intelligence: Joi.number().min(1).max(30).required(),
  wisdom: Joi.number().min(1).max(30).required(),
  charisma: Joi.number().min(1).max(30).required(),
  languages: Joi.string().required(),
  personality_traits: Joi.string().allow('').optional(),
  ideals: Joi.string().allow('').optional(),
  bonds: Joi.string().allow('').optional(),
  flaws: Joi.string().allow('').optional(),
  hair: Joi.string().allow('').optional(),
  skin: Joi.string().allow('').optional(),
  eyes: Joi.string().allow('').optional(),
  height: Joi.string().allow('').optional(),
  weight: Joi.number(),
  age: Joi.number().optional(),
  organizations: Joi.string().allow('').optional(),
  allies: Joi.string().allow('').optional(),
  enemies: Joi.string().allow('').optional(),
  backstory: Joi.string().allow('').optional(),
  other_notes: Joi.string().allow('').optional(),
});
