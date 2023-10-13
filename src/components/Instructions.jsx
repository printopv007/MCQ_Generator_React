import React from 'react'
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
function Instructions() {
  return (
    <div>
      <div className="container">
        <h2>Welcome to MyExam Portal</h2>
        <p>Read the below instructions and then Press Attend Exam</p>
        <p>
        Instructions for the MCQ Exam: <br/><br/>

Welcome to MyExam Portal! Test your knowledge, stay focused, and aim for a perfect score. Here's how it works: <br/><br/>

1. Colorful Feedback: We've added colors to your feedback. Correct answers will be highlighted in vibrant green, and incorrect answers will appear in bold red. This visual feedback will help you keep track of your progress. <br/><br/>

2. User-Friendly Navigation: You won't be able to skip questions. Instead, the next question button will become active once you make a selection, ensuring you stay engaged and focused.<br/><br/>

3. Positive Scoring: For every correct answer, you earn 1 point. No worries, there are no negative marks for wrong selections. Keep trying, and your score will climb. The score will be displayed at the end of the test.<br/><br/>

Its all about trying!. Just try! <br/>

Good luck and enjoy the MCQ! Let's get started.<br/>

        </p>
        <Link to="/r/django">
          <Button 
            variant="success">Attend Exam</Button>
          </Link>
      </div>
    </div>
  )
}

export default Instructions
