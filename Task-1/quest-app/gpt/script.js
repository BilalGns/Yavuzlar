// script.js
const questions = [];
let currentQuestionIndex = 0;

function addQuestion() {
    const question = document.getElementById('question').value;
    const options = document.getElementById('options').value.split(',');
    const correctOption = document.getElementById('correct-option').value;
    const difficulty = parseInt(document.getElementById('difficulty').value);

    const id = questions.length + 1;
    questions.push({ id, question, options, correctOption, difficulty });
    alert('Soru eklendi!');
    clearInputs();
}

function deleteQuestion() {
    const id = parseInt(document.getElementById('delete-id').value);
    const index = questions.findIndex(q => q.id === id);
    if (index !== -1) {
        questions.splice(index, 1);
        alert('Soru silindi!');
    } else {
        alert('Soru bulunamadı!');
    }
}

function editQuestion() {
    const id = parseInt(document.getElementById('edit-id').value);
    const question = document.getElementById('edit-question').value;
    const options = document.getElementById('edit-options').value.split(',');
    const correctOption = document.getElementById('edit-correct-option').value;
    const difficulty = parseInt(document.getElementById('edit-difficulty').value);

    const index = questions.findIndex(q => q.id === id);
    if (index !== -1) {
        questions[index] = { id, question, options, correctOption, difficulty };
        alert('Soru güncellendi!');
    } else {
        alert('Soru bulunamadı!');
    }
    clearInputs();
}

function searchQuestion() {
    const query = document.getElementById('search-query').value.toLowerCase();
    const results = questions.filter(q => q.question.toLowerCase().includes(query));
    
    let resultsHtml = '';
    if (results.length > 0) {
        results.forEach(q => {
            resultsHtml += `<div>ID: ${q.id}, Soru: ${q.question}, Şıklar: ${q.options.join(', ')}, Doğru Şık: ${q.correctOption}, Zorluk: ${q.difficulty}</div>`;
        });
    } else {
        resultsHtml = 'Soru bulunamadı!';
    }
    document.getElementById('search-results').innerHTML = resultsHtml;
}

function startQuiz() {
    if (questions.length === 0) {
        alert('Soru yok!');
        return;
    }

    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = '';

    const shuffledQuestions = shuffle(questions);
    shuffledQuestions.forEach((q, index) => {
        const questionHtml = `
            <div class="question">
                <p>${index + 1}. ${q.question}</p>
                ${q.options.map((opt, i) => `
                    <input type="radio" name="q${q.id}" value="${opt}" id="q${q.id}-opt${i}">
                    <label for="q${q.id}-opt${i}">${opt}</label><br>
                `).join('')}
            </div>
        `;
        quizContainer.innerHTML += questionHtml;
    });

    const submitButton = document.createElement('button');
    submitButton.innerText = 'Sonuçları Göster';
    submitButton.onclick = calculateScore;
    quizContainer.appendChild(submitButton);
}

function calculateScore() {
    const quizContainer = document.getElementById('quiz-container');
    const correctAnswers = questions.filter(q => {
        const selectedOption = document.querySelector(`input[name="q${q.id}"]:checked`);
        return selectedOption && selectedOption.value === q.correctOption;
    }).length;

    alert(`Toplam Puan: ${correctAnswers} / ${questions.length}`);
}

function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}

function clearInputs() {
    document.getElementById('question').value = '';
    document.getElementById('options').value = '';
    document.getElementById('correct-option').value = '';
    document.getElementById('difficulty').value = '';
    document.getElementById('delete-id').value = '';
    document.getElementById('edit-id').value = '';
    document.getElementById('edit-question').value = '';
    document.getElementById('edit-options').value = '';
    document.getElementById('edit-correct-option').value = '';
    document.getElementById('edit-difficulty').value = '';
    document.getElementById('search-query').value = '';
}
