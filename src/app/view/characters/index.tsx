import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { charactersQueryOptions } from '@/features/characters/api/queries';
import type {
  CharacterGender,
  CharacterStatus,
  CharactersFilters,
} from '@/features/characters/rick-and-morty-types';
import { CharactersPageClient } from './characters-page-client';

interface HomePageProps {
  searchParams?: {
    status?: CharacterStatus;
    gender?: CharacterGender;
    page?: string;
  };
}

export default async function CharactersComp({ searchParams }: HomePageProps) {
  const params = await searchParams;

  const page = Number(params?.page ?? '1');
  const status = params?.status;
  const gender = params?.gender;

  const filters: CharactersFilters = {
    page: Number.isNaN(page) ? 1 : page,
    status,
    gender,
  };

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(charactersQueryOptions(filters));

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <CharactersPageClient initialFilters={filters} />
    </HydrationBoundary>
  );
}
