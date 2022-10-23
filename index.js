// character traits
let charLv = document.querySelector("#lv");
let hp = document.querySelector("#hp");
let atk = document.querySelector("#atk");
let def = document.querySelector("#def");
let em = document.querySelector("#em");
let critRate = document.querySelector("#critrate");
let critDmg = document.querySelector("#critdmg");
let er = document.querySelector("#er");
let elementBonus = document.querySelector("#elementbonus");
let talentDmg = document.querySelector("#talentdmg");

//enemy traits
let enemyLv = document.querySelector("#enemylv");
let resistance = document.querySelector("#resistance");

// total dmg
let totalDmg = document.querySelector("#totaldmg");

// btn
let calculateBtn = document.querySelector(".calculatebtn");

// formula
calculateBtn.addEventListener('click', Calculate);

function Calculate() {
    let atkTalent = +atk.value * +talentDmg.value/100
    let crit = 1 + +critDmg.value/100;
    let dmgBonus = 1 + +elementBonus.value/100;
    let resist = 1 - +resistance.value/100;
    let lvDiff = (+charLv.value + 100)/[(+charLv.value+100)+(+enemyLv.value+100)];
    totalDmg.value = parseInt(atkTalent * crit * dmgBonus * resist * lvDiff);
}

// Notes: Helped to debug
// console.log(+atk.value + 2);
// console.log(atkTalent)
// console.log(crit)
// console.log(dmgBonus)
// console.log(resist)
// console.log(lvDiff)