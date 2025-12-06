'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { useCharacter } from '@/features/characters/api/queries';
import { CharacterDetailSkeleton } from '../_components/card-skeleton-detail';

interface CharacterDetailPageProps {
  id: number;
}

export const CharacterDetailPageComp: React.FC<CharacterDetailPageProps> = ({
  id,
}) => {
  const { data, isLoading, isError, error } = useCharacter(id);
  const router = useRouter();

  if (isError || !data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-50">
        <div className="space-y-3 text-center">
          <p className="text-sm text-red-400">
            {error?.message ?? 'Character not found'}
          </p>
          <Button variant="outline" size="sm" asChild>
            <Link href="/characters">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to list
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const character = data;

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 py-10">
        <div className="mb-6 flex items-center justify-between gap-4">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              router.back();
            }}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
        {isLoading && (
          <div>
            <CharacterDetailSkeleton />
          </div>
        )}
        {/* Tekli Card */}
        {character && (
          <Card className="mx-auto w-full max-w-xl border-slate-800 bg-slate-900/70 shadow-xl">
            <CardHeader className="flex flex-col items-center gap-4 pt-6">
              <div className="relative h-24 w-24 overflow-hidden rounded-full border border-slate-700 bg-slate-900">
                <Image
                  src={character.image}
                  alt={character.name}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>

              <div className="text-center space-y-2">
                <h1 className="text-2xl font-semibold tracking-tight text-white">
                  {character.name}
                </h1>

                <div className="flex flex-wrap justify-center gap-2 text-xs">
                  <Badge
                    variant="outline"
                    className="border-emerald-500/60 text-emerald-300"
                  >
                    {character.status}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-sky-500/60 text-sky-300"
                  >
                    {character.gender}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-slate-600 text-slate-300"
                  >
                    {character.species || 'Unknown species'}
                  </Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4 px-6 pb-4 pt-2">
              <div className="space-y-2 text-sm text-slate-300">
                <div className="flex items-center justify-between gap-4 border-b border-slate-800 pb-2">
                  <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Origin
                  </span>
                  <span className="text-sm text-slate-100">
                    {character.origin?.name}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 border-b border-slate-800 pb-2">
                  <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Location
                  </span>
                  <span className="text-sm text-slate-100">
                    {character.location?.name}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Episodes
                  </span>
                  <span className="text-sm text-slate-100">
                    {character.episode.length} episode
                    {character.episode.length > 1 ? 's' : ''}
                  </span>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex justify-center pb-6 pt-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.back()}
                className="cursor-pointer"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to list
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </main>
  );
};
