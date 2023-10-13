import React, { useEffect, useState } from "react";
import { fetchData } from "../api";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Toast from 'react-bootstrap/Toast';
import { Link } from "react-router-dom";

export const Random = () => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answerSelected, setAnswerSelected] = useState(false);
  const [score, setScore] = useState(0); // Track the user's score
  const [showScoreAlert, setShowScoreAlert] = useState(false); // Control when to show the score alert
  const [showSubmitButton, setShowSubmitButton] = useState(false); // Control when to show the "Submit" button

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (answerSelected && currentQuestionIndex === data.length - 1) {
      // Calculate the score when all questions have been answered
      const newScore = userAnswers.reduce((totalScore, answerIndex, questionIndex) => {
        const isCorrect = data[questionIndex].answer[answerIndex].is_right;
        return isCorrect ? totalScore + 1 : totalScore;
      }, 0);
      setScore(newScore);
      setShowScoreAlert(true);
      setShowSubmitButton(false); // Hide the "Submit" button after showing the score
    }
  }, [userAnswers, currentQuestionIndex, answerSelected, data, score]);

  const getData = async () => {
    const response = await fetchData('mcq/q/django');
    const shuffledData = shuffleArray(response);
    setData(shuffledData);
  };

  const shuffleArray = (array) => {
    let shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
      // Shuffle the answers within each question
      shuffledArray[i].answer = shuffleAnswers(shuffledArray[i].answer);
      shuffledArray[j].answer = shuffleAnswers(shuffledArray[j].answer);
    }
    return shuffledArray;
  };
  
  
  const shuffleAnswers = (answers) => {
    let shuffledAnswers = answers.slice();
    for (let i = shuffledAnswers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledAnswers[i], shuffledAnswers[j]] = [shuffledAnswers[j], shuffledAnswers[i]];
    }
    return shuffledAnswers;
  };
  

  const handleAnswerClick = (questionIndex, answerIndex) => {
    if (!answerSelected) {
      const newAnswers = [...userAnswers];
      newAnswers[questionIndex] = answerIndex;
      setUserAnswers(newAnswers);
      setAnswerSelected(true);

      if (questionIndex === data.length - 1) {
        // Show the "Submit" button when the last question is answered
        setShowSubmitButton(true);
      }
    }
  };

  const handleNextClick = () => {
    if (currentQuestionIndex < data.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setAnswerSelected(false);
    }
  };

  const handleScoreSubmit = () => {
    // Calculate the score when the user chooses to submit
    const newScore = userAnswers.reduce((totalScore, answerIndex, questionIndex) => {
      const isCorrect = data[questionIndex].answer[answerIndex].is_right;
      return isCorrect ? totalScore + 1 : totalScore;
    }, 0);
    setScore(newScore);
    setShowScoreAlert(true);
    setShowSubmitButton(false);
  };

  return (

    <Container style={{textAlign:'center', placeContent:'center'}}>
      {data.length > 0 && currentQuestionIndex < data.length && (
        <div>
          <h3>
            <label htmlFor="">{currentQuestionIndex + 1}) {data[currentQuestionIndex].title}</label>
          </h3>
          <ul className="answer-list">
            {data[currentQuestionIndex].answer.map((answer, answerIndex) => (
              <div key={answer.id}>
                <form action="">
                  <br />
                  <div className="main">
                    <Button 
                      variant={
                        answerSelected &&
                        (answer.is_right || userAnswers[currentQuestionIndex] === answerIndex)
                          ? answer.is_right
                            ? "success"
                            : "danger"
                          : "warning" 
                      }
                      onClick={() => handleAnswerClick(currentQuestionIndex, answerIndex)}
                      disabled={answerSelected || showScoreAlert}
                      className={answerSelected ? "disabled-answer" : ""}
                      style={{width:'20rem'}}
                      
                    >
                      {answerIndex + 1}) {answer.answer_text}
                      {answer.is_right ? "" : ""}
                    </Button>
                  </div>
                </form>
              </div>
            ))}
          </ul>
          {answerSelected && currentQuestionIndex < data.length - 1 && (
            <Button style={{float:'left',marginLeft:'150px'}} onClick={handleNextClick} variant="success">
              Next
            </Button>
          )}
          {showSubmitButton && (
            <Button onClick={handleScoreSubmit} variant="warning">
              Submit
            </Button>
          )}
        </div>
      )}
      {showScoreAlert && (
        <div>
<Button style={{float:'left',marginLeft:'40px'}} onClick={() => setShow(true)}>Show Result</Button>
<Link style={{float:'left',marginLeft:'40px'}} to="/"><Button variant="success">Back to Homepage</Button></Link>

<br/><br/>
       <Container> <Toast style={{width:'1000px',height:'130px'}} onClose={() => setShow(false)} show={show} delay={3000}>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Your Result</strong>
            <small>Thank you for Attending</small>
          </Toast.Header>
          <Toast.Body> <h3> 🎉 Congrats,Your Final Score is {score} out of {data.length} 🎉 </h3></Toast.Body>
        </Toast></Container>
        </div>
      )}
    </Container>
  );
};
export default Random;


