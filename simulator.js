const scenarios = [

{
title:"📱 Телефон арқылы алаяқтық",

text:"Сізге өзін банк қызметкерімін деген адам қоңырау шалды. Ол картаңызды қорғау үшін SMS арқылы келген кодты айтуыңызды сұрады.",

correct:"danger",

explanation:"🤖 AI түсіндірмесі:<br><br>Ешбір банк қызметкері SMS арқылы келген бір реттік кодты сұрамайды. Егер кодты айтсаңыз, алаяқ сіздің банктік қосымшаңызға кіріп, ақшаңызды аударып жіберуі мүмкін еді."

},

{
title:"🎁 WhatsApp сыйлығы",

text:"WhatsApp-та «Сіз көлік ұтып алдыңыз» деген хабарлама келді. Сілтемені ашу ұсынылды.",

correct:"danger",

explanation:"🤖 AI түсіндірмесі:<br><br>WhatsApp арқылы келген белгісіз сілтемелер көбіне фишингтік сайттарға апарады. Мұндай хабарламаларды ашпаған дұрыс."
},

{
title:"🏦 Ресми банк қосымшасы",

text:"Сіз өзіңіз банктің ресми мобильді қосымшасына кіріп, төлем жасадыңыз.",

correct:"safe",

explanation:"🤖 AI түсіндірмесі:<br><br>Бұл қауіпсіз әрекет. Ресми мобильді қосымшаны пайдалану алаяқтық қаупін азайтады."
},

{
title:"🌐 Интернет-дүкен",

text:"Белгісіз интернет-дүкен өте арзан бағамен телефон сатып алуды ұсынып отыр. Тек алдын ала төлем жасауды сұрайды.",

correct:"danger",

explanation:"🤖 AI түсіндірмесі:<br><br>Алдын ала төлем сұрайтын белгісіз сайттарға сенуге болмайды. Дүкеннің пікірлері мен сенімділігін тексеріңіз."
},

{
title:"🔐 Қауіпсіздік",

text:"Сіз барлық маңызды аккаунттарыңызға екі факторлы аутентификацияны (2FA) қостыңыз.",

correct:"safe",

explanation:"🤖 AI түсіндірмесі:<br><br>2FA есептік жазбаны қосымша қорғайды. Құпиясөз ұрланған жағдайда да алаяқ жүйеге кіре алмайды."
}

];

let current = 0;

const title = document.getElementById("scenarioTitle");
const text = document.getElementById("scenarioText");
const result = document.getElementById("resultBox");

function loadScenario(){

title.innerHTML = scenarios[current].title;

text.innerHTML = scenarios[current].text;

result.innerHTML="";

}

loadScenario();
const safeBtn = document.getElementById("safeBtn");
const dangerBtn = document.getElementById("dangerBtn");

safeBtn.addEventListener("click", function () {
    checkAnswer("safe");
});

dangerBtn.addEventListener("click", function () {
    checkAnswer("danger");
});

function checkAnswer(answer) {

    if (answer === scenarios[current].correct) {

    result.innerHTML =
    "✅ Дұрыс шешім!<br><br>" +
    scenarios[current].explanation;

    result.style.color = "green";

} else {

    result.innerHTML =
    "❌ Қате шешім!<br><br>" +
    scenarios[current].explanation;

    result.style.color = "red";

}

    safeBtn.disabled = true;
    dangerBtn.disabled = true;

    setTimeout(function () {

        current++;

        if (current >= scenarios.length) {

            title.innerHTML = "🎉 Simulator аяқталды";

            text.innerHTML =
            "Құттықтаймыз! Сіз барлық сценарийлерді орындадыңыз.";

            result.innerHTML =
            "SafeFinanceAI жаңа сценарийлерді кейін қосады.";

            safeBtn.style.display = "none";
            dangerBtn.style.display = "none";

            return;

        }

        safeBtn.disabled = false;
        dangerBtn.disabled = false;

        loadScenario();

    }, 3000);

}