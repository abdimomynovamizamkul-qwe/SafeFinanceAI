let userAnswers = {};
let currentSection = "FK";

const quiz = document.getElementById("quiz");
const nextBtn = document.getElementById("nextBtn");
const nextSection = document.getElementById("nextSection");

const sectionNames = {
    FK: "Қаржылық білім (FK)",
    FR: "Алаяқтықты тану (FR)",
    DB: "Шешім қабылдау (DB)",
    CS: "Киберқауіпсіздік (CS)"
};

function getCurrentQuestions() {
    return questions.filter(q => q.section === currentSection);
}

function renderQuestions() {

    quiz.innerHTML = "";

    document.getElementById("sectionTitle").textContent =
        sectionNames[currentSection];

    const currentQuestions = getCurrentQuestions();

    currentQuestions.forEach(q => {

        const block = document.createElement("div");
        block.className = "question-card";

        let html = `<h3>${q.id}. ${q.question}</h3>`;

        q.answers.forEach((answer, index) => {

            const checked =
                userAnswers[q.id] === index ? "checked" : "";

            html += `
                <label>
                    <input
                        type="radio"
                        name="q${q.id}"
                        value="${index}"
                        ${checked}
                    >
                    ${answer}
                </label>
            `;
        });

        block.innerHTML = html;

        quiz.appendChild(block);

        block.querySelectorAll("input").forEach(radio => {

            radio.addEventListener("change", function () {

                userAnswers[q.id] = Number(this.value);

                updateProgress();

            });

        });

    });

    updateProgress();
}

function updateProgress() {

    const total = getCurrentQuestions().length;

    const answered = Object.keys(userAnswers)
        .filter(id =>
            getCurrentQuestions().some(q => q.id == id)
        ).length;

    const percent = Math.round((answered / total) * 100);

    document.getElementById("progressBar").style.width =
        percent + "%";

    document.getElementById("progressText").textContent =
        percent + "% аяқталды";

}
if (nextSection) {
    nextSection.addEventListener("click", function () {

        if (currentSection === "FK") {

            currentSection = "FR";

        } else if (currentSection === "FR") {

            currentSection = "DB";

        } else if (currentSection === "DB") {

            currentSection = "CS";

        } else {

            alert("Барлық бөлім аяқталды.");
            return;

        }

        renderQuestions();

    });
}


if (nextBtn) {
    nextBtn.addEventListener("click", function () {

        const result = calculateResults(userAnswers);

        const risk = getRiskLevel(result.SFI_KZ);

        localStorage.setItem("percent", result.SFI_KZ);
        localStorage.setItem("SFI_KZ", result.SFI_KZ);

        localStorage.setItem("FK", result.FK);
        localStorage.setItem("FR", result.FR);
        localStorage.setItem("DB", result.DB);
        localStorage.setItem("CS", result.CS);

        localStorage.setItem("riskLevel", risk.level);
        localStorage.setItem("advice", risk.advice);

        window.location.href = "result.html";

    });
}
function calculateResults(userAnswers) {

    let sectionScores = {
        FK: 0,
        FR: 0,
        DB: 0,
        CS: 0
    };

    let maxScores = {
        FK: 0,
        FR: 0,
        DB: 0,
        CS: 0
    };

    questions.forEach(q => {

        maxScores[q.section] += Math.max(...q.scores);

        if (userAnswers[q.id] !== undefined) {

            sectionScores[q.section] +=
                q.scores[userAnswers[q.id]];

        }

    });

    const FK = Math.round(sectionScores.FK / maxScores.FK * 100);
    const FR = Math.round(sectionScores.FR / maxScores.FR * 100);
    const DB = Math.round(sectionScores.DB / maxScores.DB * 100);
    const CS = Math.round(sectionScores.CS / maxScores.CS * 100);

    const total =
        sectionScores.FK +
        sectionScores.FR +
        sectionScores.DB +
        sectionScores.CS;

    const max =
        maxScores.FK +
        maxScores.FR +
        maxScores.DB +
        maxScores.CS;

    const SFI_KZ = Math.round((total / max) * 100);

    return {
        FK,
        FR,
        DB,
        CS,
        SFI_KZ
    };

}


function getRiskLevel(score) {

    if (score >= 80) {

        return {
            level: "🟢 ТӨМЕН ТӘУЕКЕЛ",
            advice: "Сіз қаржылық алаяқтықтан жақсы қорғана аласыз. Біліміңіз жоғары."
        };

    }

    if (score >= 60) {

        return {
            level: "🟡 ОРТАША ТӘУЕКЕЛ",
            advice: "Қауіпсіздік деңгейіңіз орташа."
        };

    }

    if (score >= 40) {

        return {
            level: "🟠 ЖОҒАРЫ ТӘУЕКЕЛ",
            advice: "Қаржылық қауіпсіздік бойынша біліміңізді арттыру қажет."
        };

    }

    return {

        level: "🔴 ӨТЕ ЖОҒАРЫ ТӘУЕКЕЛ",
        advice: "Платформадағы оқу материалдарын қарап, тестті қайта тапсыру ұсынылады."

    };

}

renderQuestions();