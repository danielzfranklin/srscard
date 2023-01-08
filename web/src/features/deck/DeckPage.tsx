import { useState } from "react";

import { CardList } from "./CardList";
import { CardEdit } from "./CardEdit";
import { UUID } from "../../app/store";
import {
  createCard,
  deleteCard,
  selectCardList,
  selectDeck,
} from "./decksSlice";
import { useAppDispatch, useAppSelector, useAppStore } from "../../app/hooks";
import { useParams } from "react-router-dom";

export function DeckPage() {
  const params = useParams();
  const deckId = params.deck!;

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
    <div className="grid h-full grid-cols-[auto_500px] gap-x-4 p-4">
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
  );
}
