import CharactersComp from '@/app/view/characters';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rick & Morty Characters',
  description: 'SSR + React Query + Zustand + nuqs demo',
};

const Characters = () => {
  return <CharactersComp />;
};

export default Characters;
