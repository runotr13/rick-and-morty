import { create } from 'zustand';
import { Character } from './rick-and-morty-types';

interface CharacterStoreState {
  selectedCharacter: Character | null;
  setSelectedCharacter: (character: Character | null) => void;
}

export const useCharacterStore = create<CharacterStoreState>((set) => ({
  selectedCharacter: null,
  setSelectedCharacter: (character) => set({ selectedCharacter: character }),
}));
