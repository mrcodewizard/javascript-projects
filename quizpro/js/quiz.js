const quizArray = [];
let ansArray = [];
let options = [];
const container = document.querySelector(".quiz-message-container");
const messageElement = document.querySelector(".quiz-message");

const addQuestion = () => {
  /* clear and hide all previous message */
  messageElement.classList.contains("message-error") &&
    messageElement.classList.remove("message-error");

  messageElement.classList.contains("message-success") &&
    messageElement.classList.remove("message-success");

  const questionInput = document.querySelector(".question").value;
  const ansRadio = document.querySelector("input[name='rd-ans']:checked");
  const answerAll = document.querySelectorAll(".answer");

  if (ansRadio != null) {
    answerAll.forEach((ans) => {
      options.push({
        id: Math.floor(Math.random() * 1000),
        text: ans.value,
      });
    });

    const ansValue = ansRadio.nextElementSibling.value;
    quizArray.push({
      id: quizArray.length + 1,
      question: questionInput,
      options: options,
      answer: ansValue,
    });

    messageElement.innerHTML = "Question has been added";
    messageElement.classList.add("message-success");
    container.style.display = "block";

    /* empty all cells when one record is added */
    document.querySelector(".question").value = "";
    answerAll.forEach((ans) => {
      ans.value = "";
    });
    ansRadio.checked = false;
    options = [];

    renderQuestions();
  } else {
    messageElement.innerHTML = "Please Complete the form";
    messageElement.classList.add("message-error");
    container.style.display = "block";
  }

  console.log(quizArray);
  setTimeout(() => {
    messageElement.classList.contains("message-error") &&
      messageElement.classList.remove("message-error");

    messageElement.classList.contains("message-success") &&
      messageElement.classList.remove("message-success");
    container.style.display = "none";
  }, 2000);
};

const renderQuestions = () => {
  let quizPanel = ``;
  quizArray.map((quiz, index) => {
    quizPanel += `<div class="question-panel">
                        <div class="question-header">
                            <h3 class="question-title">Question ${quiz.id}</h3>
                        </div>
                        <div class="question-body">
                            <h4 class="question-text"> ${quiz.question} </h4>`;

    quiz.options.map((option) => {
      quizPanel += `<div class="radio-group">
                         <label class="radio-text" for="checkbox-${option.id}">${option.text}</span>
                         <input type="radio" class="ans-quiz" name="ans-quiz-${index}" value="${option.text}" id="checkbox-${option.id}">
                    </div>`;
    });
    quizPanel += `</div>
            </div>`;
  });

  main = document.querySelector(".quiz-main");
  main.innerHTML = quizPanel;
};

const takeQuiz = () => {
  let submitQuiz = document.createElement("button");
  submitQuiz.type = "button";
  submitQuiz.classList.add("btn", "btn-submit");
  submitQuiz.innerHTML = "Submit";

  /* check if question added or not */

  if (quizArray.length) {
    let questionPanel =
      document.querySelector(".question-panel").lastElementChild;

    let btnSubmitQuiz = document.querySelector(".btn-submit");
    if (!btnSubmitQuiz) {
      questionPanel.appendChild(submitQuiz);
      submitQuiz.addEventListener("click", publishResult);
    }
  } else {
    messageElement.innerHTML = "Please complete the form";
    messageElement.classList.add("message-error");
    container.style.display = "block";

    setTimeout(() => {
      messageElement.classList.contains("message-error") &&
        messageElement.classList.remove("message-error");

      messageElement.classList.contains("message-success") &&
        messageElement.classList.remove("message-success");
      container.style.display = "none";
    }, 2000);
  }

  //   const btnSubmit = document.querySelector(".btn-submit");
};

const publishResult = () => {
  document.querySelector(".btn-submit").setAttribute("disabled", true);

  let answersAll = document.querySelectorAll(".ans-quiz:checked");
  answersAll.forEach((answer) => {
    if (ansArray.indexOf(answer) == -1) {
      ansArray.push({ text: answer.value });
    }
  });

  let resultText = `<div class="question-panel result-panel">
                        <div class="question-header">
                            <h3 class="question-title">Result</h3>
                        </div>
                        <div class="question-body">
                            <h4 class="question-text">Result</h4>`;
  quizArray.map((quiz, index) => {
    if (ansArray[index]["text"] == quiz.answer) {
      resultText += `<p class="question-result">Question ${
        index + 1
      }: Correct</p>`;
    } else {
      resultText += `<p class="question-result">Question ${
        index + 1
      }: Incorrect</p>`;
    }
  });

  const main = document.querySelector(".quiz-main");
  const result = document.createElement("div");
  result.innerHTML = resultText;
  main.appendChild(result);

  answersAll.forEach((ans) => {
    ans.checked = false;
  });
  answersAll.checked = false;
  ansArray = [];
};

const deleteQUiz = () => {
  const quizBody = document.querySelector(".quiz-main");
  quizBody.innerHTML = "";
};

const btnAdd = document.querySelector(".btn-add");
btnAdd.addEventListener("click", addQuestion);

document.body.addEventListener("click", function (e) {
  if (e.target.id == "btn-quiz") {
    takeQuiz();
  }
});
// const btnQuiz = document.querySelector(".btn-quiz");
// btnQuiz.addEventListener("click", takeQuiz);

const btnDelete = document.querySelector(".btn-delete");
btnDelete.addEventListener("click", deleteQUiz);
