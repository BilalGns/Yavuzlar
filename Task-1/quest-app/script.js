let sorular = JSON.parse(localStorage.getItem("sorular")) || [
    {
        id: 0,
        soru: "Hangisi javascript paket yöneticisidir?",
        secenekler: {
            a: "npm",
            b: "nodejs",
            c: "npx",
            d: "react"
        },
        dogruCevap: "a"
    }
];

const questPanel = document.getElementById('question-panel-list');
const question = document.getElementById('question-title');
const a = document.getElementById('-a');
const b = document.getElementById('-b');
const c = document.getElementById('-c');
const d = document.getElementById('-d');

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

function addNewQuestion() {

    // const newQuestion = {
    //     id: questPanel.children.length,
    //     soru: `Gönderilen soru ${questPanel.children.length}`,
    //     secenekler: {
    //         a: "npm",
    //         b: "nodejs",
    //         c: "npx",
    //         d: "react"
    //     },
    //     dogruCevap: "a"
    // };

    // sorular.push(newQuestion);
    localStorage.setItem("sorular", JSON.stringify(sorular));

    const li = `
        <div class="question-elements">
            <div class="question-element-title" value="${questPanel.children.length}">
                ${newQuestion.soru}
            </div>
            <div class="question-element-edit">Edit</div>
            <div class="question-element-delete">Delete</div>
        </div>
    `;
    questPanel.insertAdjacentHTML("beforeend", li);
    attachEventListeners();
}

function attachEventListeners() {
    const deleteButtons = document.querySelectorAll('.question-element-delete');
    deleteButtons.forEach((deleteButton) => {
        deleteButton.addEventListener('click', function (event) {
            event.stopPropagation();

            const questionIndex = event.target.getAttribute('data-index');

            sorular.splice(questionIndex, 1);

            localStorage.setItem("sorular", JSON.stringify(sorular));

            rePaint(sorular);
        });
    });
}

function rePaint(questions) {
    questPanel.innerHTML = '';
    questions.forEach((question, index) => {
        const questionElementHTML = `
            <div class="question-elements">
                <div class="question-element-title">${question.soru}</div>
                <div class="question-element-edit">Edit</div>
                <div class="question-element-delete" data-index="${index}">Delete</div>
            </div>
        `;
        questPanel.insertAdjacentHTML("beforeend", questionElementHTML);
    });

    attachEventListeners();
}


if (document.URL.includes('questionList.html')) {
    rePaint(sorular);
}



// SOru ekleme kısmı

function addQuestion() {

    const question = document.getElementById('question').value;
    const optionsA = document.getElementById('optionsA').value;
    const optionsB = document.getElementById('optionsB').value;
    const optionsC = document.getElementById('optionsC').value;
    const optionsD = document.getElementById('optionsD').value;
    const correctOption = document.getElementById('correct-option').value;
    const difficulty = document.getElementById('difficulty').value;


    const newQuestion = {
        id: Date.now(),  // Farklı bir ID ataması için kullanıyoruz. Şuan için buranın bir işlevi yok
        soru: question,
        secenekler: {
            a: optionsA,
            b: optionsB,
            c: optionsC,
            d: optionsD
        },
        dogruCevap: correctOption,
        zorluk: difficulty
    };

    let sorular = JSON.parse(localStorage.getItem('sorular')) || [];
    sorular.push(newQuestion);
    localStorage.setItem('sorular', JSON.stringify(sorular));

    window.location.href = 'index.html';
}

if (document.URL.includes('questionList.html')) {

    document.querySelector('.question-element-title').addEventListener('click', () => {

        window.location.href = 'questionPage.html';
    })

}
