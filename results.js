function getRiskLevel(percent){

    if(percent>=70){

        return{
            level:"🟢 ТӨМЕН ТӘУЕКЕЛ",
            color:"green",
            advice:"Сіз қаржылық алаяқтықтың негізгі белгілерін жақсы ажырата аласыз."
        };

    }

    if(percent>=40){

        return{
            level:"🟡 ОРТАША ТӘУЕКЕЛ",
            color:"orange",
            advice:"Кейбір жағдайларда абай болғаныңыз дұрыс."
        };

    }

    return{

        level:"🔴 ЖОҒАРЫ ТӘУЕКЕЛ",
        color:"red",
        advice:"Қаржылық қауіпсіздік бойынша қосымша оқыту ұсынылады."

    };

}

document.addEventListener("DOMContentLoaded", () => {

const percent = localStorage.getItem("percent");
const level = localStorage.getItem("riskLevel");
const advice = localStorage.getItem("advice");

document.getElementById("percent").innerHTML = percent + "%";

const levelBox = document.getElementById("riskLevel");
const circle = document.querySelector(".circle-score");
levelBox.innerHTML = level;

if(level.includes("🟢")){
    levelBox.style.color = "green";
    circle.style.borderColor = "green";
}
else if(level.includes("🟡")){
    levelBox.style.color = "orange";
    circle.style.borderColor = "orange";
}
else{
    levelBox.style.color = "red";
    circle.style.borderColor = "red";
}

document.getElementById("advice").innerHTML = advice;

// localStorage-дан бөлімдердің нәтижелерін оқу
const fk = localStorage.getItem("FK");
const fr = localStorage.getItem("FR");
const db = localStorage.getItem("DB");
const cs = localStorage.getItem("CS");
const sfi = localStorage.getItem("SFI_KZ");
const fullName = localStorage.getItem("fullName") || "-";
const age = localStorage.getItem("age") || "-";
const schoolClass = localStorage.getItem("schoolClass") || "-";

document.getElementById("userName").innerHTML = fullName;
document.getElementById("userAge").innerHTML = age;
document.getElementById("userClass").innerHTML = schoolClass;
// Экранға шығару
document.getElementById("fkResult").innerHTML = fk + "%";
document.getElementById("frResult").innerHTML = fr + "%";
document.getElementById("dbResult").innerHTML = db + "%";
document.getElementById("csResult").innerHTML = cs + "%";

document.getElementById("sfiIndex").innerHTML = sfi + "%";

// Экранға шығару
document.getElementById("fkBar").style.width = fk + "%";
document.getElementById("frBar").style.width = fr + "%";
document.getElementById("dbBar").style.width = db + "%";
document.getElementById("csBar").style.width = cs + "%";

let weakSection = "";
let weakScore = 101;

const scores = {
    "Қаржылық білім (FK)": Number(fk),
    "Алаяқтықты тану (FR)": Number(fr),
    "Шешім қабылдау (DB)": Number(db),
    "Киберқауіпсіздік (CS)": Number(cs)
};

for (let key in scores) {
    if (scores[key] < weakScore) {
        weakScore = scores[key];
        weakSection = key;
    }
}

let aiText = "";

if (sfi >= 80) {

aiText =
`AI талдауы бойынша сіздің <b>SFI-KZ индексіңіз ${sfi}%</b>.

Сіздің қаржылық алаяқтыққа қарсы дайындық деңгейіңіз жоғары.

Ең күшті бағытыңыз:
<b>${Object.keys(scores).find(k => scores[k] === Math.max(...Object.values(scores)))}</b>.

Жетілдіруді қажет ететін бағыт:
<b>${weakSection}</b>.

AI ұсынысы:
Scam Simulator бөліміндегі сценарийлерді кезең сайын орындап, киберқауіпсіздік бойынша білімді тұрақты жаңартып отыру ұсынылады.`;


}
else if (sfi >= 60) {

    aiText =
    `AI талдауы бойынша сіздің SFI-KZ индексіңіз <b>${sfi}%</b>.
    Қауіпсіздік деңгейіңіз орташа.
    Ең әлсіз көрсеткіш —
    <b>${weakSection}</b> (${weakScore}%).
    Осы бағыт бойынша қосымша оқу ұсынылады.`;

}
else {

    aiText =
    `AI талдауы бойынша сіздің SFI-KZ индексіңіз <b>${sfi}%</b>.
    Алаяқтыққа қарсы дайындық деңгейіңіз төмен.
    Әсіресе <b>${weakSection}</b> (${weakScore}%)
    көрсеткіші қауіпті аймақта орналасқан.
    Платформадағы оқу материалдарын қарап, тестті қайта тапсыру ұсынылады.`;

}

document.getElementById("aiResult").innerHTML = aiText;
let scienceText = "";

if (sfi >= 80) {

scienceText =
"Зерттеу нәтижесі бойынша қатысушының қаржылық алаяқтыққа қарсы дайындық деңгейі жоғары. Негізгі құзыреттер қалыптасқан. Әлсіз бағыттарды жетілдіру жалпы қауіпсіздік деңгейін одан әрі арттырады.";

}

else if (sfi >= 60) {

scienceText =
"Зерттеу нәтижесі бойынша қатысушының қаржылық қауіпсіздік деңгейі орташа. Кейбір бағыттар бойынша қосымша оқыту мен тәжірибелік тапсырмалар ұсынылады.";

}

else {

scienceText =
"Зерттеу нәтижесі бойынша қатысушының қаржылық алаяқтыққа қарсы дайындық деңгейі төмен. SafeFinanceAI платформасындағы оқу материалдарын қарап, Scam Simulator бөлімін орындап, тестті қайта тапсыру ұсынылады.";

}

document.getElementById("scienceResult").innerHTML = scienceText;
});
// ==============================
// PDF есепті жүктеу
// ==============================

document.getElementById("downloadPdf").addEventListener("click", function () {

    window.print();

});