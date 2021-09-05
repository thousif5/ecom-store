import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Header from "../components/Header";

function Cart() {
  const [cart, setCart] = useState([]);
  const [card, setCard] = useState(false);

  const router = useRouter();

  const goHome = () => {
    const newCart = [];
    sessionStorage.setItem("cart", JSON.stringify(newCart));
    setCart(newCart);
    router.push("/");
  };

  const enableCard = () => {
    setCard(!card);
  };

  const addProducts = () => {
    router.push("/");
  };

  const removeCart = (id) => {
    const newCart = [...cart];
    newCart.splice(id, 1);
    sessionStorage.setItem("cart", JSON.stringify(newCart));
    setCart(newCart);
  };

  useEffect(() => {
    var cart = sessionStorage.getItem("cart");
    if (cart) {
      setCart(JSON.parse(cart));
    }
  }, []);

  return (
    <div className="">
      <Header cart={cart} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="top-32 md:pt-40 flex justify-evenly">
          <div className="flex flex-col w-3/5 items-start justify-center">
            {card ? (
              //Add payment card
              <div className="m-2 p-3 w-full rounded-xl overflow-hidden shadow-lg transition duration-75 ease-in-out hover:shadow-xl">
                <div className="px-6 py-4 w-3/4">
                  <h1 className="text-2xl text-blue-500 font-semibold">
                    Add card details
                  </h1>
                  <form className="m-2 py-2">
                    <p className="font-medium mt-4 text-lg">Name: </p>
                    <input
                      type="text"
                      className="w-full text-base text-gray-600 border-b-2 outline-none"
                      placeholder="enter name on card...."
                    ></input>
                    <p className="font-medium mt-4 text-lg">Card number: </p>
                    <input
                      type="text"
                      className="w-full text-base text-gray-600 border-b-2 outline-none"
                      placeholder="card number...."
                    ></input>
                    <p className="font-medium mt-4 text-lg">Exp Date: </p>
                    <input
                      type="text"
                      className="w-full text-base text-gray-600 border-b-2 outline-none"
                      placeholder=""
                    ></input>
                    <p className="font-medium mt-4 text-lg">CVV: </p>
                    <input
                      type="text"
                      className="w-full text-base text-gray-600 border-b-2 outline-none"
                      placeholder=""
                    ></input>
                  </form>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white text-base w-1/2 py-1 px-2 m-1 rounded"
                    onClick={goHome}
                  >
                    Make Payment
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}
            {cart.length !== 0 ? (
              cart.map((item, id) => (
                <div
                  key={id}
                  className="m-2 p-3 w-full flex justify-start rounded-xl shadow-lg hover:shadow-xl hover:bg-gray-50 transition duration-75 ease-in-out"
                >
                  <div className="w-1/3">
                    <Image
                      className="object-contain"
                      src={item.image}
                      alt="product-image"
                      width={200}
                      height={200}
                    />
                  </div>
                  <div className="w-2/3 flex flex-col justify-center">
                    <p className="font-medium">{item.title}</p>
                    {/* <p className="font-normal">{item.description}</p> */}
                    <p className="font-medium">
                      Price: <span className="font-normal">${item.price}</span>
                    </p>
                    <p className="font-medium">
                      Rating:{" "}
                      <span className="font-normal">{item.rating.rate}</span>
                    </p>
                    <div className="flex justify-between items-center py-2">
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white text-base py-1 px-2 m-1 rounded"
                        onClick={() => removeCart(id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="m-4 p-4 w-full flex flex-col items-center justify-center">
                <h1 className="text-2xl">Cart is empty</h1>
                <div className="flex justify-between items-center py-2">
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white text-base py-1 px-2 m-1 rounded"
                    onClick={addProducts}
                  >
                    Add Products
                  </button>
                </div>
              </div>
            )}
          </div>
          {cart.length !== 0 ? (
            <div className="w-1/5 ml-4">
              <div className="py-3 pl-3 mb-3 w-full text-left justify-start border rounded-xl border-gray-200 ">
                <h1 className="font-medium">
                  Items: <span className="font-normal">{cart.length}</span>
                </h1>
                <h1 className="font-medium">
                  Total Price:{" "}
                  <span className="font-normal">
                    $
                    {cart.length !== 0
                      ? cart
                          .reduce((acc, item) => {
                            acc += item.price;
                            return acc;
                          }, 0)
                          .toFixed(2)
                      : 0}
                  </span>
                </h1>
              </div>
              {card ? (
                <button
                  className="bg-red-500 hover:bg-red-700 text-white text-base  w-full py-1 px-2 m-1 rounded"
                  onClick={enableCard}
                >
                  Cancel
                </button>
              ) : (
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white text-base  w-full py-1 px-2 m-1 rounded"
                  onClick={enableCard}
                >
                  Pay now
                </button>
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
