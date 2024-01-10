import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs/promises";
import path from "path";

const dataFilePath = path.join(process.cwd(), "/src/pages/api/like.json");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const data = await fs.readFile(dataFilePath, "utf-8");
      res.status(200).json(JSON.parse(data));
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (req.method === "POST") {
    try {
      let { like } = req.body;
      const newLikeCount = parseInt(like);
      await fs.writeFile(
        dataFilePath,
        JSON.stringify({ like: newLikeCount + 1 })
      );

      res
        .status(200)
        .json({ message: "Like Successfully!", like: newLikeCount + 1 });
    } catch (error: any) {
      console.error(error);
      res
        .status(500)
        .json({
          error: "Internal Server Error!",
          msg: error.message,
          stack: error,
        });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
