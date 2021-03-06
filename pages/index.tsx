import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Date from '../components/date';
import Layout, { siteTitle } from '../components/layout';
import { getSortedPostsData, getSortedPostsDataFromFirebase } from '../lib/posts';
import utilStyles from '../styles/utils.module.css';

export const getStaticProps: GetStaticProps = async () => {
	// const allPostsData = getSortedPostsData();
	const allPostsData = await getSortedPostsDataFromFirebase();

	return {
		props: {
			allPostsData
		}
	};
};

type PropsType = {
	allPostsData: {
		id: string;
		title: string;
		date: string;
	}[];
};

export default function Home({ allPostsData }: PropsType) {
	return (
		<Layout home>
			<Head>
				<title>{siteTitle}</title>
			</Head>

			<section className={utilStyles.headingMd}>
				<p>機械学習とWeb開発してます</p>
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
