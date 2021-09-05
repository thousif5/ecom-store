import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Header from "../components/Header";

export default function Home() {
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);

  const router = useRouter();

  var addToCart = (item) => {
    var cart = sessionStorage.getItem("cart");
    cart = cart ? JSON.parse(cart) : [];
    cart.push(item);
    setCart(cart);
    sessionStorage.setItem("cart", JSON.stringify(cart));
  };

  var buyProduct = (item) => {
    addToCart(item);
    router.push("/cart");
  };
  useEffect(() => {
    fetch("https://fakestoreapi.com/products?limit=10")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div className="">
      <Header cart={cart} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="top-32 md:pt-40">
          <div className="flex flex-wrap items-center justify-evenly">
            {data.map((item, id) => (
              <div
                key={id}
                className="m-2 p-3 w-1/4 break-words rounded-xl shadow-lg hover:shadow-xl hover:bg-gray-50 transition duration-75 ease-in-out"
              >
                <div className="w-full flex justify-center">
                  <Image
                    className="object-contain"
                    src={item.image}
                    alt="product-image"
                    width={200}
                    height={200}
                  />
                </div>
                <p className="font-medium truncate">{item.title}</p>
                <p className="font-medium">
                  Price: <span className="font-normal">${item.price}</span>
                  &nbsp;&nbsp; Rating:{" "}
                  <span className="font-normal">{item.rating.rate}</span>
                </p>
                <div className="flex justify-between items-center py-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white text-base py-1 px-2 m-1 rounded"
                    onClick={() => addToCart(item)}
                  >
                    Add to cart
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white text-base py-1 px-2 m-1 rounded"
                    onClick={() => buyProduct(item)}
                  >
                    Buy now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
