let sorular = [
    {
        id: 0,
        soru: "Hangisi javascript paket yöneticisidir ?",
        secenekler: {
            a: "npm",
            b: "nodejs",
            c: "npx",
            d: "react"
        },
        dogruCevap: "a"
    }

]


localStorage.setItem("sorular", JSON.stringify(sorular))




const questPanel = document.getElementById('question-panel-list');

const btn = document.getElementsByClassName('add-question')[0];

const question = document.getElementById('question-title');

console.log("question:", question);


const a = document.getElementById('-a');
const b = document.getElementById('-b');
const c = document.getElementById('-c');
const d = document.getElementById('-d');


// const questionClick = document.querySelectorAll('.question-element-title');




console.log("clickx",);


if (document.URL.includes("questionPage")) {

    sendQuestion();
}

function sendQuestion() {
    question.innerText = `${sorular[0].soru}`;
    a.firstElementChild.innerText = `${sorular[0].secenekler.a}`;
    b.firstElementChild.innerText = `${sorular[0].secenekler.b}`;
    c.firstElementChild.innerText = `${sorular[0].secenekler.c}`;
    d.firstElementChild.innerText = `${sorular[0].secenekler.d}`;
}


console.log("click4",);


function addNewQuestion() {


    sorular.push({
        id: questPanel.children.length,
        soru: "Gönderilen soru ",
        secenekler: {
            a: "npm",
            b: "nodejs",
            c: "npx",
            d: "react"
        },
        dogruCevap: "a"
    })



    const li = `
        <div class="question-elements">
        <div class="question-element-title" value="${questPanel.children.length + 1}">
                    ${sorular[sorular.length - 1].soru} ${questPanel.children.length + 1}
                    </div>
                <div class="question-element-edit">
                Edit
                </div>
                <div class="question-element-delete">
                Delete
                </div>
                </div>
        `;

    questPanel.insertAdjacentHTML("beforeend", li);




    localStorage.setItem("sorular", JSON.stringify(sorular))


}




if (document.URL.includes("questionList")) {

    addNewQuestion();
}



console.log("click",);

const questionClick = document.querySelectorAll('.question-elements');

console.log(questionClick);





const deleteButton = document.querySelector('.question-element-delete');

questionClick.forEach((element) => {


    const editButton = element.querySelector('.question-element-edit');

    

    // Eğer tıklanan yer edit veya delete butonları değilse
    element.addEventListener('click', function (event) {
        if (event.target !== editButton && event.target !== deleteButton) {
            console.log(element); // Tıklanan öğeyi konsola yazdır
            //alert("go")
            window.location.href = "questionPage.html";
        }
    });
});






// function displayQuestions(){

// }

// document.getElementById('searchinput').addEventListener('input', function() {
//     const searchTerm = this.value.toLowerCase();

//     const filteredQuestions = sorular.filter(soruObj =>
//         soruObj.soru.toLowerCase().includes(searchTerm)
//     );

//     console.log(searchTerm);
    
//     displayQuestions(filteredQuestions.soru);
// });

// displayQuestions(sorular.soru);








const soruMetni = document.getElementById('question');
const optionsA = document.getElementById('optionsA');
const optionsB = document.getElementById('optionsB');
const optionsC = document.getElementById('optionsC');
const optionsD = document.getElementById('optionsD');
const correctOption = document.getElementById('correct-option');






soruMetni?.addEventListener('input', function(event){
    
    const girilenSoru = event.target.value;

    console.log(girilenSoru);
    
})


function addQuestion(){


    
    // sorular.push({
    //     id: questPanel.children.length,
    //     soru: ``,
    //     secenekler: {
    //         a: "npm",
    //         b: "nodejs",
    //         c: "npx",
    //         d: "react"
    //     },
    //     dogruCevap: "a"
    // })

    console.log();
    
}



const deleteButon = document.getElementById('deleteQ');

deleteButon.addEventListener('click', (event)=>{
    event.stopPropagation();
    sorular.splice(1,1)
    rePaint(sorular);
})

const rePaint = (questions) => {
    questPanel.innerHTML = '';
    questions.forEach(question => {
      const questionElementHTML = `
            <div class="question-elements">
              <div class="question-element-title">${question.soru}</div>
              <div class="question-element-edit">Edit</div>
              <div class="question-element-delete">Delete</div>
            </div>
        `;
      questPanel.insertAdjacentHTML("beforeend", questionElementHTML);
    });
  }



// function deleteQuestion(input){

//     sorular.splice(input-1,1);
//     console.log("soru silindi");
    
// }



