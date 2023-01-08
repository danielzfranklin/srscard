import { useSelector } from "react-redux";
import { useRef } from "react";
import { SwitchTransition, CSSTransition } from "react-transition-group";

import { UUID } from "../../app/store";
import { selectCard } from "./decksSlice";
import Markdown from "../markdown/Markdown";

import "./cardTransition.css";

export type CardSide = "front" | "back";

export interface CardProps {
  deck: UUID;
  id: UUID;
  side: CardSide;
  setSide: (side: CardSide) => void;
}

export function Card({ deck, id, side, setSide }: CardProps) {
  const card = useSelector(selectCard(deck, id));

  const flip = () => setSide(side === "front" ? "back" : "front");

  const frontRef = useRef<HTMLButtonElement>(null);
  const backRef = useRef<HTMLButtonElement>(null);
  const currentRef = side === "front" ? frontRef : backRef;

  return (
    <SwitchTransition>
      <CSSTransition
        key={side}
        nodeRef={currentRef}
        classNames="side"
        addEndListener={(done) =>
          currentRef.current?.addEventListener("transitionend", done, false)
        }
      >
        <button
          onClick={flip}
          ref={currentRef}
          className="min-h-[20em] w-full rounded-lg bg-white p-10 leading-relaxed shadow"
        >
          <Markdown data={side === "front" ? card.front : card.back} />
        </button>
      </CSSTransition>
    </SwitchTransition>
  );
}
