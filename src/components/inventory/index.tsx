import { Bag } from "./bag";
import { Equipments } from "./equipments";
import { ItemCard } from "./itemCard";

export const Inventory = () => {
  return (
    <div className="flex flex-col w-screen border-4 border-red-900 ">
      <div className="bg-red-900 rounded-t-md">
        <span className="text-xs  p-2  font-bold md:text-sm lg:text-base">
          Inventário
        </span>
      </div>
      <div className="flex flex-row justify-evenly ">
        <Equipments />
        <Bag/>
      </div>
    </div>
  );
};
