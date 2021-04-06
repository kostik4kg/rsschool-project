console.log('i am here');
let petsdog = [];  // 8 elem
let fullPetsList = []; // 48 elem

const request =new XMLHttpRequest();
request.open('GET','./pets.json');


request.onload = () => {
    petsdog = JSON.parse(request.response);
    
    
    fullPetsList = (()=>{
        let tempArr = [];
        for (let i = 0; i < 6; i++) {
            const newPets = petsdog;

            for (let j = petsdog.length; j > 0; j-- ){
                let ranInd = Math.floor((Math.random() * j));
                const rendElement = newPets.splice(ranInd,1)[0];
                newPets.push(rendElement);
            }
            tempArr = [...tempArr, ...newPets]
        }
        return tempArr
    })();

    fullPetsList = sort863(fullPetsList);

    createPets(fullPetsList);
    
    for (let i = 0; i < (fullPetsList.length / 6); i++) {
        const stepList = fullPetsList.slice(i * 6, (i * 6) + 6);

        for (let j = 0; j < 6; j++) {
            stepList.forEach((item, ind) => {
                if(item.name === stepList[j].name && (ind !== j)){
                    document.querySelector("body > div > div.galery_pets > div.galery_pets_conteiner > div.pets_conteiner").children[(i * 6) + j].style.border = '1px solid red';
                }
            })
        }
       
    }
};

const createPets = (petslist) =>{
    const elem = document.querySelector("body > div > div.galery_pets > div.galery_pets_conteiner > div.pets_conteiner");
    elem.innerHTML += createElements(petslist);
}
createElements = (petslist) => {
    let str = '';
    for (let i = 0; i < petslist.length; i++){
        str += `<div class="galery_card" >
                    <div class="galery_card_image">
                        <img src="${petslist[i].img}" alt='${petslist[i].type}'>
                    </div>
                    <h3>${petslist[i].name}</h3>
                    <a href="#">Learn more</a>
                </div>`;
    }
    
    return str;
}
request.send();

const sort863 = (list) => {
    list = recursList(list);
    return list;
}

const recursList = (list) => {
    let length = list.length;
    for (let i = 0; i < (length / 6); i++) {
        const stepList = list.slice(i * 6, (i * 6) + 6);
        for (let j = 0; j < 6; j++) {
            const duplicatedItem = stepList.find((item, ind) => {
                return item.name === stepList[j].name && (ind !== j);
            });

            if (duplicatedItem !== undefined) {
                const ind = (i * 6) + j;
                const which8ofList = Math.trunc(ind / 8);

                const elem = list.splice(ind, 1)[0];
                list.splice(which8ofList * 8, 0, elem);
                recursList(list);
            }

        }

    }
    return list;

}

const prevPage = document.querySelector("#previosPage");
const nextPage = document.querySelector("#nextPage");
const prevStart = document.querySelector("#prevStart");
const nextFinish = document.querySelector("#nextFinish");
const galeryCardTop = document.querySelector('.pets_conteiner');
const countText = document.querySelector("body > div > div.galery_select > ul > li:nth-child(3) > a");
const conteunHeight = document.querySelector("body > div > div.galery_pets > div.galery_pets_conteiner");
let numHeight = conteunHeight.offsetHeight;
console.log(numHeight);
let countPage = 0;
prevStart.addEventListener('click', function(e){
    e.preventDefault();
    countPage = 0;
    prevStart.className = 'inactive_link';
    prevPage.className = 'inactive_link';
    nextPage.className = '';
    nextFinish.className = '';
    galeryCardTop.style.top = `0px`;
    countText.innerText = countPage + 1;
});
nextFinish.addEventListener('click', function (e) {
    e.preventDefault();
    countPage = Math.floor(document.querySelector('.pets_conteiner').offsetHeight / numHeight) -1  ;
    console.log(conteunHeight.offsetHeight);
    prevStart.className = '';
    prevPage.className = '';
    nextPage.className = 'inactive_link';
    nextFinish.className = 'inactive_link';
    galeryCardTop.style.top = `calc(0px - ${numHeight}px * ${Math.floor((document.querySelector('.pets_conteiner').offsetHeight / numHeight )-1 )})`;
    countText.innerText = countPage + 1;
});
prevPage.addEventListener('click', function(e){
    e.preventDefault();
    if(countPage > 0){
        countPage--;
    }
    if (countPage < 1) {
        prevStart.className = 'inactive_link';
        prevPage.className = 'inactive_link';
    }
    if (countPage < (document.querySelector('.pets_conteiner').offsetHeight / numHeight) - 1) {
        nextPage.className = '';
        nextFinish.className = '';
    }
    countText.innerText = countPage+1;
    console.log(countPage);
    galeryCardTop.style.top = `calc(0px - ( ${numHeight}px * ${countPage}))`
    
});

nextPage.addEventListener('click', function (e) {
    e.preventDefault();
    console.log((document.querySelector('.pets_conteiner').offsetHeight / numHeight))
    if (countPage < (document.querySelector('.pets_conteiner').offsetHeight / numHeight )-1 ) {
        countPage++;
        prevStart.className = '';
        prevPage.className = '';
        nextPage.className = '';
        nextFinish.className = '';
    }
    if (countPage > (document.querySelector('.pets_conteiner').offsetHeight / numHeight) -1){
        nextPage.className = 'inactive_link';
        nextFinish.className = 'inactive_link';
    }
    countText.innerText = countPage + 1;
    galeryCardTop.style.top = `calc(0px - (${numHeight}px * ${countPage}))`
    console.log(countPage);
});
