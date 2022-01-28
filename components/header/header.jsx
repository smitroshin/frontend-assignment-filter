import React from 'react';
import Image from 'next/image';
import headerCover from '../../public/images/miista-header-cover.jpg';
import logo from '../../public/images/logo.svg';

export function Header(props) {
  return (
    <header
      {...props}
      className="relative container mx-auto px-4"
      style={{ height: 553 }}
    >
      <div className="absolute w-full h-full top-0 left-0 -z-10">
        <Image
          src={headerCover}
          alt="Miista header cover"
          layout="fill"
          objectFit="cover"
          objectPosition="top"
          quality={100}
        />
      </div>
      <nav className="flex justify-between items-center text-white text-lg px-4 py-6 z-10 uppercase">
        <div>
          <Image src={logo} alt="Site Logo" quality={100} />
        </div>
        <div className="flex flex-wrap">
          <span className="mx-5 hover:opacity-80 hover:cursor-pointer">
            SHOP
          </span>
          <span className="mx-5 hover:opacity-80 hover:cursor-pointer">
            E8 by MIISTA
          </span>
          <span className="mx-5 hover:opacity-80 hover:cursor-pointer">
            STORES
          </span>
          <span className="mx-5 hover:opacity-80 hover:cursor-pointer">
            ABOUT
          </span>
          <span className="mx-5 hover:opacity-80 hover:cursor-pointer">
            Journal
          </span>
        </div>
        <div className="flex">
          <span className="mx-5 hover:opacity-80 hover:cursor-pointer">EN</span>
          <span className="mx-5 hover:opacity-80 hover:cursor-pointer">
            account
          </span>
          <span className="mx-5 hover:opacity-80 hover:cursor-pointer">
            assistance
          </span>
        </div>
      </nav>
    </header>
  );
}
