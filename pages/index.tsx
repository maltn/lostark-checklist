import type { NextPage } from "next";
import React, { FormEvent, useRef, useState } from "react";
import Characters from "../components/Characters";
import Clock from "../components/Clock";
import List from "../components/List";
import useLocalStorage from "../hooks/useLocalStorage";

class Item {
  title: string;
  completed: boolean;
  reset: number;

  constructor(title: string, reset: number) {
    this.title = title;
    this.completed = false;
    this.reset = reset;
  }
}

interface iChar {
  name: string;
  items: {
    daily: Item[];
    weekly: Item[];
  };
}

const Home: NextPage = () => {
  const [showCreation, toggleCreation] = useState(false);
  const localStorage = useLocalStorage<iChar[]>("characters", []);
  const characterInput =
    useRef<HTMLElement>() as React.MutableRefObject<HTMLInputElement>;

  //character form creation handler
  const formHandler = async (e: FormEvent) => {
    toggleCreation(false);
    const [storage, setLocalStorage] = localStorage;

    const dailyTemp = await fetch("/daily.txt").then((x) => x.text());
    const weeklyTemp = await fetch("/weekly.txt").then((x) => x.text());

    const daily = dailyTemp.split("\n").map((name) => new Item(name, 86400));
    const weekly = weeklyTemp.split("\n").map((name) => new Item(name, 604800));

    setLocalStorage([
      ...storage,
      {
        name: characterInput.current.value,
        items: {
          daily,
          weekly,
        },
      },
    ]);

    e.preventDefault();
  };

  const CharCreation = () => {
    return (
      <React.Fragment>
        <div
          onClick={() => toggleCreation(false)}
          className="bg-black w-full h-full absolute left-0 top-0 z-10 bg-opacity-60"></div>
        <div className="absolute center-absolute-horizontally w-96 h-32 top-64 bg-custom-dark border border-custom-lighter backdrop-blur-xl z-20 rounded-md">
          <form
            onSubmit={formHandler}
            action="#"
            className="w-full h-full flex flex-col">
            <input
              type="text"
              className="w-11/12 m-auto h-10 outline-none pl-4 relative rounded-sm"
              name="characterName"
              ref={characterInput}
            />
            <div className="flex justify-center space-x-8 mb-4">
              <input
                className="bg-custom-darker text-white p-2 cursor-pointer rounded-sm pr-4 pl-4 border border-custom-lighter"
                type="button"
                value="Cancel"
                onClick={() => toggleCreation(false)}
              />
              <button className="bg-custom-darker text-white p-2 cursor-pointer rounded-sm pr-4 pl-4 border border-custom-lighter">
                Confirm
              </button>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      {showCreation && <CharCreation />}

      <div className="relative flex flex-col h-auto p-8 m-auto mt-8 border rounded shadow-xl bg-custom-dark w-272 border-custom-lighter">
        <Clock className="block m-auto text-center text-white text-7xl w-160" />
        {/* <div className="w-1/2 m-auto text-center bg-red-500">
					dioawjdijawjdwai
				</div> */}
        <Characters
          createCharacter={() => toggleCreation(true)}
          useCharacter={localStorage}
        />

        <div className="w-full mb-4">
          <span className="block float-left w-1/2 m-auto text-4xl text-center text-white opacity-30">
            Weekly
          </span>
          <span className="block float-right w-1/2 m-auto text-4xl text-center text-white">
            Daily
          </span>
        </div>

        <div>
          <List type="weekly" />
          <List type="daily" />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
