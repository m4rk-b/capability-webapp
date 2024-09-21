export async function bidding(
    itemid:number, sessionid:number, bidamount:number
  ) {
    try {
      const res = await fetch(`http://localhost:10000/bid`, {
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