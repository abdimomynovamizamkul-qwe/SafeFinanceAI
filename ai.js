const chatBox = document.getElementById("chatBox");
const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

sendBtn.addEventListener("click", sendMessage);

input.addEventListener("keypress", function(e){

    if(e.key==="Enter"){
        sendMessage();
    }

});

function sendMessage(){

    const text = input.value.trim();

    if(text==="") return;

    addUserMessage(text);

    const answer = getAIAnswer(text);

    setTimeout(function(){

        addBotMessage(answer);

    },600);

    input.value="";

}

function addUserMessage(text){

    chatBox.innerHTML += `
        <div class="user-message">
            ${text}
        </div>
    `;

    chatBox.scrollTop = chatBox.scrollHeight;

}

function addBotMessage(text){

    chatBox.innerHTML += `
        <div class="bot-message">
            ${text}
        </div>
    `;

    chatBox.scrollTop = chatBox.scrollHeight;

}
function getAIAnswer(question){

    const q = question.toLowerCase();

    // Банк қызметкері
    if(q.includes("банк") || q.includes("kaspi") || q.includes("халық")){

        return `🏦 <b>Банк қауіпсіздігі</b><br><br>
        Ешбір банк қызметкері телефон арқылы:
        <br>• SMS кодын
        <br>• CVV кодын
        <br>• PIN кодын
        <br>• Құпиясөзді сұрамайды.
        <br><br>
        Егер осындай ақпарат сұралса, әңгімені тоқтатып, банктің ресми нөміріне өзіңіз хабарласыңыз.`;

    }

    // SMS
    if(q.includes("sms")){

        return `📩 <b>SMS қауіпсіздігі</b><br><br>
        SMS арқылы келген код – тек өзіңіз үшін.
        <br><br>
        Оны ешкімге айтуға болмайды.`;

    }

    // Карта
    if(q.includes("карта")){

        return `💳 <b>Банк картасы</b><br><br>
        Қорғаңыз:
        <br>✔ Карта нөмірі
        <br>✔ CVV
        <br>✔ PIN
        <br>✔ SMS коды

        <br><br>

        Бұл ақпараттарды бөгде адамға бермеңіз.`;

    }

    // WhatsApp
    if(q.includes("whatsapp")){

        return `📱 <b>WhatsApp қауіпсіздігі</b><br><br>
        Белгісіз адамдар жіберген
        сілтемелерді ашпаңыз.

        <br><br>

        Сыйлық ұтып алдыңыз деген хабарламалар көбіне алаяқтық болады.`;

    }

    // Сілтеме
    if(q.includes("сілтеме") || q.includes("сайт")){

        return `🌐 <b>Сайтты тексеріңіз</b><br><br>

        Сілтемені ашпас бұрын:

        <br>✔ Адресті қараңыз
        <br>✔ https бар ма?
        <br>✔ Қате жазылған домен жоқ па?

        <br><br>

        Күмәндансаңыз — ашпаңыз.`;

    }

    // Фишинг
    if(q.includes("фишинг")){

        return `🎣 <b>Фишинг</b><br><br>

        Фишинг —
        жалған сайт немесе хабарлама арқылы
        жеке мәліметтерді ұрлау тәсілі.

        <br><br>

        Әрқашан ресми сайттарды пайдаланыңыз.`;

    }

    return `🤖 Кешіріңіз, бұл сұрақ бойынша жауап базам әзірге жеткіліксіз.

    Басқаша сұрап көріңіз немесе қаржылық қауіпсіздікке қатысты сұрақ қойыңыз.`;

}
// =============================
// КҮННІҢ ҚАУІПСІЗДІК КЕҢЕСІ
// =============================

const tips = [

"🔒 Ешкімге SMS арқылы келген растау кодын айтпаңыз.",

"💳 Банк картасының CVV кодын бөгде адамға бермеңіз.",

"📱 WhatsApp арқылы келген күмәнді сілтемелерді ашпаңыз.",

"🎣 Фишингтік сайттарды домен атауы арқылы тексеріңіз.",

"🏦 Банк қызметкері ешқашан PIN немесе SMS кодын сұрамайды.",

"🔑 Әр аккаунтқа әртүрлі күрделі құпиясөз қолданыңыз.",

"✅ Маңызды аккаунттарға екі факторлы қорғанысты (2FA) қосыңыз."

];

const today = new Date().getDay();

document.getElementById("dailyTip").innerHTML = tips[today];