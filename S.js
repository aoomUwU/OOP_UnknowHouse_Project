class Player {
  #name;
  #health;
  #stamina;
  #inventory;

  constructor(name = "Tofu") {
    this.#name = name;
    this.#health = 100;
    this.#stamina = 200;
    this.#inventory = [];
  }

  getName() {
    return this.#name;
  }
  setName(name) {
    this.#name = name;
  }

  getHealth() {
    return this.#health;
  }
  setHealth(health) {
    this.#health = health;
  }

  getStamina() {
    return this.#stamina;
  }
  setStamina(value) {
    this.#stamina = value;
  }

  getInventory() {
    return this.#inventory;
  }
  addInventory(item) {
    this.#inventory.push(item);
  }
  delInventory(item) {
    const index = this.#inventory.indexOf(item); //หา index ของ item ใน array
    if (index !== -1) {
      this.#inventory.splice(index, 1); 
    }
  }
}

class Object {
  #name;
  #id;
  #description;

  constructor(name, id, description) {
    this.#name = name;
    this.#id = id;
    this.#description = description;
  }
  getName() {
    return this.#name;
  }
  setName(name) {
    this.#name = name;
  }

  getId() {
    return this.#id;
  }
  setId(id) {
    this.#id = id;
  }

  getDescription() {
    return this.#description;
  }
  setDescription(description) {
    this.#description = description;
  }
}

class Room {
  #name;
  #id;
  #description;
  #ways;
  #objects;
  #items;

  constructor(name, id, description, ways = [], objects = [], items = []) {
    this.#name = name;
    this.#id = id;
    this.#description = description;
    this.#ways = ways;
    this.#objects = objects;
    this.#items = items;
  }
  getName() {
    return this.#name;
  }
  setName(name) {
    this.#name = name;
  }

  getId() {
    return this.#id;
  }
  setId(id) {
    this.#id = id;
  }

  getDescription() {
    return this.#description;
  }
  setDescription(description) {
    this.#description = description;
  }

  getWays() {
    return this.#ways;
  }
  getObjects() {
    return this.#objects;
  }

  getItems() {
    return this.#items;
  }
  delItems(item) {
    const index = this.#items.indexOf(item); //หา index ของ item ใน array
    if (index !== -1) {
      this.#items.splice(index, 1);
    }
  }
}
function showtext(text) { //เอา text ไปเเสดงใน resultBox ที่อยู่หน้า html 
  const resultBox = document.getElementById("resultBox");
  const resultElement = document.createElement("p");
  resultElement.innerHTML = text;
  resultBox.appendChild(resultElement);
  resultBox.scrollTop = resultBox.scrollHeight; //เลื่อนขึ้น-ลง 
}

function getRoom(id) { //
  const room = rooms.find((room) => room.getId() === id);
  return room;
}

function playGame() {
  showtext("เรากำลังหนีตำรวจมาแล้วเห็นบ้านหลังนึงเลยคิดว่าจะเข้าไปข้างในเพื่อซ่อนตัวจากตำรวจ จากนั้นเวลาก็ผ่านไปจนดึกโจรคนนี้เลยคิดจะออกจากบ้านหลังแต่พอกลับไปที่เส้นทางเดิมที่เคยเข้ามา ทางเข้ากลับถูกล็อคโดยไม่ทราบสาเหตุ");
  showtext("ตอนนี้คุณอยู่ในห้องครัว");
  showtext("คุณจะทำอย่างไร?");
  inputElement.addEventListener("keydown", function (event) { // ตรวจจับการกดปุ่ม keydown(บนแป้นพิมพ์)
    if (event.key === "Enter") { // ตรวจจับการกดปุ่ม Enter
      const input = inputElement.value;
      inputElement.value = "";
      console.log(input);

    }
  });
}
let note1 = new Object("", 1, "ช่วงนี้สบายดีรึเปล่า? ไม่เห็นติดต่อมาเลยโทรหาก็ไม่รับสายเลย แม่ซื้อกับข้าวเอาไว้ในตู้เย็นนะแม่เป็นห่วงลูกนะดูแลตัวเองดีๆนะ  -จากแม่");
let room1 = new Room("", 0, "");
const rooms = [];
const inputElement = document.getElementById("input");
playGame();
