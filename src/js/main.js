import Enumerable from 'linq';
import { Character } from './Characters.js';

async function postData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST",
      mode: "cors", 
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data),
    });
    return response.json(data);
  }



let character_list = [
    {
        rname: "fighter",
        strength: 3,
        vitality: 3,
        dexterity: 2,
        imgurl: "../assets/fighter.webp"
    },
    {
        rname: "rogue",
        strength: 2,
        vitality: 2,
        dexterity: 3,
        imgurl: "../assets/rogue.webp"
    },
    {
        rname: "mage",
        strength: 1,
        vitality: 2,
        dexterity: 4,
        imgurl: "../assets/rogue.webp"
    },
    {
        rname: "healer",
        strength: 1,
        vitality: 4,
        dexterity: 2,
        imgurl: "../assets/healer.webp"
    },
    {
        rname: "tank",
        strength: 2,
        vitality: 4,
        dexterity: 1,
        imgurl: "../assets/tank.webp"
    },
    {
        rname: "scout",
        strength: 2,
        vitality: 2,
        dexterity: 3,
        imgurl: "../assets/scout.webp"
    },
    {
        rname: "leader",
        strength: 2,
        vitality: 3,
        dexterity: 3,
        imgurl: "../assets/leader.webp"
    }
];


function roleSearcher(string) {
    let res = Enumerable.from(character_list).where(x => x.rname === string).toArray();
    return res[0];
}

function settodefault() {
    let role_element = document.getElementById("role");
    role_element.value = "fighter";
    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("gender").value = "male";
    document.getElementById("slogan").value = "";
}

if (document.getElementById("button") != null) {
    let role_element = document.getElementById("role");
    document.addEventListener("DOMContentLoaded", () => {
        let first = roleSearcher(role_element.value);
        document.getElementById("strength").className += "strength-" + first.strength;
        document.getElementById("vitality").className += "strength-" + first.vitality;
        document.getElementById("dexterity").className += "strength-" + first.dexterity;
        role_element.addEventListener("change", () => {
            let obj = roleSearcher(role_element.value);
            document.getElementById("strength").className = "strength-" + obj.strength;
            document.getElementById("vitality").className = "strength-" + obj.vitality;
            document.getElementById("dexterity").className = "strength-" + obj.dexterity;
        });
    });

   
        

      document.getElementById("button").addEventListener("click", async(e) => {
        e.preventDefault();
        let role_element = document.getElementById("role");
        let role = role_element.value;
        let name = document.getElementById("name").value;
        let age = document.getElementById("age").value;
        let gender = document.getElementById("gender").value;
        let slogan = document.getElementById("slogan").value;
        let character = new Character(name, gender, age, role, slogan);
        settodefault();
        let json = {
            character_name: character.name,
            character_age: character.age,
            character_gender: character.gender,
            character_role: character.role,
            character_slogan: character.slogan
        }
        postData("http://localhost:3000/api", json ).then((data)=>{
            console.log(data);
        })
    })
}
let id = 0;
let card = document.getElementById("cardtitle1");
let slogan = document.getElementById("slogan1-1");
if (document.querySelector('#tablecharacter') != null) {
    const table = document.querySelector('#tablecharacter');
    const tbody = document.querySelector('#tbody');
    document.addEventListener('DOMContentLoaded', async()=>{
        let insidelist = await fetch("http://localhost:3000/api").then(response => response.json());
        let cardimg = document.getElementById("cut");
        cardimg.src = roleSearcher(insidelist[0].character_role).imgurl;
        card.innerText = `${insidelist[0].character_name} | ${insidelist[0].character_role[0].toUpperCase() + insidelist[0].character_role.slice(1)}`;
        slogan.innerText = `${insidelist[0].character_slogan}`;
        let obj = roleSearcher(insidelist[0].character_role);
        document.getElementById("strength").className = "strength-" + obj.strength;
        document.getElementById("vitality").className = "strength-" + obj.vitality;
        document.getElementById("dexterity").className = "strength-" + obj.dexterity;
        document.getElementById("first-age").innerText = insidelist[0].character_age;
        document.getElementById("second-gender").innerText = insidelist[0].character_gender;
        for (const e of insidelist) {
            if (e == "null"){
                continue;
            }
            id+=1;
            let tr = document.createElement('tr');
            tr.id = id;
            let id_col = document.createElement('td');
            let name_col = document.createElement('td');
            let role_col = document.createElement('td');
            let gender_col = document.createElement('td');
            let age_col = document.createElement('td');

            id_col.innerText = id;
            name_col.innerText = e.character_name;
            role_col.innerText = e.character_role;
            gender_col.innerText = e.character_gender;
            age_col.innerText = e.character_age;

            tr.appendChild(id_col);
            tr.appendChild(name_col);
            tr.appendChild(role_col);
            tr.appendChild(gender_col);
            tr.appendChild(age_col);

            tbody.appendChild(tr);
        }
    });

    


    table.addEventListener('click', async function(event) {
    const row = event.target.closest('tr');
    const rowIndex = row.rowIndex;
    let pattern = document.querySelectorAll(`#tablecharacter > tbody > tr`)[rowIndex].childNodes[1].innerText;
    let data = await postData("http://localhost:3000/apisearch", {character_name: `${pattern}`} )
    let cardimg = document.getElementById("cut");
    cardimg.src = roleSearcher(data[0].character_role).imgurl;
    card.innerText = `${data[0].character_name} | ${data[0].character_role[0].toUpperCase() + data[0].character_role.slice(1)}`;
    slogan.innerText = `${data[0].character_slogan}`;
    let obj = roleSearcher(data[0].character_role);
    document.getElementById("strength").className = "strength-" + obj.strength;
    document.getElementById("vitality").className = "strength-" + obj.vitality;
    document.getElementById("dexterity").className = "strength-" + obj.dexterity;
    document.getElementById("first-age").innerText = data[0].character_age;
    document.getElementById("second-gender").innerText = data[0].character_gender;
  });
}
