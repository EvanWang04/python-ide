import Link from "next/link";
import React from "react";
import Image from "next/image";

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 p-3 text-white">
      <nav className="container mx-auto flex items-center justify-start">
        <Image
          src="/python.png"
          alt="Python Logo"
          width={40}
          height={40}
          className="mr-10"
        />
        <Link href="/run-code">
          <a className="text-xl mr-4 hover:bg-gray-700 p-2 rounded">RUN CODE</a>
        </Link>
        <Link href="/submissions">
          <a className="text-xl hover:bg-gray-700 p-2 rounded">
            SUBMITTED CODE
          </a>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
