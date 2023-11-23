import Head from 'next/head'
import { Inter } from '@next/font/google'
import { getPosts } from '../services'
import { PostCard, PostWidget, Categories } from '../components'


const inter = Inter({ subsets: ['latin'] })

export default function Home( { posts } ) {
  return (
    <div className='container mx-auto px-10 mb8'>
      <Head>
        <title>Next & Hygraph</title>
        <meta name="description" content="Next & Hygraph adventure" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
        <div className="lg:col-span-8 col-span-1 ">
          {
            posts.slice(0).reverse().map((post)=>(
              <PostCard post={ post.node } key={ post.node.title }/>
            ))
          }
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky realtive">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </main>
    </div>
  )
}

export const getStaticProps = async () => {
  const posts = await getPosts() || [];

  return {
    props: {
      posts
    }
  }
}