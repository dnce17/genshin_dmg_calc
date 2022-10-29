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
deleteBtn.addEventListener("click", deleteItem);

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
    let key = saved.value;
    let records = window.localStorage.getItem(key);

    // Load the saved data
    charIcon.src = JSON.parse(records).charIcon;
    charLv.value = JSON.parse(records).level;
    atk.value = JSON.parse(records).atk;
    em.value = JSON.parse(records).em;
    critRate.value = JSON.parse(records).critRate;
    critDmg.value = JSON.parse(records).critDmg;
    er.value = JSON.parse(records).er;
    elementBonus.value = JSON.parse(records).elementBonus;
    talentDmg.value = JSON.parse(records).talentDmg;
}

function deleteItem() {
    let key = saved.value;
    localStorage.removeItem(key);

    // remove the deleted item from saved input box 
    let alreadyExist = [];
    for (i = 0; i < saved.length; i++) {
        let savedName = saved[i].value;
        alreadyExist.push(savedName);
    }

    if (alreadyExist.includes(key)) {
        for (i = 0; i < saved.length; i++) {
            let savedName = saved[i].value;
            if (key == savedName) {
                saved.remove(i);
                alert("File has been deleted");
            } 
        }
    }
}

function changeIcon(item) {
    // charIcon.src = "img/nilou.png"
    // console.log(item.value);
    // let test = "nilou"
    for (key in char) {
        // console.log(char[key].imgSrc);
        let charName = item.value;
        // console.log(charName, key)
        if (charName == key) {
            // console.log(charName, key);
            charIcon.src = char[key].imgSrc;
        }
    }
}


// Notes: Helped to debug
// console.log(+atk.value + 2);
// console.log(atkTalent)
// console.log(crit)
// console.log(dmgBonus)
// console.log(resist)
// console.log(lvDiff)
// Note: + turns string to #