/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */





declare global {
  interface NexusGenCustomOutputProperties<TypeName extends string> {
    model: NexusPrisma<TypeName, 'model'>
    crud: any
  }
}

declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  CharacterAddSubclassInputType: { // input type
    id: string; // ID!
    subclassId: string; // ID!
  }
  CharacterCreateInput: { // input type
    alignment: string; // String!
    klassId: string; // ID!
    name: string; // String!
    race: string; // String!
  }
  CharacterDeleteInput: { // input type
    id: string; // ID!
  }
  CharacterEditSpellInput: { // input type
    id: string; // ID!
    spellId: string; // ID!
  }
  CharacterUpdateInput: { // input type
    alignment?: string | null; // String
    armorClass?: number | null; // Int
    charisma?: number | null; // Int
    constitution?: number | null; // Int
    dexterity?: number | null; // Int
    gold?: number | null; // Int
    hitPoints?: number | null; // Int
    id: string; // ID!
    inspiration?: boolean | null; // Boolean
    intelligence?: number | null; // Int
    klassId?: string | null; // ID
    level?: number | null; // Int
    maxHitPoints?: number | null; // Int
    name?: string | null; // String
    race?: string | null; // String
    skillId?: string | null; // ID
    speed?: number | null; // Int
    spellId?: string | null; // ID
    spellSlots?: string | null; // String
    strength?: number | null; // Int
    subclassId?: string | null; // ID
    wisdom?: number | null; // Int
  }
  CharacterWhereUniqueInput: { // input type
    id?: number | null; // Int
  }
  SkillWhereUniqueInput: { // input type
    id?: number | null; // Int
    name?: string | null; // String
  }
  SpellWhereUniqueInput: { // input type
    id?: number | null; // Int
    name?: string | null; // String
  }
  SubClassWhereUniqueInput: { // input type
    id?: number | null; // Int
    name?: string | null; // String
  }
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
}

export interface NexusGenRootTypes {
  Character: { // root type
    alignment: string; // String!
    armorClass: number; // Int!
    charisma: number; // Int!
    constitution: number; // Int!
    dexterity: number; // Int!
    gold?: number | null; // Int
    hitPoints: number; // Int!
    id: number; // Int!
    inspiration: boolean; // Boolean!
    intelligence: number; // Int!
    klassId: number; // Int!
    level: number; // Int!
    maxHitPoints: number; // Int!
    name: string; // String!
    race: string; // String!
    speed: number; // Int!
    spellSlots?: string | null; // String
    strength: number; // Int!
    subclassId?: number | null; // Int
    userId: number; // Int!
    wisdom: number; // Int!
  }
  Klass: { // root type
    armor: string[]; // [String!]!
    description: string; // String!
    hitDie: string; // String!
    hitPointsAt1st: string; // String!
    id: number; // Int!
    name: string; // String!
    primaryAbility: string[]; // [String!]!
    proficientSkillsAt1st: number; // Int!
    savingThrows: string[]; // [String!]!
    skills: string[]; // [String!]!
    spellCastingModifier?: string | null; // String
    tools?: string | null; // String
    weapons: string[]; // [String!]!
  }
  Mutation: {};
  Query: {};
  Skill: { // root type
    ability: string; // String!
    id: number; // Int!
    name: string; // String!
  }
  Spell: { // root type
    attackSave: string; // String!
    castingTime: string; // String!
    components: string; // String!
    concentration: boolean; // Boolean!
    damageEffect: string; // String!
    description: string; // String!
    duration: string; // String!
    id: number; // Int!
    klasses: string; // String!
    level: number; // Int!
    material?: string | null; // String
    name: string; // String!
    range: string; // String!
    ritual: boolean; // Boolean!
    school: string; // String!
  }
  SubClass: { // root type
    id: number; // Int!
    klassId: number; // Int!
    name: string; // String!
    source: string; // String!
    spellCastingModifier?: string | null; // String
  }
  User: { // root type
    email?: string | null; // String
    id: number; // Int!
    image?: string | null; // String
    name?: string | null; // String
  }
}

export interface NexusGenAllTypes extends NexusGenRootTypes {
  CharacterAddSubclassInputType: NexusGenInputs['CharacterAddSubclassInputType'];
  CharacterCreateInput: NexusGenInputs['CharacterCreateInput'];
  CharacterDeleteInput: NexusGenInputs['CharacterDeleteInput'];
  CharacterEditSpellInput: NexusGenInputs['CharacterEditSpellInput'];
  CharacterUpdateInput: NexusGenInputs['CharacterUpdateInput'];
  CharacterWhereUniqueInput: NexusGenInputs['CharacterWhereUniqueInput'];
  SkillWhereUniqueInput: NexusGenInputs['SkillWhereUniqueInput'];
  SpellWhereUniqueInput: NexusGenInputs['SpellWhereUniqueInput'];
  SubClassWhereUniqueInput: NexusGenInputs['SubClassWhereUniqueInput'];
  String: NexusGenScalars['String'];
  Int: NexusGenScalars['Int'];
  Float: NexusGenScalars['Float'];
  Boolean: NexusGenScalars['Boolean'];
  ID: NexusGenScalars['ID'];
}

export interface NexusGenFieldTypes {
  Character: { // field return type
    alignment: string; // String!
    armorClass: number; // Int!
    charisma: number; // Int!
    constitution: number; // Int!
    dexterity: number; // Int!
    gold: number | null; // Int
    hitPoints: number; // Int!
    id: number; // Int!
    inspiration: boolean; // Boolean!
    intelligence: number; // Int!
    klass: NexusGenRootTypes['Klass']; // Klass!
    klassId: number; // Int!
    level: number; // Int!
    maxHitPoints: number; // Int!
    name: string; // String!
    preparedSpells: NexusGenRootTypes['Spell'][]; // [Spell!]!
    race: string; // String!
    skills: NexusGenRootTypes['Skill'][]; // [Skill!]!
    speed: number; // Int!
    spells: NexusGenRootTypes['Spell'][]; // [Spell!]!
    spellSlots: string | null; // String
    strength: number; // Int!
    subclass: NexusGenRootTypes['SubClass'] | null; // SubClass
    subclassId: number | null; // Int
    user: NexusGenRootTypes['User']; // User!
    userId: number; // Int!
    wisdom: number; // Int!
  }
  Klass: { // field return type
    armor: string[]; // [String!]!
    description: string; // String!
    hitDie: string; // String!
    hitPointsAt1st: string; // String!
    id: number; // Int!
    name: string; // String!
    primaryAbility: string[]; // [String!]!
    proficientSkillsAt1st: number; // Int!
    savingThrows: string[]; // [String!]!
    skills: string[]; // [String!]!
    spellCastingModifier: string | null; // String
    subClasses: NexusGenRootTypes['SubClass'][]; // [SubClass!]!
    tools: string | null; // String
    weapons: string[]; // [String!]!
  }
  Mutation: { // field return type
    addSubclass: NexusGenRootTypes['Character'] | null; // Character
    createCharacter: NexusGenRootTypes['Character'] | null; // Character
    deleteCharacter: NexusGenRootTypes['Character'] | null; // Character
    forgetSpell: NexusGenRootTypes['Character'] | null; // Character
    learnSpell: NexusGenRootTypes['Character'] | null; // Character
    prepareSpell: NexusGenRootTypes['Character'] | null; // Character
    unprepareSpell: NexusGenRootTypes['Character'] | null; // Character
    updateCharacter: NexusGenRootTypes['Character'] | null; // Character
  }
  Query: { // field return type
    character: NexusGenRootTypes['Character'] | null; // Character
    characters: Array<NexusGenRootTypes['Character'] | null> | null; // [Character]
    klass: NexusGenRootTypes['Klass'] | null; // Klass
    klasses: Array<NexusGenRootTypes['Klass'] | null> | null; // [Klass]
    me: NexusGenRootTypes['User'] | null; // User
    skills: Array<NexusGenRootTypes['Skill'] | null> | null; // [Skill]
    spell: NexusGenRootTypes['Spell'] | null; // Spell
    spells: Array<NexusGenRootTypes['Spell'] | null> | null; // [Spell]
    subclasses: Array<NexusGenRootTypes['SubClass'] | null> | null; // [SubClass]
  }
  Skill: { // field return type
    ability: string; // String!
    id: number; // Int!
    name: string; // String!
  }
  Spell: { // field return type
    attackSave: string; // String!
    castingTime: string; // String!
    characters: NexusGenRootTypes['Character'][]; // [Character!]!
    components: string; // String!
    concentration: boolean; // Boolean!
    damageEffect: string; // String!
    description: string; // String!
    duration: string; // String!
    id: number; // Int!
    klasses: string; // String!
    level: number; // Int!
    material: string | null; // String
    name: string; // String!
    range: string; // String!
    ritual: boolean; // Boolean!
    school: string; // String!
  }
  SubClass: { // field return type
    id: number; // Int!
    klass: NexusGenRootTypes['Klass']; // Klass!
    klassId: number; // Int!
    name: string; // String!
    source: string; // String!
    spellCastingModifier: string | null; // String
  }
  User: { // field return type
    characters: NexusGenRootTypes['Character'][]; // [Character!]!
    email: string | null; // String
    id: number; // Int!
    image: string | null; // String
    name: string | null; // String
  }
}

export interface NexusGenArgTypes {
  Character: {
    preparedSpells: { // args
      after?: NexusGenInputs['SpellWhereUniqueInput'] | null; // SpellWhereUniqueInput
      before?: NexusGenInputs['SpellWhereUniqueInput'] | null; // SpellWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
    }
    skills: { // args
      after?: NexusGenInputs['SkillWhereUniqueInput'] | null; // SkillWhereUniqueInput
      before?: NexusGenInputs['SkillWhereUniqueInput'] | null; // SkillWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
    }
    spells: { // args
      after?: NexusGenInputs['SpellWhereUniqueInput'] | null; // SpellWhereUniqueInput
      before?: NexusGenInputs['SpellWhereUniqueInput'] | null; // SpellWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
    }
  }
  Klass: {
    subClasses: { // args
      after?: NexusGenInputs['SubClassWhereUniqueInput'] | null; // SubClassWhereUniqueInput
      before?: NexusGenInputs['SubClassWhereUniqueInput'] | null; // SubClassWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
    }
  }
  Mutation: {
    addSubclass: { // args
      character?: NexusGenInputs['CharacterAddSubclassInputType'] | null; // CharacterAddSubclassInputType
    }
    createCharacter: { // args
      character?: NexusGenInputs['CharacterCreateInput'] | null; // CharacterCreateInput
    }
    deleteCharacter: { // args
      character?: NexusGenInputs['CharacterDeleteInput'] | null; // CharacterDeleteInput
    }
    forgetSpell: { // args
      character?: NexusGenInputs['CharacterEditSpellInput'] | null; // CharacterEditSpellInput
    }
    learnSpell: { // args
      character?: NexusGenInputs['CharacterEditSpellInput'] | null; // CharacterEditSpellInput
    }
    prepareSpell: { // args
      character?: NexusGenInputs['CharacterEditSpellInput'] | null; // CharacterEditSpellInput
    }
    unprepareSpell: { // args
      character?: NexusGenInputs['CharacterEditSpellInput'] | null; // CharacterEditSpellInput
    }
    updateCharacter: { // args
      character?: NexusGenInputs['CharacterUpdateInput'] | null; // CharacterUpdateInput
    }
  }
  Query: {
    character: { // args
      id?: string | null; // ID
    }
    klass: { // args
      id?: string | null; // ID
    }
    spell: { // args
      id?: string | null; // ID
    }
    spells: { // args
      klassName?: string | null; // String
    }
    subclasses: { // args
      klassName: string; // String!
    }
  }
  Spell: {
    characters: { // args
      after?: NexusGenInputs['CharacterWhereUniqueInput'] | null; // CharacterWhereUniqueInput
      before?: NexusGenInputs['CharacterWhereUniqueInput'] | null; // CharacterWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
    }
  }
  User: {
    characters: { // args
      after?: NexusGenInputs['CharacterWhereUniqueInput'] | null; // CharacterWhereUniqueInput
      before?: NexusGenInputs['CharacterWhereUniqueInput'] | null; // CharacterWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
    }
  }
}

export interface NexusGenAbstractResolveReturnTypes {
}

export interface NexusGenInheritedFields {}

export type NexusGenObjectNames = "Character" | "Klass" | "Mutation" | "Query" | "Skill" | "Spell" | "SubClass" | "User";

export type NexusGenInputNames = "CharacterAddSubclassInputType" | "CharacterCreateInput" | "CharacterDeleteInput" | "CharacterEditSpellInput" | "CharacterUpdateInput" | "CharacterWhereUniqueInput" | "SkillWhereUniqueInput" | "SpellWhereUniqueInput" | "SubClassWhereUniqueInput";

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = "Boolean" | "Float" | "ID" | "Int" | "String";

export type NexusGenUnionNames = never;

export interface NexusGenTypes {
  context: any;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  allTypes: NexusGenAllTypes;
  inheritedFields: NexusGenInheritedFields;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractResolveReturn: NexusGenAbstractResolveReturnTypes;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
}