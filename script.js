// ===============================
// GLOBAL
// ===============================

let score = 0;
let basket = null;
let gameFinished = false;
let musicStarted = false;

// ===============================
// MUSIC
// ===============================

function playMusic(){

    if(musicStarted) return;

    const music = document.getElementById("bgMusic");

    if(!music) return;

    music.volume = 0.4;

    music.play()
    .then(()=>{

        musicStarted = true;

    })
    .catch(()=>{

        console.log("music blocked");

    });

}

// ===============================
// START GAME
// ===============================

function startGame(){

    playMusic();

    document
    .getElementById("home")
    .classList
    .add("hidden");

    document
    .getElementById("game")
    .classList
    .remove("hidden");

    basket = document.getElementById("basket");

    spawnLove();

}

// ===============================
// LOVE GAME
// ===============================

function spawnLove(){

    if(gameFinished) return;

    const area = document.getElementById("loveArea");

    const love = document.createElement("div");

    love.className = "falling-love";

    love.innerHTML =
    `<img src="18.png">`;

    love.style.left =
    Math.random()*85 + "vw";

    area.appendChild(love);

    const check = setInterval(()=>{

        const loveBox =
        love.getBoundingClientRect();

        const basketBox =
        basket.getBoundingClientRect();

        if(

        loveBox.bottom >= basketBox.top &&

        loveBox.left < basketBox.right &&

        loveBox.right > basketBox.left

        ){

            clearInterval(check);

            love.remove();

            score++;

            document
            .getElementById("count")
            .textContent = score;

            if(score >= 10){

                gameFinished = true;

                area.style.display = "none";

                document
                .getElementById("unlock")
                .classList
                .remove("hidden");

                document
                .getElementById("nextBtn")
                .style.display = "inline-block";

            }

        }

    },30);

    setTimeout(()=>{

        clearInterval(check);

        if(love.parentNode){

            love.remove();

        }

    },5000);

    if(!gameFinished){

        setTimeout(spawnLove,800);

    }

}

// ===============================
// MOVE BASKET
// ===============================

document.addEventListener("touchmove",(e)=>{

    if(
        document.getElementById("game").classList.contains("hidden")
    ) return;

    if(!basket || gameFinished) return;

    e.preventDefault();

    let x = e.touches[0].clientX;

    const half = basket.offsetWidth / 2;

    if(x < half) x = half;
    if(x > window.innerWidth-half)
        x = window.innerWidth-half;

    basket.style.left = x+"px";

},{passive:false});

// ===============================
// OPEN LETTER
// ===============================

function openLetter(){

    document
    .getElementById("game")
    .classList
    .add("hidden");

    document
    .getElementById("letter")
    .classList
    .remove("hidden");

    document
    .getElementById("letterText")
    .innerHTML = "";

    typeLetter();

}

// ===============================
// LETTER MESSAGE
// ===============================

const message = `selamat mengulang tanggal 2 yang pertama,

honestly.. i still can't believe how fast time flies. rasanya baru kemarin kita mulai kenal lebih dekat, ternyata sekarang udah satu bulan aja.

thank you for coming into my life, idk if you realize it or not, but you've made my days a lot better just by being here. bahkan hal hal sesimpel ngobrol sama kamu, becanda random, atau cuma saling update hari aja udah cukup bikin hari aku terasa beda :>

ik one month isn't a long time, we're still figuring each other out, masih banyak hal yang bakal kita pelajarin bareng. mungkin nanti bakal ada hari dimana kita cape, beda pendapat, atau misunderstanding. but i hope we never stop choosing to communicate, cause i believe that's what keeps two people together.

i'm not looking for a perfect relationship, cause perfection doesn't exist. what i want is something real, someone who's willing to stay, to understand, and to grow together, even when things don't always go as planned.

thank youu for every little moment we've shared this past month. thank you for making me feel appreciated, cared for, and genuinely happy. i'm really grateful that i get to call you mineeee..

here's to our first month, and hopefully to many more months, more memories, and more "tanggal 2" that we get to celebrate together.

i'm really glad it's you, always..`;

// ===============================
// TYPEWRITER
// ===============================

function typeLetter(){

    let i = 0;

    const text =
    document.getElementById("letterText");

    const typing = setInterval(()=>{

        if(message.charAt(i) == "\n"){

            text.innerHTML += "<br>";

        }else{

            text.innerHTML += message.charAt(i);

        }

        i++;
if(i >= message.length){

    clearInterval(typing);

    text.innerHTML = message.replace(/\n/g,"<br>");
    text.style.textAlign = "justify";

    document
        .getElementById("letterNext")
        .classList
        .remove("hidden");
}
    },35);

}

// ===============================
// OPEN LITTLE LETTERS
// ===============================

function openLetters(){

    document
    .getElementById("letter")
    .classList
    .add("hidden");

    document
    .getElementById("lettersGame")
    .classList
    .remove("hidden");

}

// ===============================
// LITTLE LETTERS
// ===============================

const miniLetters =
document.querySelectorAll(".mini-letter");

const littleNotes = [

"sayang, maaf ya kalau belakangan kemarin aku sering hilang hilangan atau tiba tiba slow reply, it's not that i changed, atau aku ga mau ngobrol sama kamu ya, bebee. aku lagi ngerjain ini terus ga lama aku suka ketiduran :>",

"kurang kurangin bahas cowo lain ya, sayang. ik it's nothing serious, but i can't help getting a little jealous :(",

"one thing i like, aku suka kalau kita bisa ngobrol apa aja, even the most random things. somehow, sama kamu selalu ada aja yang bisa di bahas wkwk.. i hope it stays that way, love",

"one thing i've noticed... sekarang dikit dikit aku jadi pengen cerita ke kamu wkwk. entah itu hal penting atau cuman hal random yang tiba tiba kepikiran. somehow, ur always the first person i wanna tell lol",

"i like the way we can just be ourselves around each other. ga perlu jaim atau ga perlu mikir harus ngomong apa. semuanya berasa natural aja, and i really like that about us",

"ik we're still getting to know each other, but everyday i learn something new about you and honestly.. i don't mind spending more time figuring out the rest. so, ceritain aku semua hal hal favorit kamu ya sayang? wkwkwk",

"think one of my favorite things about us is how easy everything feels. ga perlu sesuatu yang besar buat bikin aku senang, sometimes just having you around is already enough asik wkwk",

"idk if you realize it, but ur little morning texts always make me smileee, its such a simple thing, but somehow it became one of the things i look forward to wkwk",

"okayy... now take our memories from the box and hang them on the line"

];

let openedLetters = 0;

miniLetters.forEach(letter=>{

    letter.onclick = function(){

        let id = this.dataset.id;

        document
        .getElementById("popupText")
        .innerHTML = littleNotes[id];

        document
        .getElementById("popup")
        .classList
        .remove("hidden");

        if(!this.classList.contains("opened")){

            this.classList.add("opened");

            openedLetters++;

        }

        if(openedLetters >= 9){

            document
            .getElementById("finishLetters")
            .classList
            .remove("hidden");

        }

    };

});

function closePopup(){

    document
    .getElementById("popup")
    .classList
    .add("hidden");

}

// ===============================
// OPEN MEMORY BOX
// ===============================

function openMemoryBox(){

    document
    .getElementById("lettersGame")
    .classList
    .add("hidden");

    document
    .getElementById("memoryPage")
    .classList
    .remove("hidden");

}

// ===============================
// MEMORY BOX
// ===============================

const photos = document.querySelectorAll(".photo");
const slots = document.querySelectorAll(".slot");

let draggedPhoto = null;
let placedPhotos = 0;

photos.forEach(photo=>{

    photo.addEventListener("touchstart",(e)=>{

        e.preventDefault();

        draggedPhoto = photo;

        photo.style.position = "fixed";
        photo.style.zIndex = "999";
    });

    photo.addEventListener("touchmove",(e)=>{

        if(draggedPhoto !== photo) return;

        e.preventDefault();

        const touch = e.touches[0];

        photo.style.left = (touch.clientX-45)+"px";
        photo.style.top = (touch.clientY-60)+"px";
    });

    photo.addEventListener("touchend",()=>{

        if(draggedPhoto !== photo) return;

        let nearest = null;
        let nearestDistance = Infinity;

        slots.forEach(slot=>{

            if(slot.children.length) return;

            const slotRect = slot.getBoundingClientRect();
            const photoRect = photo.getBoundingClientRect();

            const dx =
            (slotRect.left + slotRect.width/2) -
            (photoRect.left + photoRect.width/2);

            const dy =
            (slotRect.top + slotRect.height/2) -
            (photoRect.top + photoRect.height/2);

            const distance = Math.sqrt(dx*dx + dy*dy);

            if(distance < nearestDistance){
                nearestDistance = distance;
                nearest = slot;
            }

        });

        if(nearest && nearestDistance < 90){

            nearest.appendChild(photo);

            photo.style.position = "";
            photo.style.left = "";
            photo.style.top = "";
            photo.style.zIndex = "";

            placedPhotos++;

            if(placedPhotos >= 6){
                document
                .getElementById("finishMemory")
                .classList
                .remove("hidden");
            }

        }else{

            photo.style.position = "";
            photo.style.left = "";
            photo.style.top = "";
            photo.style.zIndex = "";

        }

        draggedPhoto = null;

    });

});

function openFinal(){

    document
    .getElementById("memoryPage")
    .classList
    .add("hidden");

    document
    .getElementById("finalPage")
    .classList
    .remove("hidden");

}