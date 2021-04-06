const Puzzle = {
    elements:{
        arena: null,
        arenaGame:null,
        audioBtn:null,
        audioBool:false,
        cellSize: 100,
        backgroundArena: ['./img/1.jpg', './img/10.jpg', './img/11.jpg', './img/100.jpg', './img/103.jpg', './img/104.jpg', './img/106.jpg', './img/107.jpg', './img/108.jpg', './img/109.jpg', './img/110.jpg', './img/111.jpg', './img/112.jpg'],
        backgroundArenaPos:0,
        timer:null,
        progressTablo:null,
        progress:0,
        arenaCeilBtn:null,
        arenaCeil: 4,
        selectImg:null,
        init:0,
        startDate : null,
        clocktimer : null,
        score: [{move:5,
                time:103},
            {
                move: 8,
                time: 88
            },
            {
                move: 8,
                time: 88
            },
            {
                move: 3,
                time: 564
            }],
        scoreTablo:null,
        puzzleZero:{
            value: 0,
            top:0,
            left:0
        },
        cells:[]
    },
    
    
    init(){
   
        this.elements.arena = document.createElement('div');
        this.elements.arena.classList.add('arena');

        this.elements.panelControl = document.createElement('div');
        this.elements.selectImg = document.createElement('div');
        this.elements.panelControl.classList.add('panel')
        // кнопка старт
        const elemBtnStart = document.createElement('div');
        elemBtnStart.classList.add('btn-start');
        elemBtnStart.innerText = 'старт';

        // таймер
        const elemTimer = document.createElement('div');
        this.elements.timer = elemTimer;
        elemTimer.innerText = 'время: 00: 00';

        const openScore = document.createElement('div');
        openScore.innerHTML = 'рекорды';
        openScore.classList.add('score-open');
        let recOpen = false;
        openScore.addEventListener('click', function(){
            recOpen = !recOpen;
            if (recOpen){
                elemScore.style.display = 'flex';
            }
            else{
                elemScore.style.display = 'none';
            }
        })

        const elemScore = document.createElement('div');
        this.elements.scoreTablo = elemScore;
        elemScore.classList.add('score');

        // audio
        const audioElem = document.createElement('audio');
        const audioElemBtn = document.createElement('div');
        this.elements.audioBtn = audioElem;
        audioElemBtn.addEventListener('click', this.audioPlay.bind(this))
        audioElemBtn.innerText = 'звук';

        const elemSize = document.createElement('div');
        this.elements.arenaCeilBtn = elemSize;
        elemSize.addEventListener('click', this.arenaSizeFn.bind(this));
        elemSize.innerText = `${this.elements.arenaCeil} x ${this.elements.arenaCeil}`;

        const elemProgressTablo = document.createElement('div');
        this.elements.progressTablo = elemProgressTablo;
        this.elements.progressTablo.innerText = 'ходы: 0'

        const elemBtnImg = document.createElement('div');
        const elemImgRight = document.createElement('div');
        const elemImgLeft = document.createElement('div');
        elemBtnImg.classList.add('btn-img');
        elemImgRight.classList.add('btn-img-right');
        elemImgLeft.classList.add('btn-img-left');
        elemBtnImg.append(elemImgRight, elemImgLeft)

        elemBtnImg.style.backgroundImage = `url(${this.elements.backgroundArena[this.elements.backgroundArenaPos]})`

        elemImgRight.addEventListener('click', this.backgClick.bind(this))
        elemImgLeft.addEventListener('click', this.backgClick.bind(this))

        this.elements.arenaGame = document.createElement('div');
        this.elements.arenaGame.classList.add('arenaGame400');
        document.body.append(this.elements.arena);
        this.elements.arena.append(this.elements.panelControl, this.elements.arenaGame, elemScore);
        this.elements.panelControl.append(elemBtnStart, openScore, elemBtnImg, audioElemBtn, elemSize, elemProgressTablo, elemTimer);
        this.elements.cells.push(this.elements.puzzleZero)
        
        elemBtnStart.addEventListener('click', this.start.bind(this));

        this.elements.cellSize = this.elements.arenaGame.offsetWidth / this.elements.arenaCeil;
        this.scoreTablo()
    },
    backgClick(e){
     
        if (e.target.className === 'btn-img-right'){
            this.elements.backgroundArenaPos = (this.elements.backgroundArenaPos + 1) % this.elements.backgroundArena.length;
        }else {
            this.elements.backgroundArenaPos = (this.elements.backgroundArenaPos + this.elements.backgroundArena.length - 1) % this.elements.backgroundArena.length;
        }
        
        e.srcElement.offsetParent.style.backgroundImage = `url(${this.elements.backgroundArena[this.elements.backgroundArenaPos]})`
    },
    audioPlay(){
        this.elements.audioBool = !this.elements.audioBool;
    },
    arenaSizeFn(){
        this.elements.arenaCeil = (this.elements.arenaCeil + 1) % 9;
        if (this.elements.arenaCeil < 3){
            this.elements.arenaCeil = 3;
        }
        this.elements.arenaCeilBtn.innerText = `${this.elements.arenaCeil} x ${this.elements.arenaCeil}`;
    },
    createPuzzle(backgraundPos){
        function numbTrue(a) {
            for (let kDisorder = 0, i = 1, len = a.length - 1; i < len; i++){
                for (let j = i - 1; j >= 0; j--) if (a[j] > a[i]) {
                    kDisorder++;  
                }
           
                return !(kDisorder % 2);
            }
        }

        let numbers = [...Array(((this.elements.arenaCeil * this.elements.arenaCeil) - 1)).keys()]
            .sort(() => Math.random() - 0.5);
        numbTrue(numbers);
        if(!numbTrue(numbers)){
            
            numbers = [...Array(((this.elements.arenaCeil * this.elements.arenaCeil) - 1)).keys()]
                .sort(() => Math.random() - 0.5);
        }
        
        for (let i = 1; i <= ((this.elements.arenaCeil * this.elements.arenaCeil) - 1) ; i++){
            
            const div = document.createElement('div');
            const value = numbers[i - 1] + 1;
            div.classList.add('onePuzle');
            div.style.backgroundImage = `url(${this.elements.backgroundArena[backgraundPos]})`;
            this.elements.arenaGame.append(div);
            div.style.backgroundSize = `${this.elements.arenaCeil * this.elements.cellSize}px`;
            div.innerHTML = `${value}`;
            const left = i % this.elements.arenaCeil;
            const top = (i - left) / this.elements.arenaCeil;
            div.style.top = `${top * this.elements.cellSize}px`;
            div.style.left = `${left * this.elements.cellSize}px`;
            let s = this;
            
            const backLeft = (numbers[i - 1] + 1) % this.elements.arenaCeil;
            const backTop = ((numbers[i - 1] + 1) - backLeft) / this.elements.arenaCeil;


            this.elements.cells.push({
                value: value,
                top:top,
                left:left,
                elem: div,
            });
            
            div.style.backgroundPositionX = `${-(backLeft * this.elements.cellSize)}px`;
            div.style.backgroundPositionY = `${-(backTop * this.elements.cellSize)}px`;
            
            
            div.addEventListener('mousedown' , function(e){
                s.dragNdrop(i)
                //s._move(i);
            })
            

        }

    },
    
    start(){
        let that = this;
        function trim(string) { return string.replace(/\s+/g, " ").replace(/(^\s*)|(\s*)$/g, ''); }

        
        this.elements.init = 0;
        this.elements.progress = 0;
        this.elements.progressTablo.innerText = `ходы: 0`;
        clearTimeout(this.elements.clocktimer);

        this.elements.timer.innerText = 'время: 00:00';
        
        function startTIME() {
            var thisDate = new Date();
            var t = thisDate.getTime() - that.elements.startDate.getTime();
            var ms = t % 1000; t -= ms; ms = Math.floor(ms / 10);
            t = Math.floor(t / 1000);
            var s = t % 60; t -= s;
            t = Math.floor(t / 60);
            var m = t % 60; t -= m;
            t = Math.floor(t / 60);
           
            if (m < 10) m = '0' + m;
            if (s < 10) s = '0' + s;
            
            if (that.elements.init == 1) that.elements.timer.innerText = `время: ${m}:${s}`;
            that.elements.clocktimer = setTimeout(startTIME, 1000);
        }
        function findTIME() {
            if (that.elements.init == 0) {
                that.elements.startDate = new Date();
                startTIME();
                that.elements.init = 1;
            }
            else {
                var str = trim(that.elements.timer.innerText);
                that.elements.timer.innerText = `wtf${str}`;   
                clearFields();
            }

        }
        findTIME();

        this.elements.arenaGame.innerHTML = ''; 
        
        this.elements.arenaGame.className = `arenaGame${this.elements.arenaCeil}00`;
        this.elements.cells = [];
        this.elements.puzzleZero.left = 0;
        this.elements.puzzleZero.top = 0;
        this.elements.cells.push(this.elements.puzzleZero);
        this.elements.cellSize = this.elements.arenaGame.offsetWidth / this.elements.arenaCeil;
        this.createPuzzle(this.elements.backgroundArenaPos, this.elements.arenaCeil);
    },
    dragNdrop(ind){
        const cellDrop = this.elements.cells[ind];
        let that = this;
        const leftDivDrop = Math.abs(this.elements.puzzleZero.left - cellDrop.left);
        const topDivDrop = Math.abs(this.elements.puzzleZero.top - cellDrop.top);

        if (leftDivDrop + topDivDrop > 1) {
            cellDrop.elem.setAttribute('draggable', false);
            return
        }

        cellDrop.elem.setAttribute('draggable', true);
        const dragStart = function(){
            
            setTimeout(() => {
                this.classList.add('hide');
            },0) 
            
        }
        const dragEnd = function () {       
            if (that.elements.audioBool) {
                that.elements.audioBtn.setAttribute('src', './saund/tink.wav');
                that.elements.audioBtn.play();
            }     
            this.classList.remove('hide');
        }

        cellDrop.elem.style.top = `${this.elements.puzzleZero.top * this.elements.cellSize}px`;
        cellDrop.elem.style.left = `${this.elements.puzzleZero.left * this.elements.cellSize}px`;

        const emptyLeftDrop = this.elements.puzzleZero.left;
        const emptyTopDrop = this.elements.puzzleZero.top;

        this.elements.puzzleZero.left = cellDrop.left;
        this.elements.puzzleZero.top = cellDrop.top;

        cellDrop.left = emptyLeftDrop;
        cellDrop.top = emptyTopDrop;

        cellDrop.elem.addEventListener('dragstart', dragStart);

        cellDrop.elem.addEventListener('dragend', dragEnd)
        

        const isFinish = this.elements.cells.every(cellDrop => {
            return cellDrop.value === cellDrop.top * this.elements.arenaCeil + cellDrop.left;
        })
        
        if (isFinish) {
            this.elements.score.push({ 'move': Number(this.elements.progressTablo.innerText.replace(/\D+/g, '')),
                'time': Number(this.elements.timer.innerText.replace(/\D+/g, ''))})
            alert(`победа - ${this.elements.progressTablo.innerText} ${this.elements.timer.innerText}`)
            
            
            this.elements.scoreTablo.innerHTML = '';
            this.scoreTablo();
        }
        
        this.elements.progress++;
        this.elements.progressTablo.innerText = `ходы: ${this.elements.progress}`;
        
        cellDrop.elem.addEventListener('mouseup',function(){
            if (that.elements.audioBool) {
            that.elements.audioBtn.setAttribute('src', './saund/tink.wav');
            that.elements.audioBtn.play();
        }
        })
    },
    scoreTablo(){ 
        localStorage.setItem('score', JSON.stringify(this.elements.score));
        let scoreStor = JSON.parse(localStorage.getItem('score'));

        
        scoreStor.sort((a, b) => { return a.move - b.move })
        for (let i = 0; i < scoreStor.length;i++){
            const spanScore = document.createElement('div');
            spanScore.innerHTML = `${i + 1}. ходов - ${scoreStor[i].move}, время - ${scoreStor[i].time}`;
            this.elements.scoreTablo.append(spanScore)
        }
        


    }
}

window.addEventListener("DOMContentLoaded", function(){
    Puzzle.init();
})
