import dotenv from "dotenv";

dotenv.config();

export async function bidding(
    itemid:number, sessionid:number, bidamount:number
  ) {
    try {
      //https://capability-training-api.onrender.com/bid
      const res = await fetch('https://capability-training-api.onrender.com/bid', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itemid: itemid,
          userid: sessionid,
          bidamount: bidamount,
        }),
      });
      return await res.json();
    } catch (err) {
      return { message: "Something went wrong! Please try again." };
    }
  }
