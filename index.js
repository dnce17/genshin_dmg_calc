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
let enemyIcon = document.querySelector(".enemy-icon");

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
    if (saveAs != null) {
        window.localStorage.setItem(saveAs, JSON.stringify(char));
        let option = document.createElement("option");
        option.text = saveAs;
        checkDup(option.value, option)
    }
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

    // Change name in input box under char icon to match loaded char
    let charIconList = document.querySelector("#char-icon-list");
    let imgLink = JSON.parse(records).charIcon;
    let imgPng = imgLink.substring(imgLink.lastIndexOf("/") + 1);
    for (key in char) {
        let moduleImgLink = char[key].imgSrc;
        let moduleImgPng = moduleImgLink.substring(moduleImgLink.lastIndexOf("/") + 1);
        if (imgPng == moduleImgPng) {
            charIconList.value = char[key].name;
        }
    }

    // Testing purpose for above comment
    // let str = charIcon.src;
    // console.log(str.substring(str.lastIndexOf("/") + 1)) // return (char name).png
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

function changeCharIcon(item) {
    for (key in char) {
        let charName = item.value;
        if (charName == key) {
            charIcon.src = char[key].imgSrc;
        }
    }
}

function changeEnemyIcon(item) {

    let physical = document.querySelector(".physical-resist");
    let pyro = document.querySelector(".pyro-resist");
    let hydro = document.querySelector(".hydro-resist");
    let electro = document.querySelector(".electro-resist");
    let cryo = document.querySelector(".cryo-resist");
    let dendro = document.querySelector(".dendro-resist");
    let anemo = document.querySelector(".anemo-resist");
    let geo = document.querySelector(".geo-resist");
    // physical.textContent = "70"
    // console.log(physical.textContent)

    for (key in enemies) {
        let enemyName = item.value;
        if (enemyName.replace(/\s/g, '') == key) {
            enemyIcon.src = enemies[key].imgSrc;

            let resistValueList = [];
            for (keyTwo in enemies[key].resistance) {
                let resistValue = enemies[key].resistance[keyTwo];
                resistValueList.push(resistValue);
                // console.log(resistValueList);
            }

            physical.textContent = resistValueList[0]
            pyro.textContent = resistValueList[1]
            hydro.textContent = resistValueList[2]
            electro.textContent = resistValueList[3]
            cryo.textContent = resistValueList[4]
            dendro.textContent = resistValueList[5]
            anemo.textContent = resistValueList[6]
            geo.textContent = resistValueList[7]
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

// Resources Used
// https://bobbyhadz.com/blog/javascript-get-substring-after-specific-character#:~:text=To%20get%20the%20substring%20after,string%20after%20the%20specified%20character.
// https://www.w3schools.com/jsref/jsref_lastindexof.asp