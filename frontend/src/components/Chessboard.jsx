import React, { useState } from "react";
import { MOVE } from "../pages/Game";

// square: Square;
// type: PieceSymbol; 
// color: Color;

function Chessboard({ board, socket, setBoard, chess, playerColor }) {
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState();

  // return (
  //   <div className="max-w-[350px] h-[350px] md:max-w-[500px] md:h-[500px] lg:max-w-[600px] lg:h-[600px] m-auto  grid grid-rows-8">
  //     {board.map((row, i) => {
  //       return (
  //         <div key={i} className=" grid grid-cols-8 ">
  //           {row.map((square, j) => {
  //             const squarePosition = `${String.fromCharCode(97 + j)}${8 - i}`;
  //             return (
  //               <div
  //                 className={` ${
  //                   (i + j) % 2 === 0 ? "bg-[#ECD5AF]" : "bg-[#B88762]"
  //                 }`}
  //                 key={j}
  //                 onClick={() => {
  //                   if (!from) {
  //                     setFrom(squarePosition);
  //                   } else {
  //                     socket.send(
  //                       JSON.stringify({
  //                         type: MOVE,
  //                         payload: {
  //                           from,
  //                           to: squarePosition,
  //                         },
  //                       })
  //                     );
  //                     setFrom(null);
  //                     chess.move({
  //                       from,
  //                       to: squarePosition,
  //                     });
  //                     setBoard(chess.board());
  //                   }
  //                 }}
  //               >
  //                 {square ? (<img src={`/${square?.color === 'b' ? `b${square.type}` : `w${square.type}`}.png`} />) : null}
  //               </div>
  //             );
  //           })}
  //         </div>
  //       );
  //     })}
  //   </div>
  // );

  const handleSquareClick = (squarePosition) => {
    if(chess.turn() !== playerColor){
      return
  }
    if (!from) {
      setFrom(squarePosition);
    } else {
      const move = { from, to: squarePosition };
      
      try{
      const legalMove = chess.move(move);
      if (legalMove) {
        socket.send(
          JSON.stringify({
            type: MOVE,
            payload: move,
          })
        );
        setBoard(chess.board());
        setFrom(null)
      }} catch(err){
        console.log(err);
        setFrom(null);
      }
    }
  };

  const renderBoard = () => {
    const renderedBoard = playerColor === "b" ? [...board].reverse() : board;
    return renderedBoard.map((row, i) => {
      const renderedRow = playerColor === "b" ? [...row].reverse() : row;
      return (
        <div key={i} className="grid grid-cols-8">
          {renderedRow.map((square, j) => {
            const rowIndex = playerColor === "b" ? 7 - i : i;
            const colIndex = playerColor === "b" ? 7 - j : j;
            const squarePosition = `${String.fromCharCode(97 + colIndex)}${
              8 - rowIndex
            }`;
            // const squarePosition = `${String.fromCharCode(97 + j)}${8 - i}`;
            const isSelected = squarePosition === from;
            return (
              <div
                className={`${
                  (i + j) % 2 === 0 ? "bg-[#ECD5AF]" : "bg-[#B88762]"
                } ${isSelected ? "border-4 border-blue-500" : ""}`}
                key={j}
                onClick={() => handleSquareClick(squarePosition)}
              >
                {square ? (
                  <img
                    src={`/${
                      square.color === "b"
                        ? `b${square.type}`
                        : `w${square.type}`
                    }.png`}
                    alt={`${square.color} ${square.type}`}
                    className="w-full h-full"
                  />
                ) : null}
              </div>
            );
          })}
        </div>
      );
    });
  };

  return (
    <div
      className={`max-w-[350px] h-[350px] md:max-w-[500px] md:h-[500px] lg:max-w-[600px] lg:h-[600px] m-auto grid grid-rows-8 `}
    >
      {renderBoard()}
    </div>
  );
}

export default Chessboard;
