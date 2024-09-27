import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { parse } from "path";
import dotenv from "dotenv";
import { redirect } from "next/navigation";

dotenv.config();

const secretKey = process.env.SECRET_KEY;
const key = new TextEncoder().encode(secretKey);

const expiration = 5 * 60 * 1000;

export async function encrypt(payload: any) {
  const expirationTime = new Date(Date.now() + expiration);

  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expirationTime)
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

interface SignInResponse {
  id: number;
  message: string;
}

export async function login(formData: FormData) {
  const user = {
    username: formData.get("username"),
    passwordhash: formData.get("password"),
  };

  //Credentials verification
  try {
    const res = await fetch(`${process.env.API_PATH}users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: user.username,
        passwordhash: user.passwordhash,
      }),
    });

    const data: SignInResponse = await res.json();

    if (res.ok) {
      const expires = new Date(Date.now() + expiration);
      const session = await encrypt({ id: data.id, expires });
      cookies().set("session", session, { expires, httpOnly: true });
      redirect('/home/store');
    }
    return data;
  } catch (err) {}
}

/* Logout function was moved in api/logout
export async function logout() {
  cookies().set("session", "", { expires: new Date(0) });
  redirect('/login');
}
*/

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + expiration);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parse),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}

export async function fetchAllItems() {
  try {
    const res = await fetch(`${process.env.API_PATH}items`, {
      cache: "no-store",
    });
    return await res.json();
  } catch (err) {
    return { error: err };
  }
}

export async function fetchSingleUser(userid: string) {
  try {
    const res = await fetch(`${process.env.API_PATH}users/${userid}`, {
      cache: "no-store",
    });
    return await res.json();
  } catch (err) {}
}

export async function fetchWinningBidder(itemid: number, sessionid: number) {
  try {
    const res = await fetch(`${process.env.API_PATH}winningbid/${itemid}`, {
      cache: "no-store",
    });
    return await res.json();
  } catch (err) {}
}

export async function bidding(
  formData: FormData,
  sessionid: number,
  itemid: number
) {
  const item = { bidamount: formData.get("bidamount") };
  const itmid: string = itemid.toString();

  try {
    const res = await fetch(`${process.env.API_PATH}/bid`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        itemid: itemid,
        userid: sessionid,
        bidamount: item.bidamount,
      }),
    });
    return await res.json();
  } catch (err) {
    return { message: "Something went wrong! Please try again." };
  }
}
