import { NextResponse } from "next/server"
import { NextRequest } from "next/server"
// import { initializeApp } from "firebase-admin"
// import * as jwt from "jsonwebtoken"
import { decodeJwt } from 'jose'
// This function can be marked `async` if using `await` inside

// function _utf8ToUint8Array(str: string) {
//   const encoder = new TextEncoder();
//   return encoder.encode(str);
// }

// async function fetchPublicKey(kid: string) {
//   var key: any = await (await fetch('https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com')).json();

//   key = key[kid];
//   key = _utf8ToUint8Array(key)
//   return key;
// }

export function middleware(request: NextRequest) {
  console.log("middleware called for", request.url)

  const idToken = request.headers.get("authorization")
  if (idToken){
    const decoded = decodeJwt(idToken)
    console.log("header", decoded);
    // jwtVerify(idToken, new TextEncoder().encode("2Jdgozx0Bjug0wexIbhwa9Liiaq6r5ml6qaKdObxd_P4gYa3Vedg_PjPTVMD8YFZgl5dSN9m5W1WSURJTqiBf1S0mdlbk3zSwxx47fpfpZVUWbQ4fNu5j1OsPiqhwbC3X0w-QgMvaFWJP6ol0Ktm1nEL_xpNpRpYDNfquA5F2XxxulRE2t4lWgfP8myeZ-qhzbG5ukpc7fZKA2idml6kBCAFVKCJk9aOXD_PONsJ8OMAro-vmVQ9Td68DKjTKylou7Wno0YWNL03GZV93y-G2Yv_zJb5Q-JYJ-1-7Ws_6nRJsSKekVvWVdwJCpGX-SZLfJg7qEvZOFPamypJSLRj4w"))
  }
  // if (!idToken) {
  //   request.nextUrl.searchParams.set("from", request.nextUrl.pathname)
  //   request.nextUrl.pathname = "/signin"
  //   return NextResponse.redirect(request.nextUrl)
  // }
  // console.log(initializeApp())
  // const auth = admin.auth()
  // console.log(auth);

  // const decodedIdToken = auth.verifyIdToken(idToken)
  // console.log("decodedIdToken", decodedIdToken);

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  //   matcher: '/api\/((?!signin)|(?!user).*)',
  matcher: "/api/deployments",
}
