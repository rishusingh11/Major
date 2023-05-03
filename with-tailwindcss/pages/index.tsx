import Banner from "@/components/Banner";
import Header from "@/components/Header";
import requests from "@/utils/requests";
import Head from 'next/head';
import { Movie } from "@/typings";
import Row from "@/components/Row";

interface Props {
  netflixOriginals: Movie[]
  trendingNow: Movie[]
  TopRated: Movie[]
  actionMovies: Movie[]
  comedyMovies: Movie[]
  horrorMovies: Movie[]
  romanceMovies: Movie[]
  documentries: Movie[]
}
const Home = ({ 
  netflixOriginals,
  trendingNow,
  TopRated,
  actionMovies,
  comedyMovies,
  horrorMovies,
  romanceMovies,
  documentries,
  }: Props) => {
  return (
    <div className="relative h-screen bg-gradient-to-b lg:h-[140vh]">
        <Head>
          <title>Home - Netflix</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Header />
        <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
          <Banner netflixOriginals={netflixOriginals}/>
          <section className="md:space-y-24">
            <Row title="Trending Now" movies={comedyMovies}/>
            <Row title="Top Rated" movies={TopRated}/>
            <Row title="Action Thrillers" movies={actionMovies}/>
            <Row title="Comedies" movies={comedyMovies}/>
            <Row title="Scary Movies" movies={horrorMovies} />
            <Row title="Romance Movies" movies={romanceMovies} />
            <Row title="Documentries" movies={documentries} />
          </section>
        </main>
    </div>
  )
}

export default Home

export const getServerSideProps = async () => {
  const [
    netflixOriginals,
    trendingNow,
    TopRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentries,
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentries).then((res) => res.json()),
  ])

  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      TopRated: TopRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentries: documentries.results,
    },
  }
}