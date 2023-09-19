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
  if (!object){
    input = "ประตู" + input;
    const object = objects.find((obj) => obj.getName() === input || obj.getId() === input);
    return object;
  } else {
    return object;
  }
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
        let obj = getObject(input, roomid);
          if (obj instanceof Door) {
            roomid = obj.next(roomid);
            showtext(getRoom(roomid).getDescription());
          } else {
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

let noteRoom0 = new Object("โน๊ต", 1, "ช่วงนี้สบายดีรึเปล่า? ไม่เห็นติดต่อมาเลยโทรหาก็ไม่รับสายเลย แม่ซื้อกับข้าวเอาไว้ในตู้เย็นนะแม่เป็นห่วงลูกนะดูแลตัวเองดีๆนะ  -จากแม่");

let doorRoom0 = new Door("ประตูห้องครัว", 2, "ประตูของห้องครัว", 0, 1);
let doorRoom1 = new Door("ประตูโถง", 3, "ประตูไปนอกบ้าน", 1, 5);
let doorRoom2 = new Door("ประตูโรงรถ", 4, "ประตูของโรงรถ", 2, 1);
let doorRoom3 = new Door("ประตูห้องนั่งเล่น", 5, "ประตูของห้องนั่งเล่น", 3, 1);
let doorRoom4 = new Door("ประตูห้องน้ำ", 6, "ประตูของห้องน้ำ", 4, 1);
let stair1 = new Door("บันได", 7, "บันไดไปชั้นบนหรือลงบ้าน", 1, 10);
let doorRoom10 = new Door("ประตูโถงชั้นสอง", 8, "ลงชั้นล่าง", 10, 1);
let doorRoom11 = new Door("ประตูโถงใหญ่", 9, "ประตูของโถงใหญ่", 11, 10);
let doorRoom12 = new Door("ประตูห้องนอน", 10, "ประตูของห้องนอน", 12, 10);
let doorRoom13 = new Door("ประตูระเบียง", 11, "ประตูของระเบียง", 13, 10);

// ชั้น 1
let room0 = new Room("ห้องครัว", 0, "ห้องครัวดูเหมือนจะไม่ได้ใช้มาซักพักแล้ว บนตู้เย็นดูเหมือนจะมีโน๊ตแปะอยู่", [noteRoom0,doorRoom0]);
let room1 = new Room("โถง", 1, "มีประตูอยู่ข้างหน้าห้องครัวดูเหมือนจะเป็นโรงรถเเล้วถัดมาเป็นห้องนั่งเล่น และข้างๆมีห้องน้ำที่ตรงขามกับบันไดไปชั้นสอง", [doorRoom0, doorRoom1, doorRoom3, doorRoom4, stair1]);
let room2 = new DeadEnd("โรงรถ", 2, "หลังจากเปิดประตูโรงรถเข้าไป จู่ๆก็เกิดอาการหนาวสั่น แล้วคุณก็เหลือบไปเห็นเงาของผู้หญิงคนหนึ่งค่อยเดินเข้ามาหาคุณ คุณพยายามที่จะหนีแต่ร่างกายของคุณไม่ยอมขยับเลยแหละทันใดนั้นคุณก็ได้รู้ตัวแล้วว่า'วิญญาณของคุณได้ตายไปแล้ว'");
let room3 = new Room("ห้องนั่งเล่น", 3, "มีทีวีโซฟา", [doorRoom3]);
let room4 = new Room("ห้องน้ำ", 4, "นี่ห้องน้ำ", [doorRoom4]);
let room5 = new Room("นอกบ้าน", 5, "นี่นอกบ้าน");
// ชั้น 2
let room10 = new Room("โถงชั้นสอง",10, "มีโถงใหญ่ใกล้ๆกับบันได ถัดไปเป็นห้องนอนและข้างๆมีระเบียง", [stair1, doorRoom10, doorRoom11, doorRoom12, doorRoom13]);
let room11 = new Room("โถงใหญ่",11, "นี่โถงใหญ่", [doorRoom11]);
let room12 = new Room("ห้องนอน",12, "นี่ห้องนอน", [doorRoom12]);
let room13 = new Room("ระเบียง",13, "นี่ระเบียงชั้นสอง(สูงเกินไปที่จะโดดลง)", [doorRoom13]);

const rooms = [room0, room1, room2, room3, room4, room5, room10 ,room11, room12, room13];

const player = new Player();

const inputElement = document.getElementById("input");
let roomid = 0;
playGame();
