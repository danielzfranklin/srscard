import { useState } from "react";

import { CardList } from "./CardList";
import { CardEdit } from "./CardEdit";
import { UUID } from "../../app/store";
import {
  createCard,
  deleteCard,
  selectCardList,
  selectDeck,
  selectNextCard,
} from "./decksSlice";
import { useAppDispatch, useAppSelector, useAppStore } from "../../app/hooks";
import { AppButton } from "../AppButton";

export interface DeckProps {
  deck: UUID;
}

export function Deck({ deck: deckId }: DeckProps) {
  const dispatch = useAppDispatch();
  const store = useAppStore();
  const [activeCard, setActiveCard] = useState<UUID | undefined>(undefined);
  const deck = useAppSelector(selectDeck(deckId));

  const addCard = () => {
    const action = dispatch(createCard(deckId, "", ""));
    setActiveCard(action.payload.id);
  };

  const deleteActiveCard = () => {
    if (activeCard === undefined) return;

    const cardList = selectCardList(deckId)(store.getState());
    let next = undefined;
    if (cardList.length !== 1) {
      const currentIdx = cardList.findIndex((card) => card.id === activeCard);
      next = cardList[(currentIdx + 1) % cardList.length].id;
    }

    dispatch(deleteCard(deckId, activeCard));
    setActiveCard(next);
  };

  return (
    <div className="grid h-full grid-rows-[min-content_1fr] gap-y-2 p-4">
      <h2>{deck.name}</h2>

      <div className="grid grid-cols-[auto_500px] gap-x-4">
        <CardList
          deck={deckId}
          activeCard={activeCard}
          setActiveCard={setActiveCard}
          addCard={addCard}
        />
        {activeCard !== undefined ? (
          <CardEdit
            deck={deckId}
            card={activeCard}
            deleteCard={deleteActiveCard}
          />
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
