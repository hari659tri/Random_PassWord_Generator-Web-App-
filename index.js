const inputSlider=document.querySelector("[slider]"); //fetching using the coustom attributes [] used square brackets
const lengthDisplay=document.querySelector("[data-lengthNumber]");
const passwordDisplay=document.querySelector("[displayed]");
const copyMsg=document.querySelector(".copymsg");
const copyBtn=document.querySelector("[data-copy]");
const uppercaseCheck=document.querySelector('#uppercase');
const lowercaseCheck=document.querySelector("#lowercase");
const numberCheck=document.querySelector("#number");
const symbolCheck=document.querySelector("#symbols");
const indicator=document.querySelector("[data-indicator]");
const generateBtn=document.querySelector(".genrateBtn");
const allCheckBox=document.querySelectorAll("input[type=checkbox]");
const symbols="#$!@&.(_+^=?/*-.\''~`%}{{@#$%^&*()}{(})][[]}(<#><>,>.=+"

// initial condition
 let password="";
 let passwordLength=10;
 let checkCount=0;
 handleSlider();
// set strength of a color's
setindicator("#ccc");
// set password length

 function handleSlider(){
    inputSlider.value=passwordLength;
    lengthDisplay.innerText=passwordLength;
    const min = inputSlider.min;
    const max = inputSlider.max;
     inputSlider.style.backgroundSize = ( (passwordLength - min)*100/(max - min)) + "% 100%"
 }
 
 function setindicator(color){
    indicator.style.backgroundColor = color;
    //shadow - HW
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
 }

 function getRandomInteger(min,max){
   return Math.floor((Math.random()*(max-min))+min);
 }

function getRandomNumber(){
    return getRandomInteger(0,10);
}

function getRandomUpperCase(){
    return String.fromCharCode(getRandomInteger(65,91));
}


function getRandomLowerCase(){
    return String.fromCharCode(getRandomInteger(97,123));
}

function getRandomSymbol(){
    const idx=getRandomInteger(0,symbols.length);
    return symbols.charAt(idx);
}

function calcStrength(){
    let isUpper=false;
    let isLower=false;
    let isNumber=false;
    let isSymbol=false;
    if(uppercaseCheck.checked) isUpper=true;
    if(lowercaseCheck.checked) isLower=true;
    if(numberCheck.checked) isNumber=true;
    if(symbolCheck.checked) isSymbol=true;
     
    if(isUpper&&isLower&&(isNumber||isSymbol)&&passwordLength>=8){
        setindicator("#0f0");
    }
    else if((isLower ||isUpper) &&
    (isNumber || isSymbol) &&
    passwordLength >= 6){
        setindicator("#ff0");
    }
    else{
        setindicator("#f00");
    }
}


async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText="copied";

    }
    catch(e){
        copyMsg.innerText="failed";
    }
    
    // write or add in dom list css code show that copy wala span visible ho sake 
    copyMsg.classList.add("active");
    
    // used the set time out to remove or invisible the span after the time active is a css class
    
        setTimeout(()=>{
          copyMsg.classList.remove("active");
        },1700);

}
 /// adding event listner to the check box type is change of the event
 function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

 function handleCheckBoxChange(){
    checkCount=0;
    allCheckBox.forEach( (checkbox) => {
        if(checkbox.checked)
            checkCount++;
    });
     //special condition
        if(passwordLength < checkCount ) {
            passwordLength = checkCount;
            handleSlider();  // whenever passeword length changed then you have a need to call the handleslider()
        }
 }


 allCheckBox.forEach( (checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
 });


 inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider();
})
 
copyBtn.addEventListener('click', () => {
    if(passwordDisplay.value)
        copyContent();
})

//genratebtn code main logic is here 
 
generateBtn.addEventListener('click', () => {
    //none of the checkbox are selected

    if(checkCount == 0) 
        return;

    if(passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }

    // let's start the jouney to find new password
    console.log("Starting the Journey");
    //remove old password
    password = "";

    //let's put the stuff mentioned by checkboxes

    // if(uppercaseCheck.checked) {
    //     password += generateUpperCase();
    // }

    // if(lowercaseCheck.checked) {
    //     password += generateLowerCase();
    // }

    // if(numbersCheck.checked) {
    //     password += generateRandomNumber();
    // }

    // if(symbolsCheck.checked) {
    //     password += generateSymbol();
    // }

    let funcArr = [];

    if(uppercaseCheck.checked)
        funcArr.push(getRandomUpperCase);

    if(lowercaseCheck.checked)
        funcArr.push(getRandomLowerCase);

    if(numberCheck.checked)
        funcArr.push(getRandomNumber);

    if(symbolCheck.checked)
        funcArr.push(getRandomSymbol);

    //compulsory addition
    for(let i=0; i<funcArr.length; i++) {
        password += funcArr[i]();
    }
    console.log("COmpulsory adddition done");

    //remaining adddition
    for(let i=0; i<passwordLength-funcArr.length; i++) {
        let randIndex = getRandomInteger(0 , funcArr.length);
        console.log("randIndex" + randIndex);
        password += funcArr[randIndex]();
    }
    console.log("Remaining adddition done");
    //shuffle the password
    password = shufflePassword(Array.from(password));
    console.log("Shuffling done");
    //show in UI
    passwordDisplay.value = password;
    console.log("UI adddition done");
    //calculate strength
    calcStrength();
});


function resetPassword(){
    passwordDisplay.value="";
    setindicator("#ccc");
    allCheckBox.forEach((checkbox) => {
        checkbox.checked = false;
    });
    checkCount = 0;
    passwordLength=10;

    handleSlider();
}


















