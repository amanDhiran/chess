import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
  const navigate = useNavigate();
  return (
    <>
    <Navbar />
      <div className="pt-10">
        <div className="flex flex-col md:flex-row items-center justify-center md:items-start gap-11 md:gap-5 lg:gap-28">
          <div className=" rounded-md overflow-hidden md:block">
            <img
              className="w-[300px] md:w-[500px] h-auto aspect-square"
              src="/board.png"
              alt=""
            />
          </div>
          <div className="flex flex-col  gap-8">
            <h3 className="text-white text-center text-2xl md:text-4xl font-bold">
              Welcome to the world of Chess!
            </h3>
            <div className="flex justify-center">
              <button
                className="px-20 rounded-md py-3 md:py-5 text-white font-semibold md:font-bold text-lg md:text-2xl bg-[#81b64c] hover:bg-[#a4e069]"
                onClick={() => {
                  navigate("/game");
                }}
              >
                Play Online
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
