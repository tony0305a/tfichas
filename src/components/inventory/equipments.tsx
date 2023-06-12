import { Square } from "phosphor-react";
import { useState } from "react";

export const Equipments = () => {
  const [img, setImg] = useState<any>("0");

  const [slotNecklace, setSlotNecklace] = useState<any>(
    "https://res.cloudinary.com/practicaldev/image/fetch/s--ezXhIQ-a--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/iia7eadphckv4zhyncti.png"
  );
  const [slotHead, setSlotHead] = useState<any>(
    "https://res.cloudinary.com/practicaldev/image/fetch/s--ezXhIQ-a--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/iia7eadphckv4zhyncti.png"
  );
  const [slotRing, setSlotRing] = useState<any>(
    "https://res.cloudinary.com/practicaldev/image/fetch/s--ezXhIQ-a--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/iia7eadphckv4zhyncti.png"
  );

  const [slotLHand, setSlotLHand] = useState<any>(
    "https://res.cloudinary.com/practicaldev/image/fetch/s--ezXhIQ-a--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/iia7eadphckv4zhyncti.png"
  );
  const [slotArmor, setSlotArmor] = useState<any>(
    "https://res.cloudinary.com/practicaldev/image/fetch/s--ezXhIQ-a--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/iia7eadphckv4zhyncti.png"
  );
  const [slotRHand, setSlotRHand] = useState<any>(
    "https://res.cloudinary.com/practicaldev/image/fetch/s--ezXhIQ-a--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/iia7eadphckv4zhyncti.png"
  );
  const [slotL, setSlotL] = useState<any>(
    "https://res.cloudinary.com/practicaldev/image/fetch/s--ezXhIQ-a--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/iia7eadphckv4zhyncti.png"
  );
  const [slotM, setSlotM] = useState<any>(
    "https://res.cloudinary.com/practicaldev/image/fetch/s--ezXhIQ-a--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/iia7eadphckv4zhyncti.png"
  );
  const [slotR, setSlotR] = useState<any>(
    "https://res.cloudinary.com/practicaldev/image/fetch/s--ezXhIQ-a--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/iia7eadphckv4zhyncti.png"
  );

  const handleOnDrop = (e: React.DragEvent, slot: any) => {
    const itemImg = e.dataTransfer.getData("itemImg") as string;
    slot(itemImg);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col items-center gap-1 ">
      Equipamentos
      <div className="flex flex-row gap-1 ">
        <div>
          <img
            src={slotNecklace}
            draggable={true}
            onDrop={(e) => handleOnDrop(e, setSlotNecklace)}
            onDragOver={handleDragOver}
            className="w-[80px] h-[80px]"
          />
        </div>
        <div>
          <img
            src={slotHead}
            draggable={true}
            onDrop={(e) => handleOnDrop(e, setSlotHead)}
            onDragOver={handleDragOver}
            className="w-[80px] h-[80px]"
          />
        </div>
        <div>
          <img
            src={slotRing}
            draggable={true}
            onDrop={(e) => handleOnDrop(e, setSlotRing)}
            onDragOver={handleDragOver}
            className="w-[80px] h-[80px]"
          />
        </div>
      </div>
      <div className="flex flex-row gap-1">
        <div>
          <img
            src={slotLHand}
            draggable={true}
            onDragOver={handleDragOver}
            onDrop={(e) => handleOnDrop(e, setSlotLHand)}
            className="w-[80px] h-[80px]"
          />
        </div>
        <div>
          <img
            src={slotArmor}
            draggable={true}
            onDrop={(e) => handleOnDrop(e, setSlotArmor)}
            onDragOver={handleDragOver}
            className="w-[80px] h-[80px]"
          />
        </div>
        <div>
          <img
            src={slotRHand}
            draggable={true}
            onDrop={(e) => handleOnDrop(e, setSlotRHand)}
            onDragOver={handleDragOver}
            className="w-[80px] h-[80px]"
          />
        </div>
      </div>
      <div className="flex flex-row gap-1">
        <div>
          <img
            src={slotL}
            draggable={true}
            onDrop={(e) => handleOnDrop(e, setSlotL)}
            onDragOver={handleDragOver}
            className="w-[80px] h-[80px]"
          />
        </div>
        <div>
          <img
            src={slotM}
            draggable={true}
            onDrop={(e) => handleOnDrop(e, setSlotM)}
            onDragOver={handleDragOver}
            className="w-[80px] h-[80px]"
          />
        </div>
        <div>
          <img
            src={slotR}
            draggable={true}
            onDrop={(e) => handleOnDrop(e, setSlotR)}
            onDragOver={handleDragOver}
            className="w-[80px] h-[80px]"
          />
        </div>
      </div>
    </div>
  );
};
