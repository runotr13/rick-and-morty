'use client';

import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type {
  CharacterGender,
  CharacterStatus,
} from '@/features/characters/rick-and-morty-types';

interface FiltersBarProps {
  status?: CharacterStatus;
  gender?: CharacterGender;
  onStatusChange: (status: CharacterStatus | 'all') => void;
  onGenderChange: (gender: CharacterGender | 'all') => void;
}

export const FiltersBar: React.FC<FiltersBarProps> = ({
  status,
  gender,
  onStatusChange,
  onGenderChange,
}) => {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-slate-800 bg-slate-900/60 p-4 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-sm font-medium text-slate-100">Filters</p>
      </div>

      <div className="flex gap-3">
        <Select
          value={status ?? 'all'}
          onValueChange={(value) =>
            onStatusChange(value as CharacterStatus | 'all')
          }
        >
          <SelectTrigger className="w-[150px] bg-slate-950 border-slate-700">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="bg-slate-900 border-slate-700 text-white">
            <SelectItem value="all">All status</SelectItem>
            <SelectItem value="alive">Alive</SelectItem>
            <SelectItem value="dead">Dead</SelectItem>
            <SelectItem value="unknown">Unknown</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={gender ?? 'all'}
          onValueChange={(value) =>
            onGenderChange(value as CharacterGender | 'all')
          }
        >
          <SelectTrigger className="w-[170px] bg-slate-950 border-slate-700">
            <SelectValue placeholder="Gender" />
          </SelectTrigger>
          <SelectContent className="bg-slate-900 border-slate-700 text-white">
            <SelectItem value="all">All genders</SelectItem>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="genderless">Genderless</SelectItem>
            <SelectItem value="unknown">Unknown</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
