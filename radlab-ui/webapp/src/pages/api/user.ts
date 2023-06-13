import { NextApiRequest, NextApiResponse } from "next"

import { getDocsByField } from "@/utils/Api_SeverSideCon"

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  const { email } = _req.query

  if (_req.method === "GET" && email) {
    if (!email) {
      return res.status(400).json({ message: "Please provide valid email" })
    }

    try {
      const users = await getDocsByField("users", "email", email as string)

      if (users.length != 0) {
        console.log("user response from firestore", users)
        const is_admin = users[0].role == "admin"
        return res.status(200).json({ isAdmin: is_admin })
      } else {
        return res
          .status(400)
          .json({ message: "Provided email does not have access" })
      }
    } catch (error: any) {
      console.log("error happened during user permission check", error)

      return res.status(500).json({
        result: error,
      })
    }
  }
}

export default handler
