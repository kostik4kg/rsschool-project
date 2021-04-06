const pets = [
    {
        "name": "Jennifer",
        "img": "../../assets/images/jennifer.png",
        "type": "Dog",
        "breed": "Labrador",
        "description": "Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.",
        "age": "2 months",
        "inoculations": ["none"],
        "diseases": ["none"],
        "parasites": ["none"]
    },
    {
        "name": "Sophia",
        "img": "../../assets/images/sophia.png",
        "type": "Dog",
        "breed": "Shih tzu",
        "description": "Sophia here and I'm looking for my forever home to live out the best years of my life. I am full of energy. Everyday I'm learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.",
        "age": "1 month",
        "inoculations": ["parvovirus"],
        "diseases": ["none"],
        "parasites": ["none"]
    },
    {
        "name": "Woody",
        "img": "../../assets/images/woody.png",
        "type": "Dog",
        "breed": "Golden Retriever",
        "description": "Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.",
        "age": "3 years 6 months",
        "inoculations": ["adenovirus", "distemper"],
        "diseases": ["right back leg mobility reduced"],
        "parasites": ["none"]
    },
    {
        "name": "Scarlett",
        "img": "../../assets/images/scarlett.png",
        "type": "Dog",
        "breed": "Jack Russell Terrier",
        "description": "Scarlett is a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.",
        "age": "3 months",
        "inoculations": ["parainfluenza"],
        "diseases": ["none"],
        "parasites": ["none"]
    },
    {
        "name": "Katrine",
        "img": "../../assets/images/katrine.png",
        "type": "Cat",
        "breed": "British Shorthair",
        "description": "Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.",
        "age": "6 months",
        "inoculations": ["panleukopenia"],
        "diseases": ["none"],
        "parasites": ["none"]
    },
    {
        "name": "Timmy",
        "img": "../../assets/images/timmy.png",
        "type": "Cat",
        "breed": "British Shorthair",
        "description": "Timmy is an adorable grey british shorthair male. He loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. Timmy has a lot to say and wants a person to share his thoughts with.",
        "age": "2 years 3 months",
        "inoculations": ["calicivirus", "viral rhinotracheitis"],
        "diseases": ["kidney stones"],
        "parasites": ["none"]
    },
    {
        "name": "Freddie",
        "img": "../../assets/images/freddie.png",
        "type": "Cat",
        "breed": "British Shorthair",
        "description": "Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human’s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home.",
        "age": "2 months",
        "inoculations": ["rabies"],
        "diseases": ["none"],
        "parasites": ["none"]
    },
    {
        "name": "Charly",
        "img": "../../assets/images/charly.png",
        "type": "Dog",
        "breed": "Jack Russell Terrier",
        "description": "This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.",
        "age": "8 years",
        "inoculations": ["bordetella bronchiseptica", "leptospirosis"],
        "diseases": ["deafness", "blindness"],
        "parasites": ["lice", "fleas"]
    }
];

let galeryCard = document.getElementById('base');
let pos = 0;
let card;
//let contrLeft = document.getElementById('controlLeft');
//let contrRight = document.getElementById('controlRight');
for (let i = 0; i < pets.length;i++){
    card = document.createElement('div');
    let img = document.createElement('img');
    let elemA = document.createElement('a');
    let elemH3 = document.createElement('h3');
    img.setAttribute('src', pets[i].img);
    img.setAttribute('alt', pets[i].type);
    elemH3.innerHTML = pets[i].name;
    elemA.innerHTML = 'Learn More';
    card.className = 'galery_card';
    card.append(img);
    card.append(elemH3);
    card.append(elemA);
    card.addEventListener('click', animalCard);  
    galeryCard.append(card);
};

function animalCard(e){
    console.log(e.movementX);
    console.log(this);
    let animName = this.children[1].innerHTML;
    pets.forEach(function(item){
        if(item.name === animName){
            buildPop(item);
        }    
    })
}
let popCart = document.querySelectorAll('.popUp_content');
let popCart2 = document.querySelector('.popUp');
let popUpClose = document.querySelector('.popup_close');
popUpClose.addEventListener('click', function(e){
    popCart2.style.display = 'none';
})
console.log(popCart[0])


function buildPop(aaa){
    
    popCart2.style.display = 'flex';
    
    popCart[0].children[1].setAttribute('src', aaa.img);
    popCart[0].children[2].children[0].innerHTML = aaa.name;
    popCart[0].children[2].children[1].innerHTML = `${aaa.type} - ${aaa.breed}`;
    popCart[0].children[2].children[2].innerHTML = aaa.description;
    popCart[0].children[2].children[3].children[0].innerHTML = `<span><span>Age: </span>${aaa.age}</span>`;
    popCart[0].children[2].children[3].children[1].innerHTML = `<span><span>Inoculations: </span>${aaa.inoculations}</span>`;
    popCart[0].children[2].children[3].children[2].innerHTML = `<span><span>Diseases: </span>${aaa.diseases}</span>`;
    popCart[0].children[2].children[3].children[3].innerHTML = `<span><span>Parasites: </span>${aaa.parasites}</span>`;
    let pop = `<div>

    
                
                </div>`
                console.log(pop)
}
var slider = tns({
    "container": ".my-slider",
    "items": 3,
    "mouseDrag": false,
    "swipeAngle": false,
    "speed": 400,
    "controlsText": ['&#8592;','&#8594;'],
    "nav":false,
    'responsive':{
        1200: {
            'items': 3
        },
        768: {
            'items': 2,
            
        },
        320: {
            'items': 1,
            'edgePadding': 0,
            'gutter': 0,
        }
    }
});
let contrLeft = document.querySelector("#base-ow > div.tns-controls > button:nth-child(1)");
let contrRight = document.querySelector("#base-ow > div.tns-controls > button:nth-child(2)");
contrLeft.setAttribute('id', 'controll-left');
contrRight.setAttribute('id', 'controll-right');
// let galleryAnimal = document.querySelectorAll('.galery_card');
// contrLeft.addEventListener('click',function(e){

//     pos -= 360;
//     console.log(pos);
//     if(pos < -2100){
//         pos =0;
//     }
//     galleryAnimal.forEach(function(item){   
//         item.style.left = `${pos}px`;     
//     })
// });
// contrRight.addEventListener('click', function (e) {
//     console.log('right');
    
//     if (pos > 2100) {
//         pos = 0;
//     }else if(pos < 0){
//         pos += 360;
//     }
//     galleryAnimal.forEach(function (item) {
//         item.style.left = `${pos}px`;
//     })
// })


// burger
let burger = document.querySelector('.burger');
let header = document.querySelector('header');
let ul = document.querySelector('header ul');
header.addEventListener('click', function(e){
    
    if (header.className === '' && e.target.className === 'burger'){
        header.className += 'header_menu_open';
        ul.style.display = 'flex';
        burger.style.transform = 'rotate(90deg)';
    } else if ((e.target.localName === 'header' || e.target.localName === 'div' || e.target.className === 'activ_page') && window.innerWidth <= 768){
        header.className = '';
        header.style.transition = 'width 0.3s';
        ul.style.display = 'none';
        burger.style.transform = 'rotate(0deg)';
    }

    
},false)