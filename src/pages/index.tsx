import { Inter } from "next/font/google";
import Header from "netflix/components/Header";
import Banner from "netflix/components/Banner";
import requests from "../../utils/requests";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div
      // className="relative h-[140vh]"
      className="relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh]"
    >
    <Header />
      <main>
        <Banner />
        <section>
          {/* bunch of rows */}
          {/* bunch of rows */}
          {/* bunch of rows */}
        </section>
      </main>
      {/* modal */}
    </div>
  );
}

export const getServerSideProps = async () => {
  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([ //when promise.all, it awaits all fetch commands, no need for awaiting every single fetch
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
  ]) 

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
    },
  };
}