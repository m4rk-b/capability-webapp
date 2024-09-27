import { revalidatePath } from "next/cache";

export async function bidding(
    itemid:number, sessionid:number, bidamount:number
  ) {
    try {
      const res = await fetch(`${process.env.API_PATH}/bid`, {
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
