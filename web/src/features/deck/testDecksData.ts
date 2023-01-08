import { DecksState } from "./decksSlice";

const wfrDeckId = "4a4c2adc-f6b6-4385-b30d-4af95a24c270";
const otherDeckId = "8613f4d3-69a9-4d52-ae77-2ef6818c9d4c";
const at = Date.now();

const data: DecksState = {
  deck: {
    [wfrDeckId]: {
      id: wfrDeckId,
      name: "WFR",
      createdAt: at,
      updatedAt: at,
    },
    [otherDeckId]: {
      id: otherDeckId,
      name: "Other",
      createdAt: at,
      updatedAt: at,
    },
  },
  card: {
    [wfrDeckId]: {
      "aee81fa8-1aa0-4963-8ebd-f23623877bb2": {
        id: "aee81fa8-1aa0-4963-8ebd-f23623877bb2",
        deck: wfrDeckId,
        front: "front wfr a",
        back: "# back wfr a\nfoo bar. and also some other text.\n1. foo\n1. bar\n1. baq\n1. hi there\n1. another item\n1. foobar",
        createdAt: at,
        updatedAt: at,
      },
      "2b48c491-da0f-4c9a-8dbd-01b1f67368a0": {
        id: "2b48c491-da0f-4c9a-8dbd-01b1f67368a0",
        deck: wfrDeckId,
        front: "front wfr b",
        back: "back wfr b",
        createdAt: at,
        updatedAt: at,
      },
    },
    [otherDeckId]: {
      "ae177258-687d-4e0c-9533-b91685d9b2c7": {
        id: "ae177258-687d-4e0c-9533-b91685d9b2c7",
        deck: otherDeckId,
        front: "front other a",
        back: "back other a",
        createdAt: at,
        updatedAt: at,
      },
    },
  },
};

export default data;
