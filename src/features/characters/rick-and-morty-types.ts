export type CharacterStatus = 'alive' | 'dead' | 'unknown';
export type CharacterGender = 'female' | 'male' | 'genderless' | 'unknown';

export interface Character {
  id: number;
  name: string;
  status: CharacterStatus;
  species: string;
  type: string;
  gender: CharacterGender;
  originName: string;
  originUrl: string;
  locationName: string;
  locationUrl: string;
  image: string;
  episodeCount: number;
  createdAt: string;
  episode: string[];
  location: {
    name: string;
  };
  origin: {
    name: string;
  };
}

export interface CharactersResponseInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface CharactersResponse {
  info: CharactersResponseInfo;
  results: Character[];
}

export interface CharactersFilters {
  page: number;
  status?: CharacterStatus;
  gender?: CharacterGender;
}
