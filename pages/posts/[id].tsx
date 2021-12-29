import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import { GetStaticProps, GetStaticPaths } from 'next'

export default function Post({
  postData
}: {
  postData: {
    title: string
    date: string
    contentHtml: string
  }
}) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}

// この関数では、id に指定できる値のリストを返す必要があります。
// pathsキーは、どのパスがプリレンダリングされるかを決定します。
// 各paramsの値は、ページ名で使われているパラメータと一致している必要があります。
// ページ名がpages/posts/[postId]/[commentId]であれば、
// paramsにはpostIdとcommentIdを指定する必要があります。
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

// 与えられたidを持つブログ記事に必要なデータを取得します。
// データありの静的生成に必要
// 引数には、getStaticPathsのpathsオブジェクトが渡される？
export const getStaticProps: GetStaticProps = async ({ params }) => {
  // params変数に { id: ... } が入ってくる
  const postData = await getPostData(params.id as string)
  return {
    props: {
      postData
    }
  }
}
