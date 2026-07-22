document.addEventListener("DOMContentLoaded", () => {

    const fk = Number(localStorage.getItem("FK")) || 0;
    const fr = Number(localStorage.getItem("FR")) || 0;
    const db = Number(localStorage.getItem("DB")) || 0;
    const cs = Number(localStorage.getItem("CS")) || 0;
    const sfi = Number(localStorage.getItem("SFI_KZ")) || 0;

    document.getElementById("avgScore").innerHTML = sfi + "%";

    document.getElementById("fkBar").style.width = fk + "%";
    document.getElementById("frBar").style.width = fr + "%";
    document.getElementById("dbBar").style.width = db + "%";
    document.getElementById("csBar").style.width = cs + "%";

    // ==========================
    // AI қорытындысы
    // ==========================

    let weakest = "";
    let weakestScore = 101;

    const scores = {
        "📘 Қаржылық білім (FK)": fk,
        "🔍 Алаяқтықты тану (FR)": fr,
        "🧠 Шешім қабылдау (DB)": db,
        "🛡️ Киберқауіпсіздік (CS)": cs
    };

    for (const key in scores) {
        if (scores[key] < weakestScore) {
            weakestScore = scores[key];
            weakest = key;
        }
    }

    document.getElementById("analyticsAI").innerHTML =
    `AI талдауы бойынша жалпы SFI-KZ индексіңіз <b>${sfi}%</b>.<br><br>
    Ең әлсіз бағытыңыз — <b>${weakest}</b> (<b>${weakestScore}%</b>).<br><br>
    Осы бағыт бойынша қосымша білім алып, тестті қайта тапсыру ұсынылады.`;

});