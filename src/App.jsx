

import './styles.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Card = () => {
  const [isDis, setDistractor] = useState('');
  const [isSynon, setSynon] = useState('');
  const [isWord, setWord] = useState('');
  const [feedback, setFeedback] = useState('');
  const [btn, setBtn] = useState(false);
  const [answerChoices, setAnswerChoices] = useState([]);

  const handleAnswerClick = (isCorrect) => {
    if (isCorrect) {
      setFeedback('Correct answer!');
    } else {
      setFeedback('Incorrect answer!');
    }
    if (isCorrect) {
      setBtn(true);
    }
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const fetchWord = async () => {
    try {
      let response = await axios.get('https://40.233.5.79:3001/');
      response = await response;

     
      setWord(response.data.wordName);
      setSynon(response.data.synonyms);
      setDistractor(response.data.randomDistractors);
      setFeedback('');
      setBtn(false);
   

const distractorArray = response.data.randomDistractors;


const newDistractorArray = distractorArray.map((element, index) => (
  <div key={index}>{element}</div>
));
      
      setDistractor(newDistractorArray);

console.log(newDistractorArray)
      const newAnswerChoices = [
        { text: newDistractorArray[0], isCorrect: false },
        { text: response.data.synonyms, isCorrect: true },
        { text: newDistractorArray[1], isCorrect: false },
        { text: newDistractorArray[2], isCorrect: false },
        { text: newDistractorArray[3], isCorrect: false },
        { text: newDistractorArray[4], isCorrect: false },
      ];

     
      const shuffledAnswerChoices = shuffleArray(newAnswerChoices);

      setAnswerChoices(shuffledAnswerChoices);

      console.log(response.data);
    } catch (error) {
      console.error('Error fetching word:', error.message);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchWord();
  }, []);

  return (
    <div className="box">
      <div className='contaiter'>
        <h2 className='poopert'>SYNONYMS</h2>
      <h1> {isWord}</h1>
      </div>
      
     
      <ul>
        {answerChoices.map((choice, index) => (
          <li  key={index} id='answer' className={choice.isCorrect ? 'correctAnswer' : ''}>
           
            <button id="decorbtn" onClick={() => handleAnswerClick(choice.isCorrect)}>
              {choice.text}
            </button>
          </li>
        ))}
      </ul><div className='container'> 
      <h1>{feedback}</h1>
      </div>
      {btn && <button id="decorbtn"  onClick={fetchWord}>Next Word</button>}
     
    </div>
     <p>Sorry for the inconvenience! To proceed, please open the browser console and accept the unsecure connection from the public IP address. I assure you it's safe. I'm currently unable to afford a domain name for the API, so I had to resort to using a self-signed SSL certificate. Thank you for your understanding and patience.</p>

  );
};
export default Card;
