

interface CellProps {
  hasToken: boolean;
  token?: any;
}

export const Cell = ({ hasToken, token }: CellProps) => {
  return (
    <div className="bg-grey-400 w-16 h-16 border border-black ">
      {hasToken ? <img src={token} className="w-full h-full" /> : <></>}
    </div>
  );
};
