import { useAppSelector } from "../../app/hooks";
import { UUID } from "../../app/store";
import { classNames } from "../../app/tailwindHelpers";
import { selectCardList } from "./decksSlice";
import Markdown from "../markdown/Markdown";

export interface CardListProps {
  deck: UUID;
  activeCard?: UUID;
  setActiveCard: (value?: string) => void;
  addCard: () => void;
}

export function CardList({
  deck: deckId,
  activeCard,
  setActiveCard,
  addCard,
}: CardListProps) {
  const cards = useAppSelector(selectCardList(deckId));

  return (
    <div>
      <button
        onClick={() => addCard()}
        className="mb-6 flex h-[3em] w-full place-content-center rounded-lg border border-gray-300 px-2 py-2 text-left text-gray-600"
      >
        Add card
      </button>

      <ul className="divide-y divide-gray-200">
        {cards.map((card) => (
          <li
            key={card.id}
            className={classNames(
              card.id === activeCard && "ring-2 ring-inset ring-indigo-400",
              "relative bg-white hover:bg-gray-50"
            )}
          >
            <button
              onClick={() => setActiveCard(card.id)}
              className="grid h-full w-full grid-cols-2 gap-y-2 py-2 px-2 text-left"
            >
              <Side data={card.front} />
              <Side data={card.back} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Side({ data }: { data: string }) {
  const isBlank = data.trim().length === 0;
  return (
    <div className="h-[3em] overflow-clip text-sm leading-none text-gray-600">
      {isBlank ? (
        <div className="italic text-gray-500">(blank)</div>
      ) : (
        <Markdown data={data} small />
      )}
    </div>
  );
}
