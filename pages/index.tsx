import type { NextPage } from "next";
import Characters from "../components/Characters";
import Clock from "../components/Clock";
import List from "../components/List";

const Home: NextPage = () => {
  return (
    <div className="relative flex flex-col h-auto p-8 m-auto mt-8 border rounded shadow-xl bg-custom-dark w-272 border-custom-lighter">
      <Clock className="block m-auto text-center text-white text-7xl w-160" />
      {/* <div className="w-1/2 m-auto text-center bg-red-500">
        dioawjdijawjdwai
      </div> */}
      <Characters />

      <div className="w-full mb-4">
        <span className="block float-left w-1/2 m-auto text-4xl text-center text-white opacity-30">
          Weekly
        </span>
        <span className="block float-right w-1/2 m-auto text-4xl text-center text-white">
          Daily
        </span>
      </div>

      <div>
        <List />
        <List />
      </div>
    </div>
  );
};

export default Home;
