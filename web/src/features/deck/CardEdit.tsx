import { Tab } from "@headlessui/react";
import { Ref, useState } from "react";
import { useSelector } from "react-redux";

import { useAppDispatch } from "../../app/hooks";
import { UUID } from "../../app/store";
import { classNames } from "../../app/tailwindHelpers";
import { AppButton } from "../AppButton";
import { Card, CardSide } from "./Card";
import { selectCard, updateCard } from "./decksSlice";

export interface CardEditProps {
  deck: UUID;
  card: UUID;
  deleteCard: () => void;
}

export function CardEdit({ deck, card: cardId, deleteCard }: CardEditProps) {
  const dispatch = useAppDispatch();
  const card = useSelector(selectCard(deck, cardId));

  const [lastFocus, setLastFocus] = useState<UUID | undefined>(undefined);
  const frontEditRef = (elem: HTMLTextAreaElement) => {
    if (elem !== null && cardId !== lastFocus) {
      elem.focus();
      setLastFocus(cardId);
    }
  };

  const [previewSide, setPreviewSide] = useState<CardSide>("front");

  return (
    <Tab.Group>
      {() => (
        <div className="flex h-full flex-col">
          <Tab.List className="mb-2 flex justify-between">
            <div>
              <EditTab name="Write" />
              <EditTab name="Preview" />
            </div>

            <div>
              <AppButton type="regular" onClick={() => deleteCard()}>
                Delete
              </AppButton>
            </div>
          </Tab.List>

          <Tab.Panels className="grow">
            <Tab.Panel className="flex flex-col gap-2">
              <SideEdit
                innerRef={frontEditRef}
                value={card.front}
                setValue={(front) =>
                  dispatch(updateCard(deck, cardId, front, undefined))
                }
              />
              <SideEdit
                value={card.back}
                setValue={(back) =>
                  dispatch(updateCard(deck, cardId, undefined, back))
                }
              />
            </Tab.Panel>

            <Tab.Panel className="h-full bg-gray-100 p-8">
              <Card
                deck={deck}
                id={cardId}
                side={previewSide}
                setSide={setPreviewSide}
              />
            </Tab.Panel>
          </Tab.Panels>
        </div>
      )}
    </Tab.Group>
  );
}

function SideEdit({
  innerRef,
  value,
  setValue,
}: {
  innerRef?: Ref<HTMLTextAreaElement>;
  value: string;
  setValue: (value: string) => void;
}) {
  return (
    <textarea
      ref={innerRef}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      rows={10}
      className="block w-full rounded-md border-gray-300 shadow-sm  focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
    />
  );
}

function EditTab({ name }: { name: string }) {
  return (
    <Tab
      className={({ selected }) =>
        classNames(
          selected
            ? "bg-gray-100 text-gray-900 hover:bg-gray-200"
            : "bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-900",
          "rounded-md border border-transparent px-3 py-1.5 text-sm font-medium"
        )
      }
    >
      {name}
    </Tab>
  );
}
