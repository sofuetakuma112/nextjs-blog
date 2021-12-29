// API Routeのコードはクライアントバンドルに含まれないので、
// サーバサイドのコードを安全に書くことができます。

// req は http.IncomingMessage のインスタンスで、
// さらにいくつかの組み込みのミドルウェアが含まれています。
// res は http.ServerResponse のインスタンスと、いくつかのヘルパー関数です。
export default function handler(req, res) {
  res.status(200).json({ text: 'Hello' })
}