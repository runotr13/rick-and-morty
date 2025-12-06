import {
  CharacterGender,
  CharacterStatus,
} from '@/features/characters/rick-and-morty-types';
import {
  parseAsInteger,
  parseAsStringEnum,
  createSerializer,
  type inferParserType,
} from 'nuqs/server';

export const statusValues: CharacterStatus[] = ['alive', 'dead', 'unknown'];
export const genderValues: CharacterGender[] = [
  'female',
  'male',
  'genderless',
  'unknown',
];

export const charactersSearchParams = {
  page: parseAsInteger.withDefault(1),
  status: parseAsStringEnum(statusValues as unknown as string[]),
  gender: parseAsStringEnum(genderValues as unknown as string[]),
} as const;

export type CharactersSearchParams = inferParserType<
  typeof charactersSearchParams
>;

export const serializeCharactersSearchParams = createSerializer(
  charactersSearchParams,
);
