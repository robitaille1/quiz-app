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
                <h2>${STORE[questionNum].question}</h2>
                <form class='mainForm'>
                    <fieldset>
                        <input name='answer' type='radio'class="answer" value='option1'>${STORE[questionNum].option1}</input>
                        <input name='answer' type='radio'class="answer" value='option2'>${STORE[questionNum].option2}</input>
                        <input name='answer' type='radio'class="answer" value='option3'>${STORE[questionNum].option3}</input>
                        <input name='answer' type='radio' class="answer" value='option4'>${STORE[questionNum].option4}</input>
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
        <h2 class="Correct">Correct Answer!!</h2>
        <form>
            <button type='button' class='correct-btn'>Next Question</button>
        </form>
    </section>`
    );
    correctAnswers();
}

function incorrectAnswerPage(){
    //if selected answer is incorrect
    $('.display').append(`
        <section role='Incorrect Answer' class="container js-incorrect-answer">
            <h2 class="incorrect">Incorrect Answer</h2>
            <p>The correct answer is: <span class="incorrect">${STORE[questionNum-1].correctAnswer}</span></p>
            <form>
                <button class='incorrect-btn'>Next Question</button>
            </form>
        </section>`
    );
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
        <h2>Congratulations!</h2>
        <p>You got <span class="amtCorrect">8</span> out of 10 correct!!</p>
        <form>
            <button class='restart'>Restart the Quiz</button>
        </form>
    </section>`
    );
    $('.amtCorrect').text(score);

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