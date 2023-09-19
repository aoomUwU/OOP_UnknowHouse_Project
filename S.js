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
class Door extends Object {
  #roomid1;
  #roomid2;
  #status;
  #req;
  constructor(name, id, description, roomid1, roomid2, status = "unlock" , req = 0) {
    super(name, id, description);
    this.#roomid1 = roomid1; //ห้องที่อยู่ตอนนี้
    this.#roomid2 = roomid2; //ห้องถัดไป
    this.#status = status;
    this.#req = req;
  }
  next(roomid) { //roomid คือห้องที่อยู่ตอนนี้
    if (roomid === this.#roomid2){ //ถ้าห้องตอนนี้คือ roomid2 ต้องทำให้ roomid1=roomid2 เพาระ roomid1คือห้องที่อยู่ตอนนี้ roomid2คือห้องถัดไป 
      this.#roomid2 = this.#roomid1; 
      this.#roomid1 = roomid;
    }
    if (this.#status === "lock") {
      for (const item of player.getInventory()) {
        if (item.getId() === this.#req) {
          return this.#roomid2; //roomid2คือห้องถัดไป
        }
      }
      return showtext("มันล็อคอยู่");
    } else { //ไม่ได้ lock
      return this.#roomid2; //roomid2คือห้องถัดไป
    }
  }
}

class Room {
  #name;
  #id;
  #description;
  #objects;
  #items;

  constructor(name, id, description, objects = [], items = []) {
    this.#name = name;
    this.#id = id;
    this.#description = description;
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
class Hall extends Room { //ไปได้หลายห้อง
  #nextRoom
  constructor(name, id, description, objects = [], nextRoom = [], items = []) {
    super(name, id, description, objects, items);
    this.#nextRoom = nextRoom;
  }
  getNextRoom() {
    return this.#nextRoom;
  }
  nextRoom(input, roomid) {
    input = "ประตู"+input
    let door = getRoom(roomid).getObjects().find((d) => d.getName() === input);
    console.log(door);
    return door;
  }
}
class DeadEnd extends Room { //ห้องที่ลด hp
  constructor(name, id, description, objects = [], items = []) {
    super(name, id, description, objects, items);
  }
  damage(damage){
    player.setHealth -= damage;
  }
}

function showtext(text) { //เอา text ไปเเสดงใน resultBox ที่อยู่หน้า html 
  const resultBox = document.getElementById("resultBox");
  const resultElement = document.createElement("p");
  resultElement.innerHTML = text;
  resultBox.appendChild(resultElement);
  resultBox.scrollTop = resultBox.scrollHeight; //เลื่อนขึ้น-ลง 
}

function getRoom(roomid) { //หาห้องใน array rooms ที่มี roomid ตรงตามที่ต้องการ
  const room = rooms.find((room) => room.getId() === roomid);
  return room;
}
function getObject(input, roomid) { //หาobject ที่มี idหรือnameตรง ในห้องที่มีroomidตรงตามที่ต้องการ 
  const objects = getRoom(roomid).getObjects();
  const object = objects.find((obj) => obj.getName() === input || obj.getId() === input);
  return object;
}

function playGame() {
  showtext("เรากำลังหนีตำรวจมาแล้วเห็นบ้านหลังนึงเลยคิดว่าจะเข้าไปข้างในเพื่อซ่อนตัวจากตำรวจ จากนั้นเวลาก็ผ่านไปจนดึกโจรคนนี้เลยคิดจะออกจากบ้านหลังแต่พอกลับไปที่เส้นทางเดิมที่เคยเข้ามา ทางเข้ากลับถูกล็อคโดยไม่ทราบสาเหตุ");
  showtext("ตอนนี้คุณอยู่ในห้องครัวและดูเหมือนจะไม่ได้ใช้มาซักพักแล้ว บนตู้เย็นดูเหมือนจะมีโน๊ตแปะอยู่");
  showtext("คุณจะทำอย่างไร?");
  inputElement.addEventListener("keydown", function (event) { // ตรวจจับการกดปุ่ม keydown(บนแป้นพิมพ์)
    if (event.key === "Enter") { // ตรวจจับการกดปุ่ม Enter
      const input = inputElement.value;
      inputElement.value = "";
      console.log(input);
      let room = getRoom(roomid);
      if (room.getDescription().includes(input)) {
        if (room instanceof Hall) {
          roomid = room.nextRoom(input, roomid);
          console.log(room.nextRoom(input, roomid));
          showtext(getRoom(roomid).getDescription());
        } else {
          let obj = getObject(input, roomid);
          showtext(obj.getDescription());
        }
      } else if (input.includes("ออก")) {
        showtext("ออกจาก"+room.getName());
        let door = getObject(("ประตู"+room.getName()), roomid);
        roomid = door.next(roomid);
        showtext(getRoom(roomid).getDescription());
      }
      console.log(getRoom(roomid));
      if (room instanceof DeadEnd) { // ถ้าเป็นห้องที่เจอผีหรือห้องในclass DeadEnd
        getRoom(roomid).damage(100);
      }
    }
  });
}

let noteRoom1 = new Object("โน๊ต", 1, "ช่วงนี้สบายดีรึเปล่า? ไม่เห็นติดต่อมาเลยโทรหาก็ไม่รับสายเลย แม่ซื้อกับข้าวเอาไว้ในตู้เย็นนะแม่เป็นห่วงลูกนะดูแลตัวเองดีๆนะ  -จากแม่");
let doorRoom1 = new Door("ประตูห้องครัว", 2 , "ประตูของห้องครัว", 0, 1);
let doorRoom3 = new Door("ประตูโรงรถ", 3 , "ประตูของโรงรถ", 2, 1);

let room1 = new Room("ห้องครัว", 0, "ห้องครัวดูเหมือนจะไม่ได้ใช้มาซักพักแล้ว บนตู้เย็นดูเหมือนจะมีโน๊ตแปะอยู่",[noteRoom1,doorRoom1],[]);
let room2 = new Hall("โถง", 1, "เห็นประตูอยู่ข้างหน้าดูเหมือนจะเป็นโรงรถ และมีทางให้เดินไปต่อ", [doorRoom3], ["ห้องครัว", "โรงรถ"], []);
let room3 = new DeadEnd("โรงรถ", 2, "หลังจากเปิดประตูโรงรถเข้าไป จู่ๆก็เกิดอาการหนาวสั่น แล้วคุณก็เหลือบไปเห็นเงาของผู้หญิงคนหนึ่งค่อยเดินเข้ามาหาคุณ คุณพยายามที่จะหนีแต่ร่างกายของคุณไม่ยอมขยับเลยแหละทันใดนั้นคุณก็ได้รู้ตัวแล้วว่า'วิญญาณของคุณได้ตายไปแล้ว'");
const rooms = [room1, room2];

const player = new Player();

const inputElement = document.getElementById("input");
let roomid = 0;
playGame();
