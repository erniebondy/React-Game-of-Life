import { useState } from "react";

function Cell() {

    const [traits, setTraits] = useState({state: 0, color: "black", size: 40});

    function clickHandler() {
        if (traits.state === 0) {
            setTraits((prev) => {
                return {...prev, state: 1, color: "red"};
            });
        } else {
            setTraits((prev) => {
                return {...prev, state: 0, color: "black"};
            });
        }
    }
    
    return (
        <div style={{
            position: "relative",
            backgroundColor: traits.color,
            border: "1px white solid",
            width: `${traits.size}px`,
            height: `${traits.size}px`
        }} onClick={clickHandler} traits={traits}>

        </div>
    );
}

export default Cell;