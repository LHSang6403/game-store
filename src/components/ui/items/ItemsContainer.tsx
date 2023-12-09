import Item from "./Item";

const ItemsContainer = () => {
  return (
    <div className="w-full h-full pt-2 pb-20 overflow-auto flex flex-col gap-8">
      <div className="w-fit h-fit grid grid-cols-6 grid-rows-3 gap-6 items-center">
        <div className="col-span-3 w-full h-44 rounded-2xl bg-slate-400"></div>
        <Item />
        <Item />
        <Item />
        <div className="col-span-2 w-full h-40 rounded-2xl bg-slate-400"></div>
        <div className="col-span-2 w-full h-40 rounded-2xl bg-slate-400"></div>
        <div className="col-span-2 row-span-2 w-full h-80 rounded-2xl bg-slate-400"></div>
        <Item />
        <Item />
        <Item />
        <Item />
      </div>
      <div className="w-fit h-[800px] grid grid-cols-6 grid-rows-3 gap-6 items-center">
        <div className="col-span-2 w-full h-40 rounded-2xl bg-slate-400"></div>
        <div className="col-span-2 w-full h-40 rounded-2xl bg-slate-400"></div>
        <div className="col-span-2 row-span-2 w-full h-80 rounded-2xl bg-slate-400"></div>
        <Item />
        <Item />
        <Item />
        <Item />
        <div className="col-span-2 w-full h-40 rounded-2xl bg-slate-400"></div>
        <Item />
        <div className="col-span-2 w-full h-40 rounded-2xl bg-slate-400"></div>
        <Item />
      </div>
    </div>
  );
};

export default ItemsContainer;
