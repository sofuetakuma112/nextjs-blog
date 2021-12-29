// API Routeのコードはクライアントバンドルに含まれないので、
// サーバサイドのコードを安全に書くことができます。

import { NextApiRequest, NextApiResponse } from "next";

// req は http.IncomingMessage のインスタンスで、
// さらにいくつかの組み込みのミドルウェアが含まれています。
// res は http.ServerResponse のインスタンスと、いくつかのヘルパー関数です。
export default (_: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ text: "Hello" });
};
