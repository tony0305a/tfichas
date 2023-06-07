export const BaCase = ({ ba, baD }) => {
  return (
    <div className="flex flex-col border-2 border-white-500 items-center rounded-md text-[18px] h-24 ">
      <span className="font-bold text-[16px] px-2" >Bônus de Ataque</span>
      <div className="flex flex-row gap-2 mt-1 ">

        <div className="flex flex-col border items-center w-12 border-white rounded-md ">
          <span className="text-red">BA</span>
          <span className="font-bold">+{ba}</span>
        </div>

        <div className="flex flex-row">
          <div className="flex flex-col items-center w-12 border border-white rounded-md ">
            <span className="text-red">BAD</span>
            <span className="font-bold">+{baD}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
