import { NextApiRequest, NextApiResponse } from "next"

import { getDocsByField } from "@/utils/Api_SeverSideCon"

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  const { email } = _req.query

  if (_req.method === "GET" && email) {
    if (!email) {
      return res.status(400).json({ message: "Please provide valid email" })
    }

    try {
      const user = await getDocsByField("users", "email", email as string)
      console.log("user response from firestore", user)
    } catch (error: any) {
      console.log("error happened during user permission check",error)

      return res.status(500).json({
        result: error,
      })
    }
  }
}

export default handler
