import React, { useEffect, useState } from "react";
import Chessboard from "../components/Chessboard";
import { useSocket } from "../hooks/useSocket";
import { Chess } from "chess.js";
import { useUser } from "../hooks/useUser";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Modal from "../components/Modal";
import ResultModal from "../components/ResultModal";

export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over";
export const JOIN_GAME = "join_game";
export const OPPONENT_DISCONNECTED = "opponent_disconnected";
export const JOIN_ROOM = "join_room";
export const GAME_NOT_FOUND = "game_not_found";
export const GAME_JOINED = "game_joined";
export const GAME_ENDED = "game_ended";
export const GAME_ALERT = "game_alert";
export const GAME_ADDED = "game_added";
export const GAME_TIME = "game_time";

function Game() {
  const socket = useSocket();
  const [chess, setChess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());
  const [started, setStarted] = useState(false);
  const [playersData, setPlayersData] = useState(null);
  const [playerColor, setPlayerColor] = useState("w"); // Default to white
  const [alertMessage, setAlertMessage] = useState(null);
  const [result, setResult] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [waitingForOpponent, setWaitingForOpponent] = useState(false)
  const [opponentDisconnected, setOpponentDisconnected] = useState(false);
  const [showNewGame, setShowNewGame] = useState(false);
  const navigate = useNavigate();
  const { user, loading, error } = useUser();

  const handleClose = () => {
    setAlertMessage(null);
    if (opponentDisconnected) {
      // setStarted(false);
      chess.reset();
      setOpponentDisconnected(false);
    }
  };

  const handleNewGame = () => {
    setShowResult(false)
    setShowNewGame(false)
    setBoard(chess.board())
    setStarted(false)
    setWaitingForOpponent(true)
    socket.send(
      JSON.stringify({
        type: INIT_GAME,
      })
    );
  };

  const closeResult = () => {
    setShowResult(false)
  }

  useEffect(() => {
    if (loading) {
      // Still loading
      return;
    }

    if (!user || error) {
      navigate("/login");
    }
  }, [loading]);

  useEffect(() => {
    if (!socket) return;

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      switch (message.type) {
        case INIT_GAME:
          console.log("game initialized");
          setBoard(chess.board());
          setStarted(true);
          setWaitingForOpponent(false)
          setPlayerColor(message.payload.color);
          setPlayersData({
            blackPlayer: message.payload.blackPlayer,
            whitePlayer: message.payload.whitePlayer,
          });
          break;
        case MOVE:
          const move = message.payload;
          chess.move(move);
          setBoard(chess.board());
          console.log("move made");
          break;
        case GAME_ALERT:
          setAlertMessage(message.payload);
          break;
        case GAME_ENDED:
          let wonBy;
          switch (message.payload.status) {
            case "COMPLETED":
              wonBy = message.payload.result !== "DRAW" ? "CheckMate" : "";
              break;
            case "OPPONENT_DISCONNECTED":
              wonBy = "Opponent Disconnected";
              break;
            default:
              wonBy = "Timeout";
          }
          setResult({
            result: message.payload.result,
            by: wonBy,
          });
          chess.reset();
          setShowResult(true)
          setShowNewGame(true)
          break;
      }
    };
  }, [socket]);

  if (!socket) return <div>Connecting...</div>;

  return (
    <>
      <Navbar />
      <div className="pt-10 px-5 lg:grid lg:grid-cols-3">
        <div className="col-span-2">
          {started && (
            <p
              className={`max-w-[500px] text-white md:max-w-[500px] lg:max-w-[600px] m-auto grid`}
            >
              {user.id === playersData?.whitePlayer?.id
                ? playersData?.blackPlayer?.name
                : playersData?.whitePlayer?.name ?? ""}
            </p>
          )}
          <Chessboard
            setBoard={setBoard}
            chess={chess}
            board={board}
            socket={socket}
            started={started}
            playerColor={playerColor}
          />
          {started && (
            <p
              className={`max-w-[500px] text-white md:max-w-[500px] lg:max-w-[600px] m-auto grid`}
            >
              {user.id === playersData?.blackPlayer?.id
                ? playersData?.blackPlayer?.name
                : playersData?.whitePlayer?.name ?? ""}
            </p>
          )}
        </div>
        <div className=" px-10 lg:px-5 py-5 lg:mt-0 mt-8 bg-[#262522] rounded-lg ">
          {!started && (
            <button
              className={` disabled:bg-[#373735]  bg-[#81b64c] w-full hover:bg-[#a4e069]  px-10 py-3 md:py-4 rounded-xl text-2xl lg:text-3xl text-white font-semibold`}
              onClick={() => {
                socket.send(
                  JSON.stringify({
                    type: INIT_GAME,
                  })
                );
                setWaitingForOpponent(true)
              }}
              disabled={waitingForOpponent}
            >
              {waitingForOpponent? "Waiting..." : "Play"}
            </button>
          )}
          {showNewGame && (<button
              onClick={handleNewGame}
              className="bg-[#373735] hover:bg-[#4C4B48] text-white/70 hover:text-white  w-full px-10 py-3 md:py-4 rounded-xl text-2xl lg:text-3xl font-semibold"
            >
              New Game
            </button>)}
        </div>
      </div>
      {alertMessage && <Modal message={alertMessage} onClose={handleClose} />}
      {showResult && <ResultModal result={result} onNewGame={handleNewGame} onClose={closeResult}/>}
    </>
  );
}

export default Game;
