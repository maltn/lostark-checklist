import { ChangeEvent, useEffect, useRef, useState } from "react";
import { GrFormTrash } from "react-icons/gr";

const CharacterCard = ({
  x,
  i,
  cb,
}: {
  x: string | number;
  i: number;
  cb: Function;
}) => {
  return (
    <span className="relative block w-56 p-2 ml-4 text-center text-white border rounded h-fit min-w-56 border-custom-lighter bg-custom-darker">
      {x}
      <input
        type="checkbox"
        className="absolute -translate-y-1/2 right-4 top-1/2 border-none"
        onChange={() => cb(i)}
      />
    </span>
  );
};

const Characters = () => {
  const characterParent =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
  const [characterList, setCharacterList] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
  ]);
  const [selected, setSelected] = useState<number[]>([]);

  const selectionHandler = (i: number) => {
    if (selected.includes(i)) {
      const temp = selected.filter((num) => num != i);
      setSelected(temp);
    } else {
      setSelected([...selected, i]);
    }
  };

  useEffect(() => {
    console.log(selected);
  }, [selected]);

  const characterManagerHandler = () => {
    selected.forEach((i) => {
      const temp = characterParent.current.children[i];
      temp.querySelector("input")!.checked = false;
    });
    setCharacterList(
      [...characterList].filter((_, i) => !selected.includes(i))
    );
    setSelected([]);
  };

  return (
    <div className="relative w-full h-16 m-auto">
      <div
        ref={characterParent}
        className="flex flex-row justify-start flex-none float-left h-full overflow-x-auto w-224 disable-scrollbars">
        {characterList.map((x, i) => (
          <CharacterCard x={x} i={i} key={i} cb={selectionHandler} />
        ))}
      </div>
      <div className="absolute right-0 float-right w-2/12">
        <span
          onClick={() => characterManagerHandler()}
          className="block float-right p-2 text-center text-white border rounded shadow-md w-28 h-fit min-w-28 border-custom-lighter bg-custom-darker">
          {selected.length > 0 ? "Remove" : "Add"}
        </span>
      </div>
    </div>
  );
};

export default Characters;
