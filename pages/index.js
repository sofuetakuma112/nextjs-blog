import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import Date from "../components/date";

// getStaticPropsはサーバーサイドでのみ動作する。
// クライアントサイドでは決して実行されません。
// ブラウザのJSバンドルに含まれることもありません。
// つまり、データベースに直接問い合わせるようなコードを、
// ブラウザに送られることなく書くことができるのです。
export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  // getStaticPropsのpropsオブジェクトの中にallPostsDataを返すことで、
  // ブログの投稿がpropとしてHomeコンポーネントに渡されることになります。
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          愛媛大学工学部電気電子工学科4回生
          大学で深層学習を利用した伝送線路の断線予測について研究しています
        </p>
        <p>
          (This is a sample website - you’ll be building a site like this on{" "}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
