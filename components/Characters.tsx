import React, {
  ChangeEvent,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { GrFormTrash } from "react-icons/gr";
import useLocalStorage from "../hooks/useLocalStorage";

//https://stackoverflow.com/questions/54857222/find-all-values-by-specific-key-in-a-deep-nested-object
// function findAllByKey(obj:any, keyToFind:any) {
//   return Object.entries(obj)
//     .reduce((acc, [key, value]) => (key === keyToFind)
//       ? acc.concat(value)
//       : (typeof value === 'object')
//       ? acc.concat(findAllByKey(value, keyToFind))
//       : acc
//     , [])
// }

const CharacterCard = (props: {
  x: string | number;
  i: number;
  cb: Function;
  onClick: MouseEventHandler;
}) => {
  return (
    <span
      onClick={props.onClick}
      className="relative block w-56 p-2 ml-4 text-center text-white border rounded h-fit min-w-56 border-custom-lighter bg-custom-darker">
      {props.x}
      <input
        type="checkbox"
        className="absolute -translate-y-1/2 right-4 top-1/2 border-none cursor-pointer"
        onChange={() => props.cb(props.i)}
      />
    </span>
  );
};

const Characters = ({
  createCharacter,
  useCharacter,
}: {
  createCharacter: Function;
  useCharacter: any;
}) => {
  const characterParent =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
  const [characters, setCharacters] = useCharacter;
  const [selected, setSelected] = useState<number[]>([]);
  //CONTINUE HERE CHARACTERS & SETCHARACTERS HAS ANY TYPE WHICH SHOULD PRODUCE ERROR

  const selectionHandler = (i: number) => {
    if (selected.includes(i)) {
      const temp = selected.filter((num) => num != i);
      setSelected(temp);
    } else {
      setSelected([...selected, i]);
    }
  };

  const characterManagerHandler = (state: string) => {
    if (state == "Remove") {
      selected.forEach((i) => {
        const temp = characterParent.current.children[i];
        temp.querySelector("input")!.checked = false;
      });
      setCharacters([...characters].filter((_, i) => !selected.includes(i)));
      setSelected([]);
    } else {
      createCharacter();
    }
  };

  const characterClicked = (e: React.MouseEvent) => {
    console.log(e.currentTarget.textContent);
  };

  return (
    <div className="relative w-full h-16 m-auto">
      <div
        ref={characterParent}
        className="flex flex-row justify-start flex-none float-left h-full overflow-x-auto w-224 disable-scrollbars">
        {characters.map((x: string, i: number) => (
          <CharacterCard
            onClick={characterClicked}
            x={x}
            i={i}
            key={i}
            cb={selectionHandler}
          />
        ))}
      </div>
      <div className="absolute right-0 float-right w-2/12">
        <span
          onClick={() =>
            characterManagerHandler(selected.length > 0 ? "Remove" : "Add")
          }
          className="cursor-pointer block float-right p-2 text-center text-white border rounded shadow-md w-28 h-fit min-w-28 border-custom-lighter bg-custom-darker">
          {selected.length > 0 ? "Remove" : "Add"}
        </span>
      </div>
    </div>
  );
};

export default Characters;
