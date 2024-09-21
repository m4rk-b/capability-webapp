import React from "react";
import StoreForms from "./store-forms";
import { fetchAllItems, getSession } from "@/lib";

type Item = {
  itemid: number;
  title: string;
  description: string;
  startingprice: number;
  currentbid: number;
  imageurl: string;
}

const StoreItems = async () => {
    const session = await getSession();
  const items: Item[] = await fetchAllItems();
  return (
    <div className="mx-w-xl mx-auto my-10 store-main-container z-0 pt-14">
      <div className="md:flex">
        <div className="grid md:grid-cols-3 xl:grid-cols-4 grid-cols-1 gap-3 store-item-container mt-2">
          {items.map((item) => (
            <div
              className="card card-compact w-80 store-item rounded shadow"
              key={item.itemid}
            >
              <div className="card-body">
                <figure>
                  <img className="img-size" src={item.imageurl} alt="Shoes" />
                </figure>
                <h2 className="card-title">{item.title}</h2>
                <p className="text-sm">{item.description}</p>
                <StoreForms itemid={item.itemid} sessionid={session.id} currentbid={item.currentbid}/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoreItems;
