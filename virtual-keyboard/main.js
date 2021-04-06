window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const arena = document.querySelectorAll('.use-keyboard-input');



const Keyboard = {
    elements:{
        main:null,
        keysConteiner:null,
        keys:[],
        audio:null
    },

    eventHandlers:{
        oninput:null,
        onclose:null
    },
    properties:{
        value:'',
        capsLock:false,
        shift:false,
        lang:false,
        audioBtn: true
    },

    init(){
        // create main elements
        this.elements.main = document.createElement('div');
        this.elements.keysConteiner = document.createElement('div');

        //setup main elements
        this.elements.main.classList.add('keyboard', 'keyboard--hidden');
        this.elements.keysConteiner.classList.add('keyboard__keys');
        this.elements.keysConteiner.appendChild(this._createKeys());
        this.elements.audio = document.createElement('audio');
        

        this.elements.keys = this.elements.keysConteiner.querySelectorAll(".keyboard__key");

        //add to DOM
        this.elements.main.appendChild(this.elements.keysConteiner);
        document.body.appendChild(this.elements.main);
        
        
        

        // Automatically use keyboard for elements with .use-keyboard-input
        document.querySelectorAll(".use-keyboard-input").forEach(element => {

            element.addEventListener("focus", (e) => {
                
                this.open(element, currentValue => {
                    element.value = currentValue;
                });
            });
        });
    },

    _createKeys(){
        const fragment = document.createDocumentFragment();
        const keyLayout = [
           '`ё', "1!", "2@", "3#", "4$", "5%", "6^", "7&", "8*", "9(", "0)", "backspace",
            "qй", "wц", "eу", "rк", "tе", "yн", "uг", "iш", "oщ", "pз","[х","]ъ","\\|",
            "caps", "aф", "sы", "dв", "fа", "gп", "hр", "jо", "kл", "lд",";ж", "'э", "enter",
            "volume","done", "zя", "xч", "cс", "vм", "bи", "nт", "mь", ",б", ".ю", "?/",
            "lung", "shift", "space", "keyboard_arrow_left","keyboard_arrow_right","micro"
        ];

        const area = document.querySelectorAll(".use-keyboard-input");
        area[0].selectionStart = area[0].selectionEnd ;
        let sss = area[0].selectionStart;
        //create HTML for an icon
        const createIconHTML = (icon_name) => {
            return `<i class='material-icons'>${icon_name}</i>`;
        };

        
        keyLayout.forEach(key => {
            const keyElement = document.createElement('button');
            const keyElement2 = document.createElement('span');
            const insertLineBreak = ["backspace", "\\|", "enter", "?/"].indexOf(key) !== -1;

            
            

            // Add attributes/classes
            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard__key");
            keyElement2.classList.add("keyboard_key2");

            

            switch (key) {
                case "backspace":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("backspace");
                    
                    keyElement.addEventListener("click", () => {
                        console.log(sss)
                        area[0].focus();
                        this._playAudio();
                        this.properties.value = this.properties.value.substring(0, sss - 1) + this.properties.value.substring(sss, this.properties.value.length);
                        if(sss > 0){sss--};
                        area[0].selectionStart = sss;
                        this._triggerEvent("oninput");
                    });

                    break;
                case "keyboard_arrow_left":
                    keyElement.classList.add("keyboard__key");
                    keyElement.innerHTML = createIconHTML("keyboard_arrow_left");
                    keyElement.addEventListener("click", () => {
                        this._playAudio('keyA');
                        
                        area[0].selectionStart = area[0].selectionEnd -= 1;
                        if(sss > 0 ){ sss-- };
                        area[0].focus()
                        
                    })

                    break;
                case "volume":
                    keyElement.classList.add("keyboard__key");
                    keyElement.innerHTML = createIconHTML("volume_up");
                    keyElement.addEventListener("click", () => {
                        this._playAudio('keyA');
                        this.properties.audioBtn = !this.properties.audioBtn;
                        this.properties.audioBtn ? keyElement.innerHTML = createIconHTML("volume_up") : keyElement.innerHTML = createIconHTML("volume_off");
                        

                    })

                    break;
                case "keyboard_arrow_right":
                    keyElement.classList.add("keyboard__key");
                    keyElement.innerHTML = createIconHTML("keyboard_arrow_right");

                    keyElement.addEventListener("click", () => {
                        this._playAudio('keyA');
                        area[0].selectionStart = area[0].selectionEnd += 1;
                        sss++;
                        area[0].focus();
                    });

                    break;
                case "shift":
                    keyElement.classList.add("keyboard__key--shift", 'keyboard__key--shift--activatable');
                    
                    keyElement.innerHTML = key;

                    keyElement.addEventListener("click", () => {
                        this._playAudio();
                        this._toggleShift();
                        keyElement.classList.toggle("keyboard__key--shift--active", this.properties.shift);
                        keyElement2.classList.toggle('keyboard_key2_activ', this.properties.shift);
                    });

                    break;
                case "caps":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                    keyElement.innerHTML = createIconHTML("keyboard_capslock");

                    keyElement.addEventListener("click", () => {
                        this._playAudio();
                        this._toggleCapsLock();
                        keyElement.classList.toggle("keyboard__key--shift--active", this.properties.capsLock);
                    });

                    break;

                case "enter":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("keyboard_return");
                    sss++;
                    keyElement.addEventListener("click", () => {
                        this._playAudio();
                        this.properties.value += "\n";
                        this._triggerEvent("oninput");
                    });

                    break;
                    
                case "micro":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("settings_voice");
                    
                    keyElement.addEventListener("click", () => {
                        area[0].focus();
                        this._playAudio();
                        keyElement.classList.add("keyboard_key2_activ");
                        setTimeout(function(){
                            keyElement.classList.remove("keyboard_key2_activ");
                        }, 3000)
                        console.log(keyElement.classList);
                        
                        
                        this._records(this.properties.lang);
                        this._triggerEvent("oninput");
                    });

                    break;
                case "space":
                    keyElement.classList.add("keyboard__key--extra-wide");
                    keyElement.innerHTML = createIconHTML("space_bar");
                    sss++;
                    keyElement.addEventListener("click", () => {
                        area[0].selectionStart = area[0].selectionEnd += 1;
                        this.properties.value += " ";
                        this._playAudio();
                        this._triggerEvent("oninput");

                    });

                    break;

                case "done":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
                    keyElement.innerHTML = createIconHTML("check_circle");

                    keyElement.addEventListener("click", () => {
                        this.close();
                        this._triggerEvent("onclose");
                    });

                    break;
                case "lung":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key");
                    keyElement.innerHTML = createIconHTML("language");
                    keyElement2.textContent = 'en';
                    keyElement.addEventListener("click", () => {
                        this._toggleLang();
                        this._playAudio();
                    });

                    break;
                default:
                    
                        keyElement.textContent = key[0].toLowerCase();
                        keyElement2.textContent = key[1];
                    
                    keyElement.addEventListener("click", () => {
                        console.log(this.elements.audio);
                        //this.elements.audio.play();
                        this._playAudio('keyA');
                        sss++;
                        area[0].focus();
                        
                        //если английский включен
                        if(this.properties.lang){
                            if (!!Number(key[0]) || Number(key[0]) === 0){
                                if (this.properties.shift){
                                    this.properties.value += key[1].toLowerCase();
                                }else{
                                    this.properties.value += key[0].toLowerCase();
                                }
                            }else{
                                if(this.properties.shift && this.properties.capsLock){
                                    this.properties.value += key[1].toLowerCase();
                                }else if (this.properties.shift || this.properties.capsLock){
                                    this.properties.value += key[1].toUpperCase();
                                }
                                else {
                                    this.properties.value += key[1].toLowerCase();
                                }
                            }
                                
                        }
                        // англ выключен
                        else{
                            if (!!Number(key[0]) || Number(key[0]) === 0) {
                                if (this.properties.shift) {
                                    this.properties.value += key[1].toLowerCase();
                                } else {
                                    this.properties.value += key[0].toLowerCase();
                                }
                            }else{
                                if (this.properties.shift && this.properties.capsLock) {
                                    this.properties.value += key[0].toLowerCase();
                                } else if (this.properties.shift || this.properties.capsLock) {
                                    this.properties.value += key[0].toUpperCase();
                                }
                                else {
                                    this.properties.value += key[0].toLowerCase();
                                }
                            }
                        }
                       
                        console.log(this.elements.main);
                        //this.properties.value += key[0].toLowerCase();
                        
                     this._triggerEvent("oninput");
                    });

                    break;
            }

            fragment.appendChild(keyElement);
            keyElement.appendChild(keyElement2);

            if (insertLineBreak) {
                fragment.appendChild(document.createElement("br"));
            }
            
        });
        return fragment;
    },

    _triggerEvent(handlerName){
        if (typeof this.eventHandlers[handlerName] == "function") {
            console.log(handlerName);
            this.eventHandlers[handlerName](this.properties.value);
        }
    },
    _records(arg){
        const recognition = new SpeechRecognition();
        recognition.interimResults = true;
        console.log(this.elements.keys);
        if(arg){
            recognition.lang = 'ru';
        }else{
            recognition.lang = 'en';
        }
        
        let r;
        recognition.addEventListener('result', function (e) {

        r = Array.from(e.results).map(result => result[0])
                .map(result => result.transcript).join('')
            arena[0].value = r;
            
        })
        recognition.start();
        
    },
    _toggleCapsLock(){
        this.properties.capsLock = !this.properties.capsLock;
    },

    _toggleShift(){
        this.properties.shift = !this.properties.shift;

        for (const key of this.elements.keys){
            if (key.childNodes[0].nodeValue === '0' || !!Number(key.childNodes[0].nodeValue)){
                key.childNodes[1].classList.toggle('keyboard_key2_activ' , this.properties.shift)
    
            }
        }
        
    },
    _toggleLang(){
        this.properties.lang = !this.properties.lang;
        this.elements.keys[49].children[0].classList.toggle('langColor', this.properties.lang);
        this.elements.keys[49].childNodes[1].classList.toggle('langColor', this.properties.lang);
        this.elements.keys[49].childNodes[1].innerHTML = this.properties.lang? 'ru': "en";
        for (const key of this.elements.keys) {
            if(key.childNodes[0].nodeValue !== null){
                if (key.childNodes[0].nodeValue !== '0' && !Number(key.childNodes[0].nodeValue)) {
                    key.childNodes[1].classList.toggle('keyboard_key2_activ', this.properties.lang)
                    
                }
            
            }
            
    }
    },

    open(initialValue, oninput, onclose){
        this.properties.value = initialValue.value || "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.remove("keyboard--hidden");
        console.log(initialValue)
        initialValue.focus();

    },
    close(){
        this.properties.value = "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.add("keyboard--hidden");
    },
    _playAudio(a){
        if(this.properties.audioBtn){
        if(a === 'keyA'){
            this.elements.audio.setAttribute('src', './assets/sound/tink.wav');
            this.elements.audio.play();
        }
        else{
            this.elements.audio.setAttribute('src', './assets/sound/boom.wav');
            this.elements.audio.play();
        }
    }else return;
        //console.log(this.elements.audio);
        
    }

};



window.addEventListener('DOMContentLoaded' , function(){
    Keyboard.init();
})