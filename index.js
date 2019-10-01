let questionNum = 0;
let score =0;

//Home Screen
function startQuiz() {
    //When start button clicked
   $('.start').on('click', function(){
    event.preventDefault();
    console.log('Start quiz button was clicked');
    $('.js-hide-it').remove();
    renderQuestions();
   });
}

//Questions Pages
function renderQuestions() {
    if(questionNum < STORE.length) {
        $(numberCounter);
        $('.display').html(`
            <section role='Quiz Questions' class="container question">
                <form class='mainForm'>
                    <fieldset class='answerForm'>
                    <legend>
                        <h2 class='question-text'>${STORE[questionNum].question}</h2>
                    </legend>
                        <label class='answer-label' for='answer1'>
                            <input checked name='answer' type='radio'class="answer" value='option1' id='answer1'>${STORE[questionNum].option1}</input>
                        </label>
                        <label class='answer-label' for='answer2'>
                            <input name='answer' type='radio'class="answer" value='option2' id='answer2'>${STORE[questionNum].option2}</input>
                        </label>
                        <label class='answer-label' for='answer3'>
                            <input name='answer' type='radio'class="answer" value='option3' id='answer3'>${STORE[questionNum].option3}</input>
                        </label>
                        <label class='answer-label' for='answer4'>
                            <input name='answer' type='radio' class="answer" value='option4' id='answer4'>${STORE[questionNum].option4}</input>
                        </label>
                        <button type='button' class='submit'>SUBMIT</button>
                    </fieldset>
                </form>
            </section>`
        );
    } else {
        overallPage();
    }
}

function submitAnswer() {
    //When answer selected and button submitted
    $('body').on('click', '.submit', function(){
        event.preventDefault();
        var submittedAnswer = $("input[type= 'radio']:checked").val();
        console.log('Submit button clicked');
        $('.question').remove();
        if(STORE[questionNum-1][submittedAnswer] === STORE[questionNum-1].correctAnswer){
            correctAnswerPage();
        } else {
            incorrectAnswerPage();
        }
    });
}

function correctAnswerPage() {
    //if selected answer is correct
    $('.display').append(`
    <section role='Correct Answer' class="container js-correct-answer">
        <h2 class="correct">Correct Answer!!😍</h2>
        <img class="correct-img" src='${STORE[questionNum-1].questionImg}' alt='${STORE[questionNum-1].questionAlt}'>
        <form>
            <button type='button' class='correct-btn'>Next Question</button>
        </form>
    </section>`
    );   
    correctAnswers();
    if(questionNum === 10) {
        $('.correct-btn').text('See Results!')
    }
}

function incorrectAnswerPage(){
    //if selected answer is incorrect
    $('.display').append(`
        <section role='Incorrect Answer' class="container js-incorrect-answer">
            <h2 class="incorrect">Incorrect Answer 😭😭</h2>
            <p>The correct answer is: <span class="incorrect">${STORE[questionNum-1].correctAnswer}</span></p>
            <img class="correct-img" src='${STORE[questionNum-1].questionImg}' alt='${STORE[questionNum-1].questionAlt}'>
            <form>
                <button class='incorrect-btn'>Next Question</button>
            </form>
        </section>`
    );
    if(questionNum === 10) {
        $('.incorrect-btn').text('See Results!')
    }
}


//Answer page button - move to next Question
function nextQuestion(){
    $('body').on('click', '.correct-btn', function(){
        console.log('next question clicked');
        event.preventDefault();
        $('.js-correct-answer').remove();
        $(renderQuestions);
    });
    $('body').on('click', '.incorrect-btn', function(){
        console.log('next question clicked');
        event.preventDefault();
        $('.js-incorrect-answer').remove();
        $(renderQuestions);
    });
}


function numberCounter() {
    //increment by 1 at each question
    questionNum ++;
    $('.currentQ').text(questionNum);
}

function correctAnswers() {
    //increment by one for each correct answer
    score++;
    $('.currentScore').text(score);
}

//Overall Page

function overallPage() {
    //After last question render the overall score page
    $('body').append(`
    <section role='Overall Results' class="container js-overall">
        <h2 class='message-header'>Congratulations!</h2>
        <p>You got <span class="amtCorrect">8</span> out of 10 correct!!</p>
        <p class='message'></p>
        <form>
            <button class='restart'>Restart the Quiz</button>
        </form>
    </section>`
    );
    $('.amtCorrect').text(score);
    if(score <= 3){
        $('.message-header').text('You need to try harder next time 👎👎')
        $('.message').text('"No soup for you!!" - The Soup Nazi')
    } else if (score > 3 && score <= 5){
        $('.message-header').text('Better luck next time ❌❌')
        $('.message').text('"Serenity Now!" - Frank Costanza')
    } else if (score > 5 && score <= 7){
        $('.message-header').text('Keep trying! 🤔')
        $('.message').text('"You\'re sooo good looking" - Elaine')
    } else if (score > 7 && score < 10){
        $('.message-header').text("You're almost there! 👍👍👍")
        $('.message').text('"These pretzels are making me thirsty!" - Kramer')
    } else if (score === 10) {
        $('.message-header').text("You're amazing!! 🔥🔥🔥")
        $('.message').text('"You\'re master of your domain!" - Jerry')
    }
    //When button clicked render main screen again
}

function restartQuiz(){
    $('body').on('click', '.restart', function(){
        $('.js-overall').remove();
        $('.js-hide-it').display();
    });
}


$(startQuiz);
$(submitAnswer);
$(nextQuestion);