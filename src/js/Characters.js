import  Enumerable from 'linq';
export class Character {
    /**
     * @param {string} name
     * @param {string} gender
     * @param {int} age
     * @param {string} role 
     */

    #name;
    #gender;
    #age;
    #role;
    #slogan;
    constructor(name, gender, age, role, slogan) {
        //name validation
        if (/([^A-Za-z0-9\s])/g.test(name)) {
            throw new Error("Invalid name");
        }
        this.#name = name;
        //gender validation
        if (auth(gender)) {
            this.#gender = gender;
        } else {
            throw new Error("Invalid gender");            
        }
        //age validation
        var res = Enumerable.from(age).where(x => x <= 1000 && x > 0).toArray();
        if (res.length == 0) {
            throw new Error("Invalid age");
        }
        this.#age = age;
        //role validation
        if (auth_role(role)) {
            this.#role = role; 
        } else{
            throw new Error("Invalid role");
        }
        //slogan validation
        if (slogan === ""){
            throw new Error("Invalid slogan");
        }
        this.#slogan = slogan;
    }

    get name() {
        return this.#name;
    }

    get gender() {
        return this.#gender;
    }

    get age() {
        return this.#age;
    }

    get role() {
        return this.#role;
    }

    get slogan(){
        return this.#slogan;
    }

    set name(name) {
        if (/([^A-Za-z0-9\sáéiíóöőúüű])/g.test(name)) {
            throw new Error("Invalid name");
        } else {
            this.#name = name;
        }
    }
    
    set age(age) {
        var res = Enumerable.from(age).where(x => x <= 1000 && x > 0).toArray();
        if (res.length == 0) {
            throw new Error("Invalid age");
        }
        this.#age = age;
    }

    set gender(gender) {
        let g = String(gender).toLowerCase();
        if (auth(g)) {
            this.#gender = g;
        } else {
            throw new Error("Invalid gender");            
        }
    }

    set role(role) {
        if (auth_role(role)) {
            this.#role = role; 
        } else{
            throw new Error("Invalid role");
        }
    }

    set slogan(slogan){
        if (slogan === ""){
            throw new Error("Invalid slogan");
        }
        this.#slogan = slogan;
    }
    toString() {
        return `${this.#name} - ${this.#age} - ${this.#gender} - ${this.#role}`;
    }
}

function auth(gender){
    gender = String(gender).toLowerCase();
    let gender_category = ["male", "female", "other"];
    for (const e of gender_category) {
        if (e === gender){
            return true;
        }
    }
    return false;
}

function auth_role(role){
    let roles = ["fighter","rogue","mage","healer","tank","scout","leader"];
    for (const e of roles) {
        if (e === role){
            return true;
        }
    }
    return false;
}