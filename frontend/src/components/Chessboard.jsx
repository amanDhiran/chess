import React, { useState } from "react";
import { MOVE } from "../pages/Game";

// square: Square;
// type: PieceSymbol;
// color: Color;

function Chessboard({ board, socket, setBoard, chess }) {
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState();

  return (
    <div className="max-w-[350px] h-[350px] md:max-w-[500px] md:h-[500px] lg:max-w-[600px] lg:h-[600px] m-auto  grid grid-rows-8">
      {board.map((row, i) => {
        return (
          <div key={i} className=" grid grid-cols-8 ">
            {row.map((square, j) => {
              const squarePosition = `${String.fromCharCode(97 + j)}${8 - i}`;
              return (
                <div
                  className={` ${
                    (i + j) % 2 === 0 ? "bg-[#ECD5AF]" : "bg-[#B88762]"
                  }`}
                  key={j}
                  onClick={() => {
                    if (!from) {
                      setFrom(squarePosition);
                    } else {
                      socket.send(
                        JSON.stringify({
                          type: MOVE,
                          payload: {
                            from,
                            to: squarePosition,
                          },
                        })
                      );
                      setFrom(null);
                      chess.move({
                        from,
                        to: squarePosition,
                      });
                      setBoard(chess.board());
                    }
                  }}
                >
                  {square ? (<img src={`/${square?.color === 'b' ? `b${square.type}` : `w${square.type}`}.png`} />) : null}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default Chessboard;
