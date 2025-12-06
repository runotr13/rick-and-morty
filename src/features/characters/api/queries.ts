import {
  QueryKey,
  UseQueryResult,
  queryOptions,
  useQuery,
} from '@tanstack/react-query';
import {
  Character,
  CharactersFilters,
  CharactersResponse,
} from '@/features/characters/rick-and-morty-types';
import {
  genderValues,
  serializeCharactersSearchParams,
  statusValues,
} from '@/features/characters/search-params';
import { httpGetJson } from '@/lib/https';

const RAW_BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? 'https://rickandmortyapi.com/api';

const BASE_URL = RAW_BASE_URL.endsWith('/') ? RAW_BASE_URL : `${RAW_BASE_URL}/`;

// 🔹 LISTE KEY'LERİ
export const charactersKeys = {
  all: ['characters'] as const,
  list: (filters: CharactersFilters): QueryKey => [
    'characters',
    filters.page,
    filters.status ?? 'all',
    filters.gender ?? 'all',
  ],
};

// 🔹 LISTE URL
export const buildCharactersUrl = (filters: {
  page: number;
  status?: (typeof statusValues)[number];
  gender?: (typeof genderValues)[number];
}): string => {
  const url = new URL('character', BASE_URL);

  const fullUrl = serializeCharactersSearchParams(url, {
    page: filters.page,
    status: filters.status ?? null,
    gender: filters.gender ?? null,
  });

  return fullUrl;
};

// 🔹 LISTE FETCH
const fetchCharacters = async (
  filters: CharactersFilters,
): Promise<CharactersResponse> => {
  const url = buildCharactersUrl({
    page: filters.page,
    status: filters.status,
    gender: filters.gender,
  });

  return httpGetJson<CharactersResponse>(url);
};

// 🔹 LISTE QUERY OPTIONS + HOOK
export const charactersQueryOptions = (filters: CharactersFilters) =>
  queryOptions({
    queryKey: charactersKeys.list(filters),
    queryFn: () => fetchCharacters(filters),
    retry: false, // Hata olursa tekrar deneme
  });

export const useCharacters = (
  filters: CharactersFilters,
): UseQueryResult<CharactersResponse, Error> =>
  useQuery(charactersQueryOptions(filters));

/* ------------------------------------------------------------------ */
/* DETAY QUERY'LERI                               */
/* ------------------------------------------------------------------ */

// 🔹 DETAY KEY
export const characterKey = (id: number): QueryKey => ['character', id];

// 🔹 DETAY URL
const buildCharacterDetailUrl = (id: number): string => {
  // https://rickandmortyapi.com/api/character/2
  return new URL(`character/${id}`, BASE_URL).toString();
};

// 🔹 DETAY FETCH
const fetchCharacterById = async (id: number): Promise<Character> => {
  const url = buildCharacterDetailUrl(id);
  return httpGetJson<Character>(url);
};

// 🔹 DETAY QUERY OPTIONS + HOOK
export const characterQueryOptions = (id: number) =>
  queryOptions({
    queryKey: characterKey(id),
    queryFn: () => fetchCharacterById(id),
    retry: false, // burada da retry istemiyorsan
  });

export const useCharacter = (id: number): UseQueryResult<Character, Error> => {
  return useQuery(characterQueryOptions(id));
};
