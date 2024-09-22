import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from 'next/server'
 
export async function GET(request: Request) {
  cookies().set("session", "", { expires: new Date(0) });
  redirect('/login');
  // return NextResponse.json({ msg: 'Hello from server' })
}

// export default async function handler(req: NextRequest, res: NextResponse) {
//     cookies().set("session", "", { expires: new Date(0) });
//     // redirect('/login');
//     return res.json();
//   }