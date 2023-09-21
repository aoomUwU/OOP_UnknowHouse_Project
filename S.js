class Player {
  // Private properties
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
  // Public method
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
    this.#inventory.push(item); // ใส่ item เข้าไปใน array inventory
  }
  delInventory(item) {
    const index = this.#inventory.indexOf(item); //หา index ของ itemที่จะเอาออก ใน array inventory
    if (index !== -1) {
      this.#inventory.splice(index, 1); //เอาออก จากarray inventory
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
      return "มันล็อคอยู่";
    } else { //ไม่ได้ lock
      return this.#roomid2; //roomid2คือห้องถัดไป
    }
  }
}

class Item extends Object {
  constructor(name, id, description) {
    super(name, id, description);
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
    const updatedDescription = (this.#description).replace(item.getName(), "ความว่างเปล่า");
    this.#description = updatedDescription;
  }
  enter() {
    showtext(this.#description);
  }
}
class Holy extends Room {
  #deadDescription
  #req
  constructor(name, id, description, objects = [], items = [], deadDescription, req = 0) {
    super(name, id, description, objects, items);
    this.#deadDescription = deadDescription;
    this.#req = req;
  }
  enter() {
    let enter = false;
      for (const item of player.getInventory()) { //check item ที่ตรงตามที่ห้องต้องการ(req)
        if (item.getId() === this.#req) { 
          enter = true; 
        }
      }
      if (!enter) {
        player.setHealth(player.getHealth() - 100);
        showtext(this.#deadDescription);
        Popup(this.#deadDescription, "dath");
      }
  }
}
class End extends Room {

  constructor(name, id, description, objects = [], items = []) {
    super(name, id, description, objects, items);
  }
  enter() {
    showtext(this.getDescription());
    Popup(this.getDescription(), "end");
  }
}

function showtext(text) { //เอา text ไปเเสดงใน resultBox ที่อยู่หน้า html 
  const resultBox = document.getElementById("resultBox");
  const resultElement = document.createElement("p");
  resultElement.innerHTML = text;
  resultBox.appendChild(resultElement);
  resultBox.scrollTop = resultBox.scrollHeight; //เลื่อนขึ้น-ลง 
}

function details(player) {
  let detail = "Name: " + player.getName() + "<br>";
  detail += "Health: " + player.getHealth() + "<br>";
  detail += "Stamina: " + player.getStamina() + "<br>";
  detail += "<br>";
  detail += "Inventory: " + "<br>";
  for (const item of player.getInventory()) {
    detail += "<li>" + item.getName() + "</li>";
  }
  const playerDetails = document.getElementById("playerDetail");
  playerDetails.innerHTML = detail;
}

function Popup(text, end) {
  if (end === "end") {
    document.getElementById("popupEnd").style.display = "block";
    document.querySelector("#popupEnd p").textContent = text;
  } else {
    document.getElementById("popupDeath").style.display = "block";
    document.querySelector("#popupDeath p").textContent = text;
  }
}
function reloadPage() {
  location.reload(); // โหลดหน้าhtmlใหม่
}

function getRoom(roomid) { //หาห้องใน array rooms ที่มี roomid ตรงตามที่ต้องการ
  const room = rooms.find((room) => room.getId() === roomid);
  return room;
}
function getObject(input, roomid) {
  const objects = getRoom(roomid).getObjects();
  const items = getRoom(roomid).getItems();
  
  let object = objects.find((obj) => obj.getName() === input || obj.getId() === input);

  if (!object) {
    const doorInput = "ประตู" + input;
    object = objects.find((obj) => obj.getName() === doorInput || obj.getId() === doorInput);
  }

  if (!object) {
    object = items.find((obj) => obj.getName() === input || obj.getId() === input);
  }

  return object;
}


function playGame() {
  details(player);
  console.log(getRoom(roomid));
  showtext("เรากำลังหนีตำรวจมาแล้วเห็นบ้านหลังนึงเลยคิดว่าจะเข้าไปข้างในเพื่อซ่อนตัวจากตำรวจ จากนั้นเวลาก็ผ่านไปจนดึกโจรคนนี้เลยคิดจะออกจากบ้านหลังแต่พอกลับไปที่เส้นทางเดิมที่เคยเข้ามา ทางเข้ากลับถูกล็อคโดยไม่ทราบสาเหตุ");
  showtext("ตอนนี้คุณอยู่ในห้องครัวและดูเหมือนจะไม่ได้ใช้มาซักพักแล้ว บนตู้เย็นดูเหมือนจะมีโน๊ตแปะอยู่");
  showtext("คุณจะทำอย่างไร?");
  inputElement.addEventListener("keydown", function (event) { // ตรวจจับการกดปุ่ม keydown(บนแป้นพิมพ์)
    if (event.key === "Enter") { // ตรวจจับการกดปุ่ม Enter
      const input = inputElement.value;
      inputElement.value = "";
      console.log(input);
      let room = getRoom(roomid);
      if (room.getDescription().includes(input) || input.includes("ออก")) {
        let obj;

        if (input.includes("ออก")) {
          obj = getObject(("ประตู"+room.getName()), roomid);
        } else {
          obj = getObject(input, roomid);
        }
        console.log(obj);

        if (obj instanceof Door) {
          
          if (obj.next(roomid) === "มันล็อคอยู่") {
            showtext("มันล็อคอยู่");
          } else {
            roomid = obj.next(roomid);
            if (getRoom(roomid) instanceof Holy || getRoom(roomid) instanceof End) {
              getRoom(roomid).enter();
            }
            player.setStamina(player.getStamina() - 1);
            showtext(getRoom(roomid).getDescription());
          }
          
        } else if (obj instanceof Item) {
          showtext(obj.getDescription());
          showtext("คุณหยิบ" + obj.getName());
          player.addInventory(obj);
          room.delItems(obj);

        } else {
          showtext(obj.getDescription());
        }
      }
      console.log(getRoom(roomid));
      details(player);
    }
  });
}

let noteRoom0 = new Object("โน๊ต", 1, "ช่วงนี้สบายดีรึเปล่า? ไม่เห็นติดต่อมาเลยโทรหาก็ไม่รับสายเลย แม่ซื้อกับข้าวเอาไว้ในตู้เย็นนะแม่เป็นห่วงลูกนะดูแลตัวเองดีๆนะ  -จากแม่");
let refrigerator = new Object("ตู้เย็น", 12,"ตู้เย็นสีเทา");
let amulet = new Item("เครื่องราง", 13, "เครื่องรางเเวววาว");
let key = new Item("กุญแจ", 14, "กุญแจบ้าน");
let tool = new Object("อุปกรณ์", 15, "อุปกรณ์มากมาย");
let table = new Object("โต็ะ", 16, "โต็ะยาวสีขาว");
let sofa = new Object("โซฟา", 17, "โซฟาสีดำทรงเหลียมหน่อยๆ");
let tv = new Object("ทีวี", 18, "ทีวี SOMESUNG stupid TV 144p UnHD รุ่น AFDG554SF");
let wc = new Object("ชักโครก", 19, "มันมีเเต่รอยเลือด");
let photo = new Object("รูป", 20, "รูปที่ทำให้คุณรู้สึกถูกจ้องมองอยู่");
let bed = new Object("เตียง", 21, "มันคือเตียง");
let dressingtable = new Object("โต๊ะเครื่องแป้ง", 22, "มันคือโต๊ะเครื่องแป้งที่ไม่มีแป้ง");
let wardrobe = new Object("ตู้เสื้อผ้า", 23, "มันคือตู้เสื้อผ้า");

let doorRoom0 = new Door("ประตูห้องครัว", 2, "ประตูของห้องครัว", 0, 1);
let doorRoom1 = new Door("ประตูโถง", 3, "ประตูไปนอกบ้าน", 1, 5, "lock", 14);
let doorRoom2 = new Door("ประตูโรงรถ", 4, "ประตูของโรงรถ", 2, 1);
let doorRoom3 = new Door("ประตูห้องนั่งเล่น", 5, "ประตูของห้องนั่งเล่น", 3, 1);
let doorRoom4 = new Door("ประตูห้องน้ำ", 6, "ประตูของห้องน้ำ", 4, 1);
let stair1 = new Door("บันได", 7, "บันไดไปชั้นบนหรือลงบ้าน", 1, 10);
let doorRoom10 = new Door("ประตูโถงชั้นสอง", 8, "ลงชั้นล่าง", 10, 1);
let doorRoom11 = new Door("ประตูโถงใหญ่", 9, "ประตูของโถงใหญ่", 11, 10);
let doorRoom12 = new Door("ประตูห้องนอน", 10, "ประตูของห้องนอน", 12, 10);
let doorRoom13 = new Door("ประตูระเบียง", 11, "ประตูของระเบียง", 13, 10);

// ชั้น 1
let room0 = new Room("ห้องครัว", 0, "ห้องครัวดูเหมือนจะไม่ได้ใช้มาซักพักแล้ว บนตู้เย็นดูเหมือนจะมีโน๊ตแปะอยู่", [refrigerator, noteRoom0,doorRoom0]);
let room1 = new Room("โถง", 1, "มีประตูอยู่ข้างหน้าห้องครัวดูเหมือนจะเป็นโรงรถเเล้วถัดมาเป็นห้องนั่งเล่น และข้างๆมีห้องน้ำที่ตรงขามกับบันไดไปชั้นสอง", [doorRoom0, doorRoom1, doorRoom2, doorRoom3, doorRoom4, stair1]);
let room2 = new Holy("โรงรถ", 2, "โรงรถว่างเปล่ามี กุญแจ วางอยู่บนโต็ะบนนั้นมีอุปกรณ์หลายอย่าง", [tool, table, doorRoom2], [key], "หลังจากเปิดประตูโรงรถเข้าไป จู่ๆก็เกิดอาการหนาวสั่น แล้วคุณก็เหลือบไปเห็นเงาของผู้หญิงคนหนึ่งค่อยเดินเข้ามาหาคุณ คุณพยายามที่จะหนีแต่ร่างกายของคุณไม่ยอมขยับเลยแหละทันใดนั้นคุณก็ได้รู้ตัวแล้วว่า'วิญญาณของคุณได้ตายไปแล้ว'", 13);
let room3 = new Room("ห้องนั่งเล่น", 3, "มีโซฟาอยู่ตรงกลางห้องข้างหน้าของโซฟาเป็นทีวี", [sofa, tv, doorRoom3]);
let room4 = new Room("ห้องน้ำ", 4, "ในห้องน้ำมีคราบสกปรกและก็รอยเลือดที่ติดตามกำแพงและชักโครกอยู่ ดูเหมือนจะเคยมีอะไรเกิดขึ้นในห้องน้ำนี้มาก่อน", [wc, doorRoom4]);
let room5 = new End("นอกบ้าน", 5, "มีเสียงเดินอยู่รอบๆบ้านเต็มไปหมด มีเสียงหอนที่ดังมาเป็นระยะๆ และยังมีเสียงครื้ดๆ ตามกำแพงอีกน่าขนลุกจังเลย เเล้วคุณเดินหางออกไปจากบ้าน");
// ชั้น 2
let room10 = new Room("โถงชั้นสอง",10, "มีโถงใหญ่ใกล้ๆกับบันได ถัดไปเป็นห้องนอนและข้างๆมีระเบียง", [stair1, doorRoom10, doorRoom11, doorRoom12, doorRoom13]);
let room11 = new Holy("โถงใหญ่",11, "ในห้องมีเเต่รูปๆหนึ่งติดอยู่บนกำแพง", [photo, doorRoom11], [], "ในห้องมีเเต่รูปๆหนึ่งติดอยู่บนกำแพงเมื่อคุณจ้องมอกที่รูปนั้นมันทำให้คุณรู้สึกอยากจะเข้าไปดูใกล้ๆแล้วคุณก็เดินเข้าไปใกล้ๆรูปนั้น ทันใดนั้น คนในรูปก็ดึงคุณเข้าไปในภาพ จนคุณเข้าไปอยู่ในอีกมิตินึงซึ่งในมิตินั้นเป็นมิติของปีศาจร้าย ไม่นะ! คุณกำลังจะโดนมันกิน อ้ากกกกก!", 13);
let room12 = new Room("ห้องนอน",12, "มีเตียงอยู่มุมห้องข้างๆมีโต๊ะเครื่องแป้งและตู้เสื้อผ้าคุณสังเกตุเห็นของบนมันคือ เครื่องราง", [bed, dressingtable, wardrobe, doorRoom12], [amulet]);
let room13 = new Holy("ระเบียง",13, "ไม่มีอะไรเลย", [doorRoom13], [], "จู่ๆคุณก็ถูกผลักลงหน้าต่าง แล้วคุณก็เสียชีวิต", 13);

const rooms = [room0, room1, room2, room3, room4, room5, room10 ,room11, room12, room13];

const player = new Player();

const inputElement = document.getElementById("input");
let roomid = 0;
playGame();
