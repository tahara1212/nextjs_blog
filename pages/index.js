import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import Link from "next/link";
import Layout, { siteTitle } from '../components/Layout';

import utilStyle from "../styles/utils.module.css";
// import postsDirectory from "../lib/post";
import { getPostsData, getPostIds } from '../lib/post';

// SSGの場合
// 外部からビルド時に一度だけデータを持ってくる関数
export async function getStaticProps() {
  const allPostsData = getPostsData();
  const allPostIds = getPostIds();

  // コンポーネントにデータを渡す
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
      <section className={utilStyle.headingMd}>
        <h2>test</h2>
      </section>
      <section className={`${utilStyle.headingMd} ${utilStyle.padding1px}`}>
        <h2>🗒エンジニアのぶろぐ</h2>
        <div className={styles.grid}>
          {allPostsData.map(({id, title, date, thumbnail}) => (
            <article key={id}>
              <Link href={`/posts/${id}`}>
                <img src={thumbnail}
                  className={styles.thumbnailImage}
                />
              </Link>
              <Link href={`/posts/${id}`}>
                <a className={utilStyle.boldText}>{title}</a>
              </Link>
              <br />
              <small className={utilStyle.lightText}>
                {date}
              </small>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  )
}
