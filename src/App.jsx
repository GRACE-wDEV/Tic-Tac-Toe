import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useState } from "react";

function Square({ value, onSquareClick }){
  return(
    <button className="square" onClick={onSquareClick}>{value}</button>
  )
}

function Board({xIsNext, squares, onPlay}){
  const winner = calculateWinner(squares);
  const isDraw = squares.every(square => square !== null);
  let status;
  if(winner)
  {
    status = "Winner: " + winner;
  }else if(isDraw){
    status = "Draw!";
  }else
  {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }
  function handleClick(i){
    if(squares[i] || winner) return;
    const nextSquares = squares.slice();
    if(xIsNext)
    {
      nextSquares[i]="X";
    }else{
      nextSquares[i]="O";
    }
    onPlay(nextSquares);
  }
  return(
    <>
      <div className="status">{status}</div>
      <div className="grid grid-cols-3">
        {squares.map((value, i) => (
          <Square value={value} key={i} onSquareClick={() => handleClick(i)} />
        ))}
      </div>
    </>
  )
}

export default function Game(){
  useGSAP(()=>{
    const tl = gsap.timeline({});
    const titleSplit = new SplitText('.title', { type: "chars" });
    tl.from(titleSplit.chars, {
      yPercent: 70,
      duration: 0.4,
      stagger: 0.06,
      ease: 'power1.out'
    });
    tl.from('.restart',{
      y: -10,
      opacity: 0,
      duration: 0.4,
      ease: 'power2.out'
    });
    tl.from('.game',{
      y: -10,
      opacity: 0,
      duration: 0.4,
      ease: 'power2.out'
    });
  })
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  function handlePlay(nextSquares){
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(currentMove + 1);
    setXIsNext(!xIsNext);
  }
  const currentSquares = history[currentMove];
  function jumpTo(nextMove)
  {
    setCurrentMove(nextMove);
    setXIsNext(nextMove % 2 === 0);
  }
  const moves = history.map((squares, move)=>{
    let description;
    if(move>0){
      description = `Go to move #${move}`;
    }else{
      description = `Go to game start`;
    }
    return (
      <li key={move} >
        <button className="bg-transparent border px-2 md:px-4 mt-1 py-2 border-gray-700 rounded-sm hover:scale-103 hover:bg-[#0005] transition duration-300 cursor-pointer" 
        onClick={()=>{jumpTo(move)}}>{description}</button>
      </li>
    )
  })
  return (
    <div className="h-screen w-dvw overflow-hidden">
      <div className="container flex flex-col items-center mx-auto">
        <h1 className="title text-4xl font-bold mt-8">Tic Tac Toe</h1>
        <div className="restart">
          <button className="bg-transparen mt-10 md:mt-30 border text-2xl font-bold px-2 md:px-10 py-2 border-gray-700 rounded-sm hover:scale-103 hover:bg-[#0005] transition duration-300 cursor-pointer"
          onClick={()=>{
            jumpTo(0);
            setHistory([Array(9).fill(null)]);
            setCurrentMove(0);
            setXIsNext(true);
          }}>Restart</button>
        </div>
        <div className="game flex flex-col md:flex-row mt-10 gap-4 md:gap-6">
          <div className="game-board -mt-5 md:-mt-0">
            <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
          </div>
          <div className="game-info md:pt-7">
            <ol className="grid md:block grid-cols-2 -mt-2 md:mt-0">{moves}</ol>
          </div>
        </div>
      </div>
    </div>
  )
}

function calculateWinner(squares){
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for(let i=0; i<lines.length; ++i)
  {
    const [a, b, c] = lines[i];
    if(squares[a] && squares[a]===squares[b] && squares[a]===squares[c]){
      highlightWinningLine([a, b, c]);
      return squares[a];
    }
  }
  return null;
}
function highlightWinningLine(line){
  line.forEach(index => {
    const square = document.getElementsByClassName("square")[index];
    if(square){
      useGSAP(()=>{
        gsap.to(square, {
          color: "black",
          scale: 1.1,
          ease: 'bounce.out',
          duration: 0.3,
          textShadow: "0 0 10px #90ee90",
          yoyo: true,
          repeat: 1
        });
      })
    }
  });
}