"use client";
import { bidding } from "@/test_db";
import { revalidatePath } from "next/cache";
import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";

type Item = {
  itemid: number;
  sessionid: number;
  currentbid: number;
};

const StoreForms: React.FC<Item> = ({ itemid, sessionid, currentbid }) => {
  let bidvalue: any = React.createRef();

  // This should be in a Server Component
  const placebid = async () => {
    const result = await bidding(
      itemid,
      sessionid,
      parseInt(bidvalue.current.value)
    );
    alert(result.message);
  };

  return (
    <div className="flex">
      <div className="card-actions justify-end">
        <button className="btn btn-square btn-ghost btn-xs">
          <FaMinus />
        </button>
        <input
          ref={bidvalue}
          defaultValue={currentbid}
          className="input input-bordered input-xs w-14 max-w-xs text-center"
        />
        <button className="btn btn-square btn-ghost btn-xs">
          <FaPlus />
        </button>
        <button
          className="btn btn-xs btn-ghost"
          onClick={() => {
            placebid();
          }}
        >
          Bid
        </button>
      </div>
    </div>
  );
};

export default StoreForms;
