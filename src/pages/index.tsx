import { Inter } from "next/font/google";
import Header from "netflix/components/Header";
import Banner from "netflix/components/Banner";
import requests from "../../utils/requests";
import { Movie } from "../../typings";
import Row from "netflix/components/Row";
import useAuth from "../../hooks/useAuth";
import { modalState } from "../../atoms/modalAtom";
import { useRecoilValue } from "recoil";
import Modal from "netflix/components/Modal";
import Plans from "netflix/components/Plans";
import Head from "next/head";
import { Product, getProducts } from "@stripe/firestore-stripe-payments";
import payments from "../../lib/stripe";
import useSubscription from "../../hooks/useSubscription";

const inter = Inter({ subsets: ["latin"] });

interface Props {
  netflixOriginals: Movie[];
  trendingNow: Movie[];
  topRated: Movie[];
  actionMovies: Movie[];
  comedyMovies: Movie[];
  horrorMovies: Movie[];
  romanceMovies: Movie[];
  documentaries: Movie[];
  products: Product[];
}

// const Home = () => {
export default function Home({
  netflixOriginals,
  trendingNow,
  topRated,
  actionMovies,
  comedyMovies,
  horrorMovies,
  romanceMovies,
  documentaries,
  products,
}: Props) {
  console.log(products)
  const { loading, user } = useAuth();
  const showModal = useRecoilValue(modalState);
  const subscription = useSubscription(user);

  if (loading || subscription === null) return null;

  if (!subscription) return <Plans products={products} />;

  return (
    <div
      className={`relative h-screen w-screen bg-gradient-to-b lg:h-[140vh] ${
        showModal && "!h-screen overflow-hidden"
      }`}
    >
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
        <Banner netflixOriginals={netflixOriginals} />
        <section className="md:space-y-24">
          <Row title="Trending Now" movies={trendingNow} />
          <Row title="Top Rated" movies={topRated} />
          <Row title="Action Thrillers" movies={actionMovies} />
          {/* My List component */}
          <Row title="Comedies" movies={comedyMovies} />
          <Row title="Scary Movies" movies={horrorMovies} />
          <Row title="Romance Movies" movies={romanceMovies} />
          <Row title="Documentaries" movies={documentaries} />
        </section>
      </main>
      {showModal && <Modal />}
    </div>
  );
}

// export default Home

export const getServerSideProps = async () => {
  const products = await getProducts(payments, {
    includePrices: true,
    activeOnly: true,
  })
    .then((res) => res)
    .catch((error) => console.log(error.message));

  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
    // when promise.all, it awaits all fetch commands, no need for awaiting every single fetch
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
  ]);

  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
      products,
    },
  };
};
