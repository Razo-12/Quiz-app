import React, { useRef, useState } from "react";
import './Quiz.css'
import { data } from "../../assets/data";

const Quiz = () => {

    let [index,setIndex] = useState(0);
    let [question,setQuestion] = useState(data[index]);
    let [lock,setLock] = useState(false);
    let [score,setScore] = useState(0);
    let [result,setResult] = useState(false);

    let opcion1 = useRef(null);
    let opcion2 = useRef(null);
    let opcion3 = useRef(null);

    let opcion_array = [opcion1,opcion2,opcion3];


    const checkAns = (e,ans) => {
        if (lock === false) {
            if(question.ans===ans) {
                e.target.classList.add("correct");
                setLock(true);
                setScore(prev=>prev+1);
            }
            else{
                e.target.classList.add("wrong");
                setLock(true);
                opcion_array[question.ans-1].current.classList.add("correct");
            }
        }
        
    }

    const next = () => {
        if (lock===true) {
            if (index === data.length -1) {
                setResult(true);
                return 0;
            }
            setIndex(++index);
            setQuestion(data[index]);
            setLock(false);
            opcion_array.map((opcion)=>{
                opcion.current.classList.remove("wrong");
                opcion.current.classList.remove("correct");
                return null;
            })
        }

    }

    const reiniciar = () => {
        setIndex(0);
        setQuestion(data[0]);
        setScore(0);
        setLock(false);
        setResult(false);
    }

    return (
        <div className='container'>
            <h1>Quiz de Tecnologia</h1>
            <hr />
            {result?<></>:<> 
            <h2>{index+1}. {question.question}</h2>
            <ul>
                <li ref={opcion1} onClick={(e)=>{checkAns(e,1)}}>{question.opcion1}</li>
                <li ref={opcion2} onClick={(e)=>{checkAns(e,2)}}>{question.opcion2}</li>
                <li ref={opcion3} onClick={(e)=>{checkAns(e,3)}}>{question.opcion3}</li>
            </ul>
            <button onClick={next}>Next</button>
            <div className="index">{index+1} of {data.length} questions</div>
            </>}
            {result?<> 
            <h2>Obtuviste {score} out of {data.length}</h2>
            <button onClick={reiniciar}>Reiniciar</button>
            </>:<></>}
            
           
        </div>
    )
}

export default Quiz