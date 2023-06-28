import { BellIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from 'react'
import Link from "next/link";
import useAuth from "../../hooks/useAuth";
import BasicMenu from "./BasicMenu";
import logo from './logo.png'
import icon from './icon.png'
import Image from "next/image";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // runs the handleScroll function
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [])

  return (
    // For the styles of this cloning (in tailwind css), everything responsiveness related, ALL OF THESE starts from organizing through a phone screen instead of PC setting. Basically its mobile responsive FIRST
    <header className={`${isScrolled && 'bg-[#141414]'}`}>
      <div className="flex items-center space-x-2 md:space-x-10">
        <Image
          src={logo}
          alt='maybe'
          width={100}
          height={100}
          className="cursor-pointer object-contain"
        />

        <BasicMenu />

        <ul className="hidden space-x-4 md:flex">
          {" "}
          {/* ul>li*5 emmet shortcut for html sheesh */}
          <li className="headerLink">Home</li>
          <li className="headerLink">TV Shows</li>
          <li className="headerLink">Movies</li>
          <li className="headerLink">New & Popular</li>
          <li className="headerLink">My List</li>
        </ul>
      </div>

      <div className="flex items-center space-x-4 text-sm font-light">
        <MagnifyingGlassIcon className="hidden h-6 w-6 sm:inline" />
        <p className="hidden lg:inline">Kids</p>
        <BellIcon className="h-6 w-6" />
        <Link href="/account">
          <Image
            src={icon}
            alt=""
            className="cursor-pointer rounded"
          />
        </Link>
      </div>
    </header>
  );
}

export default Header;
