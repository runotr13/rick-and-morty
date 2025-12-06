'use client';

import React from 'react';
import { parseAsInteger, parseAsStringEnum, useQueryStates } from 'nuqs';
import {
  CharacterGender,
  CharacterStatus,
  CharactersFilters,
} from '@/features/characters/rick-and-morty-types';
import { useCharacters } from '@/features/characters/api/queries';
import { FiltersBar } from './_components/filters-bar';
import { CharactersGrid } from './_components/characters-grid';
import { PaginationControls } from './_components/pagination-controls';
import { CharacterCardSkeleton } from './_components/card-skeleton';
import {
  genderValues,
  statusValues,
} from '@/features/characters/search-params';

interface CharactersPageClientProps {
  initialFilters: CharactersFilters;
}

export const CharactersPageClient: React.FC<CharactersPageClientProps> = ({
  initialFilters,
}) => {
  const [params, setParams] = useQueryStates(
    {
      status: parseAsStringEnum<CharacterStatus>(statusValues),
      gender: parseAsStringEnum<CharacterGender>(genderValues),
      page: parseAsInteger.withDefault(initialFilters.page),
    },
    {
      shallow: false,
    },
  );
  const effectiveFilters: CharactersFilters = {
    page: params.page ?? initialFilters.page,
    status: params.status ?? initialFilters.status,
    gender: params.gender ?? initialFilters.gender,
  };
  const { data, isLoading, isError, error } = useCharacters(effectiveFilters);

  const handleStatusChange = (value: CharacterStatus | 'all') => {
    setParams({
      status: value === 'all' ? null : value,
    });
  };

  const handleGenderChange = (value: CharacterGender | 'all') => {
    setParams({
      gender: value === 'all' ? null : value,
    });
  };

  const handlePageChange = (page: number) => {
    setParams({ page });
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-10 space-y-8">
        <header>
          <h1 className="text-3xl font-bold tracking-tight">
            Rick & Morty Characters
          </h1>
          <p className="text-sm text-slate-400">
            SSR + React Query + Zustand + nuqs + shadcn/ui
          </p>
        </header>

        <FiltersBar
          status={effectiveFilters.status}
          gender={effectiveFilters.gender}
          onStatusChange={handleStatusChange}
          onGenderChange={handleGenderChange}
        />

        <section>
          {isLoading && (
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <CharacterCardSkeleton key={index} />
              ))}
            </div>
          )}

          {isError && <p className="text-red-400 text-sm">{error?.message}</p>}

          {data && (
            <>
              <CharactersGrid characters={data.results} />
              <div className="mt-6">
                <PaginationControls
                  currentPage={effectiveFilters.page}
                  totalPages={data.info.pages}
                  onPageChange={handlePageChange}
                />
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  );
};
