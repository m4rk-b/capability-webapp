import React from "react";
import { fecthAuction, fetchAllItems, fetchWinningBidder, getSession } from "@/lib";
import StoreForms from "./store-forms";

type Item = {
  itemid: number;
  title: string;
  description: string;
  startingprice: number;
  currentbid: number;
  imageurl: string;
};

const StoreItems = async () => {
  const session = await getSession();
  const items: Item[] = await fetchAllItems();

  // Fetch winning bidders asynchronously before rendering
  const winningBidders = await Promise.all(
    items.map(async (item) => ({
      itemid: item.itemid,
      bidder: await fetchWinningBidder(item.itemid),
    }))
  );

  const itemsForAuction = await Promise.all(
    items.map(async (item) => ({
      itemid: item.itemid,
      auction: await fecthAuction(item.itemid),
    }))
  );

  return (
    <div className="mx-w-xl mx-auto my-10 z-0 pt-14">
      <div className="md:flex">
        <div className="grid md:grid-cols-3 xl:grid-cols-4 grid-cols-1 gap-3 m-auto mt-2">
          {items.map((item) => {
            const winningBidder = winningBidders.find(bid => bid.itemid === item.itemid)?.bidder;
            const itemForAuction = itemsForAuction.find(item_auction => item_auction.itemid === item.itemid)?.auction;
            const winningUser: string = winningBidder?.userid === session.id ? "You" : winningBidder?.username;
            return ( // Added return here
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
                  
                      <StoreForms
                        itemid={item.itemid}
                        sessionid={session.id}
                        currentbid={item.currentbid}
                        starttime={itemForAuction?.starttime}
                        endtime={itemForAuction?.endtime}
                        winninguser={winningUser} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StoreItems;
