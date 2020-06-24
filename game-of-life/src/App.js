import React, { useState, userCallback, useRef } from 'react';
import produce from 'immer';
// import { set } from 'immer/dist/internal';

const numRows = 50;
const numCols = 50;

function App() {
  const [grid, setGrid] = useState(() => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => 0))
    }
    return rows;
  });
  // console.log(grid);

  const [running, setRunning] = useState(false);

  const runningRef = useRef();
  runningRef.current = running

  const runSimulation = userCallback(() => {
    if (!runningRef.current) {
      return;
    }
    //simulate the update, call in miliseconds
    setTimeout(runSimulation, 1000);
  }, [])

  return (
    <>
        <button 
          onClick={() => {
            setRunning(!running);
          }}
          >
            {running ? 'Stop' : 'Start!'}
          </button>
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${numCols}, 20px)`
        }}>
          {grid.map((rows, i) => 
            rows.map((col, k) => <div
              key={`${i}-${k}`}
              onClick={() => {
                const newGrid = produce(grid, gridCopy => {
                  gridCopy[i][k] = grid[i][k] ? 0 : 1;
                })
                setGrid(newGrid);
              }}
              style={{ 
                width: 20,
                height: 20,
                backgroundColor: grid[i][k] ? 'blue' : undefined,
                border: 'solid 1px black'
                }}/>))}
        </div>
    </>
  );
}

export default App;
