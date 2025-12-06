'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import type { Character } from '@/features/characters/rick-and-morty-types';
import { useCharacterStore } from '@/features/characters/character-store';
import Link from 'next/link';
import { ROUTES } from '@/router/routes';

interface CharactersGridProps {
  characters: Character[];
}

export const CharactersGrid: React.FC<CharactersGridProps> = ({
  characters,
}) => {
  const { setSelectedCharacter } = useCharacterStore();
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      {characters.map((character) => (
        <Link key={character.id} href={`/${ROUTES.CHARACTERS}/${character.id}`}>
          <Card
            key={character.id}
            className="cursor-pointer border-slate-800 bg-slate-900/70 transition hover:-translate-y-1 hover:border-gray-400 py-0"
            title={character.name}
            onClick={() => setSelectedCharacter(character)}
            // SADECE ORNEK.
          >
            <CardHeader className="p-0">
              <div className="w-full overflow-hidden rounded-t-xl">
                <Image
                  src={character.image}
                  alt={character.name}
                  width={500}
                  height={100}
                  className="w-full h-auto object-contain"
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-2 p-4">
              <CardTitle className="text-base text-white">
                {character.name}
              </CardTitle>
              <div className="flex flex-wrap gap-2 text-xs">
                <Badge
                  variant="outline"
                  className="border-emerald-500/60 text-emerald-300 capitalize"
                >
                  {character.status}
                </Badge>
                <Badge
                  variant="outline"
                  className="border-sky-500/60 text-sky-300 capitalize"
                >
                  {character.gender}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};
