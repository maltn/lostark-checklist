import { useState } from "react";

const Card = () => {
  const [finished, setFinished] = useState(false);

  return (
    <div
      onClick={() => setFinished(!finished)}
      className={`relative ${
        finished ? "opacity-20" : "opacity-100"
      } h-20 m-auto mt-8 text-xl text-white border rounded-md shadow-md border-custom-lighter bg-custom-darker w-120`}>
      <span className="center">dawijdiwajidw</span>
    </div>
  );
};

const List = ({ title }: { title: string }) => {
  const arr = [1, 2, 3];

  return (
    <div className="float-left w-1/2 h-auto">
      {arr.map((x, i) => (
        <Card key={i} />
      ))}
    </div>
  );
};

export default List;
