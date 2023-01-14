import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EpochMillis, RootState, UUID } from "../../app/store";

// Based on the Anki algorithm as described in
// <https://www.juliensobczak.com/inspect/2022/05/30/anki-srs.html>

// TODO: Refactor quirks of anki implementation, like
// CardState `left`, time units

export interface StudyState {
  deckConfig: {
    [deck: UUID]: DeckConfig;
  };
  deckState: {
    [deck: UUID]: DeckState;
  };
  cardState: {
    [deck: UUID]: {
      [card: UUID]: CardState;
    };
  };
}

export interface DeckConfig {
  // Whether new cards should be mixed with reviews, or shown first or last
  newCardSpread: "distribute" | "last" | "first";
  // "Learn ahead limit"
  collapseTimeSecs: number;
  new: {
    // "Learning steps"
    delaysMins: number[];
    // "Graduating interval/Easy interval"
    ints: number[];
    // "Starting ease"
    initialFactor: number;
    // "Maximum reviews/day"
    perDay: number;
  };
  review: {
    // "Maximum new/day"
    perDay: number;
    // "Easy bonus"
    ease4: number;
    // "Maximum interval"
    maxInterval: number;
    // "Hard interval"
    hardFactor: number;
  };
  lapse: {
    // "Relearning steps"
    delays: number[];
    // "New interval"
    multiplier: number;
    // "Minimum interval"
    minInterval: number;
    // "Leech threshold"
    leechFails: 8;
  };
}

const defaultConfig: DeckConfig = {
  newCardSpread: "distribute",
  collapseTimeSecs: 1_200,
  new: {
    delaysMins: [1, 10],
    ints: [1, 4],
    initialFactor: 2_500,
    perDay: 20,
  },
  review: {
    perDay: 200,
    ease4: 1.3,
    maxInterval: 36_500,
    hardFactor: 1.2,
  },
  lapse: {
    delays: [10],
    multiplier: 0,
    minInterval: 1,
    leechFails: 8,
  },
};

export interface DeckState {
  deck: UUID;
  // The time to use to measure days since creation
  creation: EpochMillis;
  // An upper limit for new and review cards
  queueLimit: number;
  // An upper limit for learning cards
  reportLimit: number;
  // The number of already reviewed cards today
  reps: number;
  // The number of days since the collection creation
  today: number;
  // The timestamp of the end of day
  dayCutoffMillis: number;
  // The timestamp in seconds to determine the learn ahead limit
  learnCutoffSecs: number;
}

export interface CardState {
  deck: UUID;
  id: UUID;
  // In anki 0=new, 1=learning, 2=review, 3=relearning
  type: "new" | "learning" | "review" | "relearning";
  // In anki -1=suspend 0=new 1=learn 2=review
  queueType: "suspend" | "new" | "learn" | "review";
  // Negative = seconds, positive = days
  interval: number;
  // The ease factor in permille.
  //
  // Ex: 2500 = the interval will be multiplied by 2.5 the next time you press
  // "Good".
  factor: number;
  // The number of review
  reps: number;
  // The number of times the card went from a "was answered correctly" to "was
  // answered incorrectly" state.
  lapses: number;
  // Of the form a*1000+b, with: a => the number of reps left today b => the
  // number of reps left till graduation
  //
  // Ex: '2004' = 2 reps left today and 4 reps till graduation
  left: number;
  // Due is used differently for different card types:
  // - new => note id or random int
  // - lrn => integer timestamp in second
  // - rev => integer day, relative to the collection's creation time
  due: string | number;
}

const initialState: StudyState = {
  deckConfig: {},
  cardState: {},
  deckState: {},
};

export const studySlice = createSlice({
  name: "study",
  initialState,
  reducers: {
    updateLearnCutoff(
      state,
      action: PayloadAction<{ deck: UUID; force: boolean }>
    ) {
      const { deck, force } = action.payload;
      const deckConfig = state.deckConfig[deck];
      const deckState = state.deckState[deck];

      const nextCutoff = nowSecs() + deckConfig.collapseTimeSecs;
      if (nextCutoff - deckState.learnCutoffSecs > 60 || force) {
        deckState.learnCutoffSecs = nextCutoff;
      }
    },
  },
});

// export const { } = studySlice.actions;
export default studySlice.reducer;

function daysSince(time: EpochMillis): number {
  const now = Date.now();
  return Math.floor(now - time) / (1000 * 60 * 60 * 24);
}

function dayCutoff(): number {
  const now = new Date();

  const date = new Date();
  date.setHours(0, 0, 0, 0);

  if (date < now) {
    date.setDate(date.getDate() + 1);
  }

  return +date;
}

function nowSecs(): number {
  return Math.floor(Date.now() / 1000);
}
