// Next.jsでは、
// pages/_app.jsからグローバルCSSファイルをインポートして追加することができます。
// それ以外の場所でグローバルCSSをインポートすることはできません。
import '../styles/global.css'

// このAppコンポーネントは、
// すべての異なるページで共通に使用されるトップレベルのコンポーネントです。
// このAppコンポーネントは、
// 例えば、ページ間を移動する際に状態を保持するために使用することができます。
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}