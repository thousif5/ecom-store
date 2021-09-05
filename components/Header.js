import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import cartIcon from "../public/cart-icon.png";

export default function Header({ cart }) {
  const [top, setTop] = useState(true);

  useEffect(() => {
    const scrollHandler = () => {
      window.pageYOffset > 10 ? setTop(false) : setTop(true);
    };
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);

  console.log(cart);

  return (
    <div
      className={`fixed w-full bg-gray-50 z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${
        !top && "bg-white blur shadow-lg"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center">
          <Link href="/" passHref>
            <a>
              <h1 className="text-4xl cursor-pointer">Store.com</h1>
            </a>
          </Link>
          <div className="w-20 rounded-lg px-5 py-3 my-4 bg-gray-50 overflow-auto hover:bg-gray-300 flex items-center cursor-pointer transition duration-300 ease-in-out ">
            <Link href="/cart" passHref>
              <a>
                <Image className="w-full" src={cartIcon} alt="cart" />
              </a>
            </Link>
            <span className="">{cart && cart.length ? cart.length : ""}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
