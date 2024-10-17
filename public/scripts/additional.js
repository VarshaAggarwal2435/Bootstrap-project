let submitted =  document.getElementById("submitQuiz");
submitted.addEventListener("click", checkAnswers);

const correctAnswers = [false, false, false, true, false, false, true, false, false, true, false, false, false, true, 
    false, false, true, false, false, false];

let Answers = [];

function checkAnswers(){
    let count = 0;
    for(let i = 1; i<=5; i++){
        for(let j = 1; j<= 4; j++){
            let optionId = "option" + i.toString() + j.toString();
            Answers[count] = document.getElementById(optionId).checked;
            count++;
        }
    }
    let j = 1;
    let c = 1;
    for(let i = 0; i<20; i++){

        let cardNumber = j;
        let addition = document.createElement("div");
        addition.class = "Answer";
        addition.textContent = "Wrong";
        addition.style.paddingLeft = "30px";
        addition.style.paddingBottom = "20px";
        addition.style.color = "red";
        addition.style.fontSize = "14px";
        addition.style.fontStyle = "italic";
        addition.style.fontWeight = "8px";

        if(correctAnswers[i] === true && Answers[i] === true){
            addition.textContent = "Correct";
            addition.style.color = "green";
        }
        if(correctAnswers[i] === true){
            let cardId = "quizcard" + cardNumber.toString();
            document.getElementById(cardId).append(addition);
        }
        c++;
        if(c%4 == 1){
            j++;
        }
    }    
}
