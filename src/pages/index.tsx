import { Inter } from "next/font/google";
import Header from "netflix/components/Header";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div
      className="relative h-[140vh]"
      // className="relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh]"
    >
    <Header />
      <main>
        {/* Banner */}
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
