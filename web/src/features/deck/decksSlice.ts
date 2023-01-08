import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { EpochMillis, RootState, UUID, uuid } from "../../app/store";
import testDecksData from "./testDecksData";

export interface Deck {
  id: UUID;
  name: UUID;
  createdAt: EpochMillis;
  updatedAt: EpochMillis;
}

export interface Card {
  id: UUID;
  deck: UUID;
  front: string;
  back: string;
  createdAt: EpochMillis;
  updatedAt: EpochMillis;
}

export interface DecksState {
  deck: { [id: UUID]: Deck };
  card: {
    [deck: UUID]: {
      [id: UUID]: Card;
    };
  };
}

// const initialState: DeckState = {
//     deck: {},
//     card: {}
// };

const initialState: DecksState = testDecksData;

export const decksSlice = createSlice({
  name: "decks",
  initialState: initialState,
  reducers: {
    createCard: {
      reducer(state, action: PayloadAction<Card>) {
        const { deck, id } = action.payload;
        state.card[deck][id] = action.payload;
      },
      prepare(deck: UUID, front: string, back: string) {
        const now = Date.now();
        const id = uuid();

        return {
          payload: { id, deck, front, back, createdAt: now, updatedAt: now },
        };
      },
    },
    updateCard: {
      reducer(
        state,
        action: PayloadAction<{
          id: UUID;
          deck: UUID;
          front?: string;
          back?: string;
        }>
      ) {
        const { deck, id, front, back } = action.payload;
        const card = state.card[deck][id];
        if (front !== undefined) card.front = front;
        if (back !== undefined) card.back = back;
      },
      prepare(deck: UUID, id: UUID, front?: string, back?: string) {
        return { payload: { id, deck, front, back } };
      },
    },
    deleteCard: {
      reducer(state, action: PayloadAction<{ deck: UUID; id: UUID }>) {
        const { deck, id } = action.payload;
        delete state.card[deck][id];
      },
      prepare(deck: UUID, id: UUID) {
        return { payload: { id, deck } };
      },
    },
  },
});

export const selectDeck = (id: UUID) => (state: RootState) =>
  state.decks.deck[id];

export const selectCard = (deck: UUID, id: UUID) => (state: RootState) =>
  state.decks.card[deck][id];

export const selectCardList = (deck: UUID) => (state: RootState) =>
  Object.values(state.decks.card[deck]).sort(
    (a, b) => b.updatedAt - a.updatedAt
  );

export const { createCard, updateCard, deleteCard } = decksSlice.actions;
export default decksSlice.reducer;
