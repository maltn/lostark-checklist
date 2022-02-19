import { useEffect, useState } from "react";
import { readFileSync } from "fs";

const Card = ({ item }: { item: string }) => {
  const [finished, setFinished] = useState(false);

  return (
    <div
      onClick={() => setFinished(!finished)}
      className={`relative ${
        finished ? "opacity-20" : "opacity-100"
      } h-20 m-auto mb-8 text-xl text-white border rounded shadow-md border-custom-lighter bg-custom-darker w-120 cursor-pointer select-none`}>
      <span className="center">{item}</span>
    </div>
  );
};

const List = ({ type }: { type: string }) => {
  const [items, setItems] = useState<string[]>([]);
  useEffect(() => {
    const getItems = async () => {
      const data = await fetch(`/${type}.txt`);
      const content = await data.text();
      setItems(content.split("\n"));
    };

    getItems();
  }, []);

  return (
    <div className="float-left w-1/2 h-auto">
      {items.map((item, i) => (
        <Card key={i} item={item} />
      ))}
    </div>
  );
};

export default List;
