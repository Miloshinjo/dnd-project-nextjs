import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: number;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CharacterCreateInput = {
  name: Scalars['String'];
  klassId: Scalars['ID'];
  race: Scalars['String'];
  alignment: Scalars['String'];
};

export type CharacterUpdateInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  level?: Maybe<Scalars['Int']>;
  race?: Maybe<Scalars['String']>;
  alignment?: Maybe<Scalars['String']>;
  armorClass?: Maybe<Scalars['Int']>;
  maxHitPoints?: Maybe<Scalars['Int']>;
  hitPoints?: Maybe<Scalars['Int']>;
  gold?: Maybe<Scalars['Int']>;
  inspiration?: Maybe<Scalars['Boolean']>;
  strength?: Maybe<Scalars['Int']>;
  dexterity?: Maybe<Scalars['Int']>;
  constitution?: Maybe<Scalars['Int']>;
  intelligence?: Maybe<Scalars['Int']>;
  wisdom?: Maybe<Scalars['Int']>;
  charisma?: Maybe<Scalars['Int']>;
  speed?: Maybe<Scalars['Int']>;
  spellSlots?: Maybe<Scalars['String']>;
  arcaneWard?: Maybe<Scalars['Int']>;
  arcaneWardMax?: Maybe<Scalars['Int']>;
};

export type CharacterEditSpellInput = {
  id: Scalars['ID'];
  spellId: Scalars['ID'];
};

export type CharacterDeleteInput = {
  id: Scalars['ID'];
};

export type CharacterAddSubclassInput = {
  id: Scalars['ID'];
  subclassId: Scalars['ID'];
};

export type CharacterEditSkillInput = {
  id: Scalars['ID'];
  skillId: Scalars['ID'];
};

export type CharacterQueryInputType = {
  id: Scalars['ID'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  characters: Array<Character>;
  image?: Maybe<Scalars['String']>;
};


export type UserCharactersArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<CharacterWhereUniqueInput>;
  after?: Maybe<CharacterWhereUniqueInput>;
};

export type Spell = {
  __typename?: 'Spell';
  id: Scalars['Int'];
  attackSave: Scalars['String'];
  castingTime: Scalars['String'];
  klasses: Scalars['String'];
  components: Scalars['String'];
  concentration: Scalars['Boolean'];
  damageEffect: Scalars['String'];
  description: Scalars['String'];
  duration: Scalars['String'];
  level: Scalars['Int'];
  name: Scalars['String'];
  range: Scalars['String'];
  ritual: Scalars['Boolean'];
  school: Scalars['String'];
  material?: Maybe<Scalars['String']>;
  characters: Array<Character>;
};


export type SpellCharactersArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<CharacterWhereUniqueInput>;
  after?: Maybe<CharacterWhereUniqueInput>;
};

export type Klass = {
  __typename?: 'Klass';
  id: Scalars['Int'];
  name: Scalars['String'];
  description: Scalars['String'];
  hitDie: Scalars['String'];
  hitPointsAt1st: Scalars['String'];
  primaryAbility: Array<Scalars['String']>;
  savingThrows: Array<Scalars['String']>;
  armor: Array<Scalars['String']>;
  weapons: Array<Scalars['String']>;
  tools?: Maybe<Scalars['String']>;
  skills: Array<Scalars['String']>;
  spellCastingModifier?: Maybe<Scalars['String']>;
  proficientSkillsAt1st: Scalars['Int'];
  subClasses: Array<SubClass>;
};


export type KlassSubClassesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<SubClassWhereUniqueInput>;
  after?: Maybe<SubClassWhereUniqueInput>;
};

export type SubClass = {
  __typename?: 'SubClass';
  id: Scalars['Int'];
  name: Scalars['String'];
  spellCastingModifier?: Maybe<Scalars['String']>;
  klassId: Scalars['Int'];
  klass: Klass;
  source: Scalars['String'];
};

export type Skill = {
  __typename?: 'Skill';
  id: Scalars['Int'];
  name: Scalars['String'];
  ability: Scalars['String'];
};

export type Character = {
  __typename?: 'Character';
  id: Scalars['Int'];
  name: Scalars['String'];
  level: Scalars['Int'];
  arcaneWard?: Maybe<Scalars['Int']>;
  arcaneWardMax?: Maybe<Scalars['Int']>;
  race: Scalars['String'];
  klassId: Scalars['Int'];
  klass: Klass;
  alignment: Scalars['String'];
  armorClass: Scalars['Int'];
  hitPoints: Scalars['Int'];
  maxHitPoints: Scalars['Int'];
  gold?: Maybe<Scalars['Int']>;
  inspiration: Scalars['Boolean'];
  strength: Scalars['Int'];
  dexterity: Scalars['Int'];
  constitution: Scalars['Int'];
  intelligence: Scalars['Int'];
  wisdom: Scalars['Int'];
  charisma: Scalars['Int'];
  userId: Scalars['Int'];
  user: User;
  spells: Array<Spell>;
  preparedSpells: Array<Spell>;
  skills: Array<Skill>;
  subclass?: Maybe<SubClass>;
  subclassId?: Maybe<Scalars['Int']>;
  spellSlots?: Maybe<Scalars['String']>;
  speed: Scalars['Int'];
};


export type CharacterSpellsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<SpellWhereUniqueInput>;
  after?: Maybe<SpellWhereUniqueInput>;
};


export type CharacterPreparedSpellsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<SpellWhereUniqueInput>;
  after?: Maybe<SpellWhereUniqueInput>;
};


export type CharacterSkillsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<SkillWhereUniqueInput>;
  after?: Maybe<SkillWhereUniqueInput>;
};

export type CharacterWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
};

export type SubClassWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

export type SpellWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

export type SkillWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  spells?: Maybe<Array<Maybe<Spell>>>;
  spell?: Maybe<Spell>;
  characters?: Maybe<Array<Maybe<Character>>>;
  character?: Maybe<Character>;
  klasses?: Maybe<Array<Maybe<Klass>>>;
  klass?: Maybe<Klass>;
  me?: Maybe<User>;
  skills?: Maybe<Array<Maybe<Skill>>>;
  subclasses?: Maybe<Array<Maybe<SubClass>>>;
};


export type QuerySpellsArgs = {
  klassName?: Maybe<Scalars['String']>;
};


export type QuerySpellArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QueryCharacterArgs = {
  character?: Maybe<CharacterQueryInputType>;
};


export type QueryKlassArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QuerySubclassesArgs = {
  klassName: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCharacter?: Maybe<Character>;
  updateCharacter?: Maybe<Character>;
  deleteCharacter?: Maybe<Character>;
  learnSpell?: Maybe<Character>;
  forgetSpell?: Maybe<Character>;
  prepareSpell?: Maybe<Character>;
  unprepareSpell?: Maybe<Character>;
  addSubclass?: Maybe<Character>;
  addSkill?: Maybe<Character>;
  removeSkill?: Maybe<Character>;
};


export type MutationCreateCharacterArgs = {
  character?: Maybe<CharacterCreateInput>;
};


export type MutationUpdateCharacterArgs = {
  character?: Maybe<CharacterUpdateInput>;
};


export type MutationDeleteCharacterArgs = {
  character?: Maybe<CharacterDeleteInput>;
};


export type MutationLearnSpellArgs = {
  character?: Maybe<CharacterEditSpellInput>;
};


export type MutationForgetSpellArgs = {
  character?: Maybe<CharacterEditSpellInput>;
};


export type MutationPrepareSpellArgs = {
  character?: Maybe<CharacterEditSpellInput>;
};


export type MutationUnprepareSpellArgs = {
  character?: Maybe<CharacterEditSpellInput>;
};


export type MutationAddSubclassArgs = {
  character?: Maybe<CharacterAddSubclassInput>;
};


export type MutationAddSkillArgs = {
  character?: Maybe<CharacterEditSkillInput>;
};


export type MutationRemoveSkillArgs = {
  character?: Maybe<CharacterEditSkillInput>;
};

export type AddSkillMutationVariables = Exact<{
  id: Scalars['ID'];
  skillId: Scalars['ID'];
}>;


export type AddSkillMutation = (
  { __typename?: 'Mutation' }
  & { addSkill?: Maybe<(
    { __typename?: 'Character' }
    & Pick<Character, 'id'>
    & { skills: Array<(
      { __typename?: 'Skill' }
      & Pick<Skill, 'id' | 'name' | 'ability'>
    )> }
  )> }
);

export type AddSubclassMutationVariables = Exact<{
  id: Scalars['ID'];
  subclassId: Scalars['ID'];
}>;


export type AddSubclassMutation = (
  { __typename?: 'Mutation' }
  & { addSubclass?: Maybe<(
    { __typename?: 'Character' }
    & Pick<Character, 'id'>
    & { subclass?: Maybe<(
      { __typename?: 'SubClass' }
      & Pick<SubClass, 'id' | 'name'>
    )> }
  )> }
);

export type ArcaneWardMutationVariables = Exact<{
  id: Scalars['ID'];
  arcaneWard: Scalars['Int'];
}>;


export type ArcaneWardMutation = (
  { __typename?: 'Mutation' }
  & { updateCharacter?: Maybe<(
    { __typename?: 'Character' }
    & Pick<Character, 'id' | 'arcaneWard'>
  )> }
);

export type ArcaneWardMaxMutationVariables = Exact<{
  id: Scalars['ID'];
  arcaneWardMax: Scalars['Int'];
}>;


export type ArcaneWardMaxMutation = (
  { __typename?: 'Mutation' }
  & { updateCharacter?: Maybe<(
    { __typename?: 'Character' }
    & Pick<Character, 'id' | 'arcaneWardMax'>
  )> }
);

export type ArmorClassMutationVariables = Exact<{
  id: Scalars['ID'];
  armorClass: Scalars['Int'];
}>;


export type ArmorClassMutation = (
  { __typename?: 'Mutation' }
  & { updateCharacter?: Maybe<(
    { __typename?: 'Character' }
    & Pick<Character, 'id' | 'armorClass'>
  )> }
);

export type CharismaMutationVariables = Exact<{
  id: Scalars['ID'];
  charisma: Scalars['Int'];
}>;


export type CharismaMutation = (
  { __typename?: 'Mutation' }
  & { updateCharacter?: Maybe<(
    { __typename?: 'Character' }
    & Pick<Character, 'id' | 'charisma'>
  )> }
);

export type ConstitutionMutationVariables = Exact<{
  id: Scalars['ID'];
  constitution: Scalars['Int'];
}>;


export type ConstitutionMutation = (
  { __typename?: 'Mutation' }
  & { updateCharacter?: Maybe<(
    { __typename?: 'Character' }
    & Pick<Character, 'id' | 'constitution'>
  )> }
);

export type CreateCharacterMutationVariables = Exact<{
  name: Scalars['String'];
  race: Scalars['String'];
  alignment: Scalars['String'];
  klassId: Scalars['ID'];
}>;


export type CreateCharacterMutation = (
  { __typename?: 'Mutation' }
  & { createCharacter?: Maybe<(
    { __typename?: 'Character' }
    & Pick<Character, 'id' | 'name' | 'race' | 'alignment'>
    & { klass: (
      { __typename?: 'Klass' }
      & Pick<Klass, 'id' | 'name'>
    ) }
  )> }
);

export type DeleteCharacterMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteCharacterMutation = (
  { __typename?: 'Mutation' }
  & { deleteCharacter?: Maybe<(
    { __typename?: 'Character' }
    & Pick<Character, 'id' | 'name'>
  )> }
);

export type DexterityMutationVariables = Exact<{
  id: Scalars['ID'];
  dexterity: Scalars['Int'];
}>;


export type DexterityMutation = (
  { __typename?: 'Mutation' }
  & { updateCharacter?: Maybe<(
    { __typename?: 'Character' }
    & Pick<Character, 'id' | 'dexterity'>
  )> }
);

export type ForgetSpellMutationVariables = Exact<{
  id: Scalars['ID'];
  spellId: Scalars['ID'];
}>;


export type ForgetSpellMutation = (
  { __typename?: 'Mutation' }
  & { forgetSpell?: Maybe<(
    { __typename?: 'Character' }
    & Pick<Character, 'id'>
    & { spells: Array<(
      { __typename?: 'Spell' }
      & Pick<Spell, 'id' | 'name'>
    )> }
  )> }
);

export type HitPointsMutationVariables = Exact<{
  id: Scalars['ID'];
  hitPoints: Scalars['Int'];
}>;


export type HitPointsMutation = (
  { __typename?: 'Mutation' }
  & { updateCharacter?: Maybe<(
    { __typename?: 'Character' }
    & Pick<Character, 'id' | 'hitPoints'>
  )> }
);

export type IntelligenceMutationVariables = Exact<{
  id: Scalars['ID'];
  intelligence: Scalars['Int'];
}>;


export type IntelligenceMutation = (
  { __typename?: 'Mutation' }
  & { updateCharacter?: Maybe<(
    { __typename?: 'Character' }
    & Pick<Character, 'id' | 'intelligence'>
  )> }
);

export type LearnSpellMutationVariables = Exact<{
  id: Scalars['ID'];
  spellId: Scalars['ID'];
}>;


export type LearnSpellMutation = (
  { __typename?: 'Mutation' }
  & { learnSpell?: Maybe<(
    { __typename?: 'Character' }
    & Pick<Character, 'id'>
    & { spells: Array<(
      { __typename?: 'Spell' }
      & Pick<Spell, 'id' | 'name'>
    )> }
  )> }
);

export type LevelMutationVariables = Exact<{
  id: Scalars['ID'];
  level: Scalars['Int'];
}>;


export type LevelMutation = (
  { __typename?: 'Mutation' }
  & { updateCharacter?: Maybe<(
    { __typename?: 'Character' }
    & Pick<Character, 'id' | 'level'>
  )> }
);

export type MaxHitPointsMutationVariables = Exact<{
  id: Scalars['ID'];
  maxHitPoints: Scalars['Int'];
}>;


export type MaxHitPointsMutation = (
  { __typename?: 'Mutation' }
  & { updateCharacter?: Maybe<(
    { __typename?: 'Character' }
    & Pick<Character, 'id' | 'maxHitPoints'>
  )> }
);

export type PrepareSpellMutationVariables = Exact<{
  id: Scalars['ID'];
  spellId: Scalars['ID'];
}>;


export type PrepareSpellMutation = (
  { __typename?: 'Mutation' }
  & { prepareSpell?: Maybe<(
    { __typename?: 'Character' }
    & Pick<Character, 'id'>
    & { preparedSpells: Array<(
      { __typename?: 'Spell' }
      & Pick<Spell, 'id' | 'name'>
    )> }
  )> }
);

export type RemoveSkillMutationVariables = Exact<{
  id: Scalars['ID'];
  skillId: Scalars['ID'];
}>;


export type RemoveSkillMutation = (
  { __typename?: 'Mutation' }
  & { removeSkill?: Maybe<(
    { __typename?: 'Character' }
    & Pick<Character, 'id'>
    & { skills: Array<(
      { __typename?: 'Skill' }
      & Pick<Skill, 'id' | 'name' | 'ability'>
    )> }
  )> }
);

export type SpeedMutationVariables = Exact<{
  id: Scalars['ID'];
  speed: Scalars['Int'];
}>;


export type SpeedMutation = (
  { __typename?: 'Mutation' }
  & { updateCharacter?: Maybe<(
    { __typename?: 'Character' }
    & Pick<Character, 'id' | 'speed'>
  )> }
);

export type SpellSlotsMutationVariables = Exact<{
  id: Scalars['ID'];
  spellSlots: Scalars['String'];
}>;


export type SpellSlotsMutation = (
  { __typename?: 'Mutation' }
  & { updateCharacter?: Maybe<(
    { __typename?: 'Character' }
    & Pick<Character, 'id' | 'spellSlots'>
  )> }
);

export type StrengthMutationVariables = Exact<{
  id: Scalars['ID'];
  strength: Scalars['Int'];
}>;


export type StrengthMutation = (
  { __typename?: 'Mutation' }
  & { updateCharacter?: Maybe<(
    { __typename?: 'Character' }
    & Pick<Character, 'id' | 'strength'>
  )> }
);

export type UnprepareSpellMutationVariables = Exact<{
  id: Scalars['ID'];
  spellId: Scalars['ID'];
}>;


export type UnprepareSpellMutation = (
  { __typename?: 'Mutation' }
  & { unprepareSpell?: Maybe<(
    { __typename?: 'Character' }
    & Pick<Character, 'id'>
    & { preparedSpells: Array<(
      { __typename?: 'Spell' }
      & Pick<Spell, 'id' | 'name'>
    )> }
  )> }
);

export type WisdomMutationVariables = Exact<{
  id: Scalars['ID'];
  wisdom: Scalars['Int'];
}>;


export type WisdomMutation = (
  { __typename?: 'Mutation' }
  & { updateCharacter?: Maybe<(
    { __typename?: 'Character' }
    & Pick<Character, 'id' | 'wisdom'>
  )> }
);

export type CharacterQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type CharacterQuery = (
  { __typename?: 'Query' }
  & { character?: Maybe<(
    { __typename?: 'Character' }
    & Pick<Character, 'id' | 'name' | 'level' | 'race' | 'hitPoints' | 'maxHitPoints' | 'armorClass' | 'gold' | 'alignment' | 'inspiration' | 'strength' | 'dexterity' | 'constitution' | 'intelligence' | 'wisdom' | 'charisma' | 'speed' | 'spellSlots' | 'arcaneWard' | 'arcaneWardMax'>
    & { klass: (
      { __typename?: 'Klass' }
      & Pick<Klass, 'id' | 'name' | 'hitDie' | 'spellCastingModifier'>
    ), subclass?: Maybe<(
      { __typename?: 'SubClass' }
      & Pick<SubClass, 'id' | 'name' | 'spellCastingModifier'>
    )>, skills: Array<(
      { __typename?: 'Skill' }
      & Pick<Skill, 'id' | 'name' | 'ability'>
    )>, spells: Array<(
      { __typename?: 'Spell' }
      & Pick<Spell, 'id' | 'name' | 'level' | 'castingTime' | 'school' | 'range' | 'components' | 'ritual' | 'concentration'>
    )>, preparedSpells: Array<(
      { __typename?: 'Spell' }
      & Pick<Spell, 'id' | 'name' | 'level' | 'castingTime' | 'school' | 'range' | 'components'>
    )> }
  )> }
);

export type CharacterSpellQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type CharacterSpellQuery = (
  { __typename?: 'Query' }
  & { character?: Maybe<(
    { __typename?: 'Character' }
    & Pick<Character, 'id' | 'name'>
    & { klass: (
      { __typename?: 'Klass' }
      & Pick<Klass, 'id' | 'name'>
    ), subclass?: Maybe<(
      { __typename?: 'SubClass' }
      & Pick<SubClass, 'id' | 'name'>
    )>, spells: Array<(
      { __typename?: 'Spell' }
      & Pick<Spell, 'id' | 'name'>
    )>, preparedSpells: Array<(
      { __typename?: 'Spell' }
      & Pick<Spell, 'id' | 'name'>
    )> }
  )> }
);

export type CharactersQueryVariables = Exact<{ [key: string]: never; }>;


export type CharactersQuery = (
  { __typename?: 'Query' }
  & { characters?: Maybe<Array<Maybe<(
    { __typename?: 'Character' }
    & Pick<Character, 'id' | 'name' | 'level' | 'race'>
    & { klass: (
      { __typename?: 'Klass' }
      & Pick<Klass, 'id' | 'name' | 'spellCastingModifier'>
    ), subclass?: Maybe<(
      { __typename?: 'SubClass' }
      & Pick<SubClass, 'id' | 'name' | 'spellCastingModifier'>
    )>, spells: Array<(
      { __typename?: 'Spell' }
      & Pick<Spell, 'id'>
    )> }
  )>>> }
);

export type CharactersHomeQueryVariables = Exact<{ [key: string]: never; }>;


export type CharactersHomeQuery = (
  { __typename?: 'Query' }
  & { characters?: Maybe<Array<Maybe<(
    { __typename?: 'Character' }
    & Pick<Character, 'id' | 'name' | 'race'>
    & { klass: (
      { __typename?: 'Klass' }
      & Pick<Klass, 'id' | 'name'>
    ) }
  )>>> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'email' | 'image'>
  )> }
);

export type SkillsQueryVariables = Exact<{ [key: string]: never; }>;


export type SkillsQuery = (
  { __typename?: 'Query' }
  & { skills?: Maybe<Array<Maybe<(
    { __typename?: 'Skill' }
    & Pick<Skill, 'id' | 'name' | 'ability'>
  )>>> }
);

export type SpellQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type SpellQuery = (
  { __typename?: 'Query' }
  & { spell?: Maybe<(
    { __typename?: 'Spell' }
    & Pick<Spell, 'id' | 'name' | 'level' | 'description' | 'klasses' | 'concentration' | 'ritual' | 'duration' | 'castingTime' | 'range' | 'components' | 'school' | 'attackSave' | 'damageEffect' | 'material'>
  )> }
);

export type SpellsKlassQueryVariables = Exact<{
  klassName?: Maybe<Scalars['String']>;
}>;


export type SpellsKlassQuery = (
  { __typename?: 'Query' }
  & { spells?: Maybe<Array<Maybe<(
    { __typename?: 'Spell' }
    & Pick<Spell, 'id' | 'name' | 'level' | 'castingTime' | 'school' | 'range' | 'components'>
  )>>> }
);

export type SubclassesQueryVariables = Exact<{
  klassName: Scalars['String'];
}>;


export type SubclassesQuery = (
  { __typename?: 'Query' }
  & { subclasses?: Maybe<Array<Maybe<(
    { __typename?: 'SubClass' }
    & Pick<SubClass, 'id' | 'name'>
  )>>> }
);


export const AddSkillDocument = gql`
    mutation AddSkill($id: ID!, $skillId: ID!) {
  addSkill(character: {id: $id, skillId: $skillId}) {
    id
    skills {
      id
      name
      ability
    }
  }
}
    `;

export function useAddSkillMutation() {
  return Urql.useMutation<AddSkillMutation, AddSkillMutationVariables>(AddSkillDocument);
};
export const AddSubclassDocument = gql`
    mutation AddSubclass($id: ID!, $subclassId: ID!) {
  addSubclass(character: {id: $id, subclassId: $subclassId}) {
    id
    subclass {
      id
      name
    }
  }
}
    `;

export function useAddSubclassMutation() {
  return Urql.useMutation<AddSubclassMutation, AddSubclassMutationVariables>(AddSubclassDocument);
};
export const ArcaneWardDocument = gql`
    mutation ArcaneWard($id: ID!, $arcaneWard: Int!) {
  updateCharacter(character: {id: $id, arcaneWard: $arcaneWard}) {
    id
    arcaneWard
  }
}
    `;

export function useArcaneWardMutation() {
  return Urql.useMutation<ArcaneWardMutation, ArcaneWardMutationVariables>(ArcaneWardDocument);
};
export const ArcaneWardMaxDocument = gql`
    mutation ArcaneWardMax($id: ID!, $arcaneWardMax: Int!) {
  updateCharacter(character: {id: $id, arcaneWardMax: $arcaneWardMax}) {
    id
    arcaneWardMax
  }
}
    `;

export function useArcaneWardMaxMutation() {
  return Urql.useMutation<ArcaneWardMaxMutation, ArcaneWardMaxMutationVariables>(ArcaneWardMaxDocument);
};
export const ArmorClassDocument = gql`
    mutation ArmorClass($id: ID!, $armorClass: Int!) {
  updateCharacter(character: {id: $id, armorClass: $armorClass}) {
    id
    armorClass
  }
}
    `;

export function useArmorClassMutation() {
  return Urql.useMutation<ArmorClassMutation, ArmorClassMutationVariables>(ArmorClassDocument);
};
export const CharismaDocument = gql`
    mutation Charisma($id: ID!, $charisma: Int!) {
  updateCharacter(character: {id: $id, charisma: $charisma}) {
    id
    charisma
  }
}
    `;

export function useCharismaMutation() {
  return Urql.useMutation<CharismaMutation, CharismaMutationVariables>(CharismaDocument);
};
export const ConstitutionDocument = gql`
    mutation Constitution($id: ID!, $constitution: Int!) {
  updateCharacter(character: {id: $id, constitution: $constitution}) {
    id
    constitution
  }
}
    `;

export function useConstitutionMutation() {
  return Urql.useMutation<ConstitutionMutation, ConstitutionMutationVariables>(ConstitutionDocument);
};
export const CreateCharacterDocument = gql`
    mutation CreateCharacter($name: String!, $race: String!, $alignment: String!, $klassId: ID!) {
  createCharacter(character: {name: $name, race: $race, alignment: $alignment, klassId: $klassId}) {
    id
    name
    race
    alignment
    klass {
      id
      name
    }
  }
}
    `;

export function useCreateCharacterMutation() {
  return Urql.useMutation<CreateCharacterMutation, CreateCharacterMutationVariables>(CreateCharacterDocument);
};
export const DeleteCharacterDocument = gql`
    mutation DeleteCharacter($id: ID!) {
  deleteCharacter(character: {id: $id}) {
    id
    name
  }
}
    `;

export function useDeleteCharacterMutation() {
  return Urql.useMutation<DeleteCharacterMutation, DeleteCharacterMutationVariables>(DeleteCharacterDocument);
};
export const DexterityDocument = gql`
    mutation Dexterity($id: ID!, $dexterity: Int!) {
  updateCharacter(character: {id: $id, dexterity: $dexterity}) {
    id
    dexterity
  }
}
    `;

export function useDexterityMutation() {
  return Urql.useMutation<DexterityMutation, DexterityMutationVariables>(DexterityDocument);
};
export const ForgetSpellDocument = gql`
    mutation ForgetSpell($id: ID!, $spellId: ID!) {
  forgetSpell(character: {id: $id, spellId: $spellId}) {
    id
    spells {
      id
      name
    }
  }
}
    `;

export function useForgetSpellMutation() {
  return Urql.useMutation<ForgetSpellMutation, ForgetSpellMutationVariables>(ForgetSpellDocument);
};
export const HitPointsDocument = gql`
    mutation HitPoints($id: ID!, $hitPoints: Int!) {
  updateCharacter(character: {id: $id, hitPoints: $hitPoints}) {
    id
    hitPoints
  }
}
    `;

export function useHitPointsMutation() {
  return Urql.useMutation<HitPointsMutation, HitPointsMutationVariables>(HitPointsDocument);
};
export const IntelligenceDocument = gql`
    mutation Intelligence($id: ID!, $intelligence: Int!) {
  updateCharacter(character: {id: $id, intelligence: $intelligence}) {
    id
    intelligence
  }
}
    `;

export function useIntelligenceMutation() {
  return Urql.useMutation<IntelligenceMutation, IntelligenceMutationVariables>(IntelligenceDocument);
};
export const LearnSpellDocument = gql`
    mutation LearnSpell($id: ID!, $spellId: ID!) {
  learnSpell(character: {id: $id, spellId: $spellId}) {
    id
    spells {
      id
      name
    }
  }
}
    `;

export function useLearnSpellMutation() {
  return Urql.useMutation<LearnSpellMutation, LearnSpellMutationVariables>(LearnSpellDocument);
};
export const LevelDocument = gql`
    mutation Level($id: ID!, $level: Int!) {
  updateCharacter(character: {id: $id, level: $level}) {
    id
    level
  }
}
    `;

export function useLevelMutation() {
  return Urql.useMutation<LevelMutation, LevelMutationVariables>(LevelDocument);
};
export const MaxHitPointsDocument = gql`
    mutation MaxHitPoints($id: ID!, $maxHitPoints: Int!) {
  updateCharacter(character: {id: $id, maxHitPoints: $maxHitPoints}) {
    id
    maxHitPoints
  }
}
    `;

export function useMaxHitPointsMutation() {
  return Urql.useMutation<MaxHitPointsMutation, MaxHitPointsMutationVariables>(MaxHitPointsDocument);
};
export const PrepareSpellDocument = gql`
    mutation PrepareSpell($id: ID!, $spellId: ID!) {
  prepareSpell(character: {id: $id, spellId: $spellId}) {
    id
    preparedSpells {
      id
      name
    }
  }
}
    `;

export function usePrepareSpellMutation() {
  return Urql.useMutation<PrepareSpellMutation, PrepareSpellMutationVariables>(PrepareSpellDocument);
};
export const RemoveSkillDocument = gql`
    mutation RemoveSkill($id: ID!, $skillId: ID!) {
  removeSkill(character: {id: $id, skillId: $skillId}) {
    id
    skills {
      id
      name
      ability
    }
  }
}
    `;

export function useRemoveSkillMutation() {
  return Urql.useMutation<RemoveSkillMutation, RemoveSkillMutationVariables>(RemoveSkillDocument);
};
export const SpeedDocument = gql`
    mutation Speed($id: ID!, $speed: Int!) {
  updateCharacter(character: {id: $id, speed: $speed}) {
    id
    speed
  }
}
    `;

export function useSpeedMutation() {
  return Urql.useMutation<SpeedMutation, SpeedMutationVariables>(SpeedDocument);
};
export const SpellSlotsDocument = gql`
    mutation SpellSlots($id: ID!, $spellSlots: String!) {
  updateCharacter(character: {id: $id, spellSlots: $spellSlots}) {
    id
    spellSlots
  }
}
    `;

export function useSpellSlotsMutation() {
  return Urql.useMutation<SpellSlotsMutation, SpellSlotsMutationVariables>(SpellSlotsDocument);
};
export const StrengthDocument = gql`
    mutation Strength($id: ID!, $strength: Int!) {
  updateCharacter(character: {id: $id, strength: $strength}) {
    id
    strength
  }
}
    `;

export function useStrengthMutation() {
  return Urql.useMutation<StrengthMutation, StrengthMutationVariables>(StrengthDocument);
};
export const UnprepareSpellDocument = gql`
    mutation UnprepareSpell($id: ID!, $spellId: ID!) {
  unprepareSpell(character: {id: $id, spellId: $spellId}) {
    id
    preparedSpells {
      id
      name
    }
  }
}
    `;

export function useUnprepareSpellMutation() {
  return Urql.useMutation<UnprepareSpellMutation, UnprepareSpellMutationVariables>(UnprepareSpellDocument);
};
export const WisdomDocument = gql`
    mutation Wisdom($id: ID!, $wisdom: Int!) {
  updateCharacter(character: {id: $id, wisdom: $wisdom}) {
    id
    wisdom
  }
}
    `;

export function useWisdomMutation() {
  return Urql.useMutation<WisdomMutation, WisdomMutationVariables>(WisdomDocument);
};
export const CharacterDocument = gql`
    query Character($id: ID!) {
  character(character: {id: $id}) {
    id
    name
    level
    race
    hitPoints
    maxHitPoints
    armorClass
    gold
    alignment
    inspiration
    strength
    dexterity
    constitution
    intelligence
    wisdom
    charisma
    speed
    spellSlots
    klass {
      id
      name
      hitDie
      spellCastingModifier
    }
    subclass {
      id
      name
      spellCastingModifier
    }
    skills {
      id
      name
      ability
    }
    spells {
      id
      name
      level
      castingTime
      school
      range
      components
      ritual
      concentration
    }
    preparedSpells {
      id
      name
      level
      castingTime
      school
      range
      components
    }
    arcaneWard
    arcaneWardMax
  }
}
    `;

export function useCharacterQuery(options: Omit<Urql.UseQueryArgs<CharacterQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CharacterQuery>({ query: CharacterDocument, ...options });
};
export const CharacterSpellDocument = gql`
    query CharacterSpell($id: ID!) {
  character(character: {id: $id}) {
    id
    name
    klass {
      id
      name
    }
    subclass {
      id
      name
    }
    spells {
      id
      name
    }
    preparedSpells {
      id
      name
    }
  }
}
    `;

export function useCharacterSpellQuery(options: Omit<Urql.UseQueryArgs<CharacterSpellQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CharacterSpellQuery>({ query: CharacterSpellDocument, ...options });
};
export const CharactersDocument = gql`
    query Characters {
  characters {
    id
    name
    level
    race
    klass {
      id
      name
      spellCastingModifier
    }
    subclass {
      id
      name
      spellCastingModifier
    }
    spells {
      id
    }
  }
}
    `;

export function useCharactersQuery(options: Omit<Urql.UseQueryArgs<CharactersQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CharactersQuery>({ query: CharactersDocument, ...options });
};
export const CharactersHomeDocument = gql`
    query CharactersHome {
  characters {
    id
    name
    race
    klass {
      id
      name
    }
  }
}
    `;

export function useCharactersHomeQuery(options: Omit<Urql.UseQueryArgs<CharactersHomeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CharactersHomeQuery>({ query: CharactersHomeDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    id
    name
    email
    image
  }
}
    `;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const SkillsDocument = gql`
    query Skills {
  skills {
    id
    name
    ability
  }
}
    `;

export function useSkillsQuery(options: Omit<Urql.UseQueryArgs<SkillsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<SkillsQuery>({ query: SkillsDocument, ...options });
};
export const SpellDocument = gql`
    query Spell($id: ID!) {
  spell(id: $id) {
    id
    name
    level
    description
    klasses
    concentration
    ritual
    duration
    castingTime
    range
    components
    school
    attackSave
    damageEffect
    material
  }
}
    `;

export function useSpellQuery(options: Omit<Urql.UseQueryArgs<SpellQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<SpellQuery>({ query: SpellDocument, ...options });
};
export const SpellsKlassDocument = gql`
    query SpellsKlass($klassName: String) {
  spells(klassName: $klassName) {
    id
    name
    level
    castingTime
    school
    range
    components
  }
}
    `;

export function useSpellsKlassQuery(options: Omit<Urql.UseQueryArgs<SpellsKlassQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<SpellsKlassQuery>({ query: SpellsKlassDocument, ...options });
};
export const SubclassesDocument = gql`
    query Subclasses($klassName: String!) {
  subclasses(klassName: $klassName) {
    id
    name
  }
}
    `;

export function useSubclassesQuery(options: Omit<Urql.UseQueryArgs<SubclassesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<SubclassesQuery>({ query: SubclassesDocument, ...options });
};