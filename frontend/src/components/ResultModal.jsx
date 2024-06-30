import React from "react";

function ResultModal({ result, onNewGame }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-[#262421] p-5 rounded-lg shadow-lg max-w-sm w-full">
        <div className="flex flex-col justify-between items-center mb-4">
          <p className="text-2xl lg:text-3xl text-white font-bold text-center">
            {result.result}
          </p>
          <p className="text-center text-white/70">{result.by}</p>
        </div>
        <div className="mt-4 flex justify-end">
          <button onClick={onNewGame} className="bg-[#81b64c] w-full hover:bg-[#a4e069] text-white px-4 py-2 rounded-lg">
            New Game
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResultModal;
