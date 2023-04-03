import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Question = ({ sessionId, setSessionId }) => {
  let userid;
  useEffect(() => {
    if (!localStorage.getItem("sessionId")) {
      const userid = generateSessionId();
      localStorage.setItem("sessionId", userid);
      setSessionId(userid);
      localStorage.setItem("Completed", false);
    } else {
      setSessionId(localStorage.getItem("sessionId"));
    }
  }, []);

  const generateSessionId = () => {
    const sessionIdLength = 16;
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    let sessionId = "";
    for (let i = 0; i < sessionIdLength; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      sessionId += chars[randomIndex];
    }
    return sessionId;
  };
  const questions = [
    {
      id: "q1",
      question: "How satisfied are you with our products?",
      options: [1, 2, 3, 4, 5],
      text: false,
    },
    {
      id: "q2",
      question: "How fair are the prices compared to similar retailers?",
      options: [1, 2, 3, 4, 5],
      text: false,
    },
    {
      id: "q3",
      question:
        "How satisfied are you with the value for money of your purchase?",
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      text: false,
    },
    {
      id: "q4",
      question:
        "On a scale of 1-10 how would you recommend us to your friends and family?",
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      text: false,
    },
    {
      id: "q5",
      question: "What could we do to improve our service?",
      options: [1, 2],
      text: true,
    },
  ];

  const [answers, setAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const history = useNavigate();

  const currentQuestion = questions[currentQuestionIndex];

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((currentIndex) => currentIndex + 1);
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex((currentIndex) => currentIndex - 1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to submit your response.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, submit it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        const responseData =
          JSON.parse(localStorage.getItem("surveyResponses")) || {};
        responseData[sessionId] = JSON.stringify(answers);
        localStorage.setItem("surveyResponses", JSON.stringify(responseData));
        let Completed = JSON.parse(localStorage.getItem("Completed"));
        Completed = true;
        localStorage.setItem("Completed", JSON.stringify(Completed));
        Swal.fire({
          title: "Thank You",
          text: "You have submitted your response",
          icon: "success",
          timer: 5000,
        });
        setTimeout(() => {
          history("/");
        }, 5000);
      }
    });
  };
  const handleAnswer = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  return (
    <>
      <div className="wrapper">
        <div className="question-window">
          <h1>Questions</h1>
          <Card>
            <Card.Header>
              {`${currentQuestionIndex + 1}` + "/" + `${questions.length}`}
            </Card.Header>
            <Card.Body>
              {/* <form onSubmit={handleSubmit}> */}
              <div key={currentQuestion.id}>
                <h2>{currentQuestion.question}</h2>
                {currentQuestion.text ? (
                  <Form.Control
                    className="mb-5"
                    type="text"
                    id={currentQuestion.id}
                    name={currentQuestion.id}
                    onChange={(e) =>
                      setAnswers({
                        ...answers,
                        [currentQuestion.id]: e.target.value,
                      })
                    }
                  />
                ) : (
                  <>
                    <div className="options-container">
                      {currentQuestion.options.map((option) => (
                        <div key={option}>
                          <label
                            htmlFor={`${currentQuestion.id}-${option}`}
                            className="option"
                          >
                            <input
                              type="radio"
                              id={`${currentQuestion.id}-${option}`}
                              name={currentQuestion.id}
                              value={option}
                              onChange={() =>
                                handleAnswer(currentQuestion.id, option)
                              }
                              checked={answers[currentQuestion.id] === option}
                            />
                            <div className="circle">{option}</div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
              <div className="btn-action">
                {currentQuestionIndex > 0 && (
                  <Button
                    variant="warning"
                    type="button"
                    onClick={handlePreviousQuestion}
                  >
                    Previous
                  </Button>
                )}
                {currentQuestionIndex < questions.length - 1 ? (
                  <Button
                    variant="info"
                    type="button"
                    onClick={handleNextQuestion}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="success"
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                )}
              </div>
              {/* </form> */}
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Question;
