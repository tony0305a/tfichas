import { Square } from "phosphor-react";
import { useState } from "react";

export const Bag = () => {
  const [bag, setBag] = useState<any>([
    "https://i.redd.it/could-vecnas-clawed-hand-be-a-demogorgons-hand-v0-gd5k6balrh691.jpg?width=447&format=pjpg&auto=webp&s=a58e7925045ad2e4161762a7c2c387e030703621",
    "https://cdn.shopify.com/s/files/1/0258/7187/6156/products/beadlegrimms2-0020.jpg?v=1654798975&width=1946",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGDJsSiwFS5uhGAE9lN3FZIqHPw-C7CVZ6Vg&usqp=CAU",
    "https://cdn.imgbin.com/1/19/22/imgbin-dungeons-dragons-cloak-outerwear-hood-magic-item-cloak-yxy47ywJP8aXsEe1NfcUDWzTw.jpg",
    "https://www.dndbeyond.com/avatars/thumbnails/7/440/1000/1000/636284774073071216.jpeg",
    "https://i.pinimg.com/originals/ce/3e/e7/ce3ee78998e0871e8dfd248e2fb02330.png",
    "https://64.media.tumblr.com/8dcb08c7f1edea651ed3dd56feced753/18468924f9f6c556-2c/s1280x1920/a0652a483e79a091dd61728e887ff3decabf6275.jpg",
    "https://res.cloudinary.com/practicaldev/image/fetch/s--ezXhIQ-a--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/iia7eadphckv4zhyncti.png",
    "https://res.cloudinary.com/practicaldev/image/fetch/s--ezXhIQ-a--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/iia7eadphckv4zhyncti.png",
    "https://res.cloudinary.com/practicaldev/image/fetch/s--ezXhIQ-a--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/iia7eadphckv4zhyncti.png",
  ]);

  const handleOnDrag = (e: React.DragEvent, itemImg: string,key:any) => {
    e.dataTransfer.setData("itemImg", itemImg);
    setBag[key]("0")
  };

  const img = "https://classicdb.ch/itemmodels/item_31966.jpg";

  return (
    <div className="flex flex-col items-center">
      Mochila
      <div className="flex flex-row gap-2">
        {bag.map((item,index) => (
          <img
            src={item}
            draggable
            onDragStart={(e) => handleOnDrag(e, item,index)}
            className="w-[64px]"
          />
        ))}
      </div>
    </div>
  );
};
