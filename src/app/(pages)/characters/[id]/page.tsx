import NotFound from '@/app/not-found';
import { CharacterDetailPageComp } from '@/app/view/characters/[id]';
import { characterQueryOptions } from '@/features/characters/api/queries';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { Metadata } from 'next';

interface CharacterDetailPageProps {
  params: Promise<{ id: string }>;
}
export const metadata: Metadata = {
  title: 'Character Detail - Rick & Morty',
  description: 'Character detail page for Rick & Morty Characters',
};

export default async function CharacterDetailPage({
  params,
}: CharacterDetailPageProps) {
  const { id } = await params;
  const numericId = Number(id);

  if (Number.isNaN(numericId)) {
    return NotFound();
  }

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(characterQueryOptions(numericId));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CharacterDetailPageComp id={numericId} />
    </HydrationBoundary>
  );
}
