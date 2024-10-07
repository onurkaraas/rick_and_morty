// src/store/useCharacterStore.ts
import { create } from "zustand";

interface CharacterState {
  selectedCharacters: number[];
  toggleCharacter: (id: number) => void;
}

export const useCharacterStore = create<CharacterState>((set) => ({
  selectedCharacters: [],
  toggleCharacter: (id) =>
    set((state) => ({
      selectedCharacters: state.selectedCharacters.includes(id)
        ? state.selectedCharacters.filter((charId) => charId !== id)
        : [...state.selectedCharacters, id],
    })),
}));
