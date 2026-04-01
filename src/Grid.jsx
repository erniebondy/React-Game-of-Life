import { useRef, useState, useEffect } from "react";

const GridSize = 50;
const CellSize = 10;
const initGrid = new Array(GridSize*GridSize).fill(0);

function Grid() {

    const [rows, setRows] = useState(GridSize);
    const [cols, setCols] = useState(GridSize);
    const [cells, setCells] = useState(initGrid);
    const intervalID = useRef(null);

    useEffect(() => {
        return () => clearInterval(intervalID.current);
    }, []);

    function clickHandler(idx) {
        setCells((prev) => {
            const next = [...prev];
            next[idx] = (next[idx]) ? 0 : 1;
            return next;
        });
    }
    
    return (
        <>
            <button onClick={reset}>Reset</button>
            <button onClick={next}>Next</button>
            <button onClick={play}>Play</button>
            <button onClick={stop}>Stop</button>
            <div style={{
                display: "grid",
                gridTemplateRows: `${CellSize}px `.repeat(GridSize),
                gridTemplateColumns: `${CellSize}px `.repeat(GridSize)}
            }>
                {cells.map((value, idx) => {
                    return (
                        <div key={idx} style={{
                            position: "relative", 
                            backgroundColor: (value) ? "red" : "black", 
                            border: "0px solid white"}}
                        onClick={() => clickHandler(idx)}></div>
                    );
                })}
            </div>
        </>
    );

    function play() {
        if (intervalID.current)
            return;
        intervalID.current = setInterval(() => next(), 100);
    }

    function stop() {
        clearInterval(intervalID.current);
        intervalID.current = null;
    }

    function countNeighbors(cells, row, col) {
        let count = 0;
        for (let dr = -1; dr < 2; ++dr) {
            for (let dc = -1; dc < 2; ++dc) {
                if (dr === 0 && dc === 0)
                    continue;

                let nr = row + dr;
                if (nr < 0)
                    nr = rows - 1;
                else if (nr > rows - 1)
                    nr = 0;

                let nc = col + dc;
                if (nc < 0)
                    nc = cols - 1;
                else if (nc > cols - 1)
                    nc = 0;

                const idx = nr * GridSize + nc;
                count += cells[idx];
            }
        }

        return count;
    }

    function next() {
        setCells((prev) => {
            const nextGrid = [];
            for (let row = 0; row < rows; ++row) {
                for (let col = 0; col < cols; ++col) {
                    const idx = row * GridSize + col;
                    const nbrs = countNeighbors(prev, row, col);
                    let cell = prev[idx];

                    if (cell === 1) {
                        if (nbrs < 2 || nbrs > 3)
                            cell = 0;
                    } else {
                        if (nbrs === 3)
                            cell = 1;
                    }
                    nextGrid.push(cell);
                }
            }

            return nextGrid;
        });
    }

    function reset() {
        setCells(initGrid);
    }

}

export default Grid;