import React, { useState, useCallback, useRef } from "react";
import produce from "immer";
import { useForm } from "react-hook-form";

// make variable to change these values
const numRows = 30;
const numCols = 40;

const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0]
];


const generateEmptyGrid = () => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => 0));
  }
  return rows;
};

const App = () => {
  const [grid, setGrid] = useState(() => {
    return generateEmptyGrid();
  });

  const [input, setInput] = useState({
    rate: 150,
    color: 'black',
  })

  const { register, handleSubmit } = useForm();
  const onSubmit = data => setInput(data);
  console.log('data', input)

  const [running, setRunning] = useState(false);

  const runningRef = useRef(running);
  runningRef.current = running;

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }

    setGrid(g => {
      return produce(g, gridCopy => {
        for (let i = 0; i < numRows; i++) {
          for (let j = 0; j < numCols; j++) {
            let neighbors = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newJ = j + y;
              // check to see if neighbors are out of bounds
              if (newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols) {
                neighbors += g[newI][newJ];
              }
            });

            // logic for the rules
            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][j] = 0;
            } else if (g[i][j] === 0 && neighbors === 3) {
              gridCopy[i][j] = 1;
            }
          }
        }
      });
    });

    // make time out editable
    setTimeout(runSimulation, Number(input.rate));
  }, [input]);

  return (
    <>
      <button
        onClick={() => {
          setRunning(!running);
          if (!running) {
            runningRef.current = true;
            runSimulation();
          }
        }}
      >
        {running ? "Stop Simulation" : "Start Simulation"}
      </button>

      <button
        onClick={() => {
          setGrid(generateEmptyGrid());
        }}
      >
        clear
      </button>


{/* Resets whole page */}
      <button
        onClick={() => {
          window.location.reload();
        }}
      >
        Reset Page
      </button>
      <br/>
      
{/* Create random feature */}
      <button
        onClick={() => {
          const rows = [];
          for (let i = 0; i < numRows; i++) {
            rows.push(
              Array.from(Array(numCols), () => (Math.random() > 0.75 ? 1 : 0))
            );
          }
          setGrid(rows);
        }}
      >
        Random
      </button>

{/* Create rate edit and Color edit */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Rate in milliseconds: </label>
        <input name="rate" type='number' ref={register} defaultValue={input.rate} /><br/>

        <label>Color: </label>
            <select name="color" ref={register}>
              <option value="black">Black</option>
              <option value="blue">Blue</option>
              <option value="purple">Purple</option>
              <option value="orange">Orange</option>
              <option value="pink">Pink</option>
              <option value="dodgerblue">Dodger Blue</option>
              <option value="red">Red</option>
            </select>
        <input type="submit" />
      </form>


      <br/>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${numCols}, 20px)`
        }}
      >
        {grid.map((rows, i) =>
          rows.map((col, j) => (
            <div
              key={`${i}-${j}`}
            
              onClick={() => {
                // if not running, do not allow
                const newGrid = produce(grid, gridCopy => {
                  gridCopy[i][j] = grid[i][j] ? 0 : 1;
                });
                setGrid(newGrid);
              }}

              style={{
                width: 20,
                height: 20,
                backgroundColor: grid[i][j] ? `${input.color}` : undefined,
                border: "solid 1px black"
              }}
            />
          ))
        )}
      </div>
    </>
  );
};

export default App;