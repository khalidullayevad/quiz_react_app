import React, {useState} from "react"
import '../css/flashcard.css'

export default function  FlashCard({frontSide, backSide}) {
    const [isFront, changeFace] = useState(true);
    function handleClick() {
        changeFace(oldState => ! oldState);
        
    }
    const text = isFront ? "Question: "+frontSide : "Answer:  " +backSide ;
    const sideClass = isFront? "front": "back";
    const classList =`flash-card ${sideClass}`;
    return(
        <div className={classList} onClick={handleClick}>{text} </div>
    );
    
}