// character traits
let charIcon = document.querySelector(".char-icon");
let charLv = document.querySelector("#lv");
let atk = document.querySelector("#atk");
let em = document.querySelector("#em");
let critRate = document.querySelector("#critrate");
let critDmg = document.querySelector("#critdmg");
let er = document.querySelector("#er");
let elementBonus = document.querySelector("#elementbonus");
let talentDmg = document.querySelector("#talentdmg");

let saved = document.querySelector("#saved");

//enemy traits
let enemyLv = document.querySelector("#enemylv");
let resistance = document.querySelector("#resistance");

// total dmg
let totalDmg = document.querySelector("#totaldmg");

// Btns
let calculateBtn = document.querySelector(".calculatebtn");
let saveBtn = document.querySelector(".save");
let loadBtn = document.querySelector(".load");
let deleteBtn = document.querySelector(".delete");

// Load existing saved files
const keys = Object.keys(localStorage)
for (let key of keys) {
    let option = document.createElement("option");
    option.text = key;
    saved.add(option);
}

// Functions
calculateBtn.addEventListener('click', Calculate);
saveBtn.addEventListener('click', Save);
loadBtn.addEventListener('click', Load);

function Calculate() {
    let atkTalent = +atk.value * +talentDmg.value/100
    let crit = 1 + +critDmg.value/100;
    let dmgBonus = 1 + +elementBonus.value/100;
    let resist = 1 - +resistance.value/100;
    let lvDiff = (+charLv.value + 100)/[(+charLv.value+100)+(+enemyLv.value+100)];
    totalDmg.value = parseInt(atkTalent * crit * dmgBonus * resist * lvDiff);
}

function Save() {
    const char = {
        charIcon: charIcon.src,
        level: charLv.value,
        atk: atk.value,
        em: em.value,
        critRate: critRate.value,
        critDmg: critDmg.value,
        er: er.value,
        elementBonus: elementBonus.value,
        talentDmg: talentDmg.value
    }

    let saveAs = prompt("Save As:");
    window.localStorage.setItem(saveAs, JSON.stringify(char));
    let option = document.createElement("option");
    option.text = saveAs;

    checkDup(option.value, option)
}

function checkDup(saveAs, option) {
    let alreadyExist = [];
    for (i = 0; i < saved.length; i++) {
        let maybeDup = saved[i].value;
        alreadyExist.push(maybeDup);
    }

    if (alreadyExist.includes(saveAs)) {
        alert("Name already taken. File will be overwritten.");
    } else {
        saved.add(option);
        alert("Save Successful!");
    }
}

function Load() {
    console.log(charIcon.src);
    charIcon.src = "img/ruin_guard.png"
}


// Notes: Helped to debug
// console.log(+atk.value + 2);
// console.log(atkTalent)
// console.log(crit)
// console.log(dmgBonus)
// console.log(resist)
// console.log(lvDiff)
// Note: + turns string to #