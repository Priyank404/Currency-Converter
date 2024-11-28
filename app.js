const dropdowns=document.querySelectorAll(".dropdown select");
const button=document.querySelector("form button");
const baseURl=" https://v6.exchangerate-api.com/v6/12957ff3917aa7c27e287849/latest";
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");

for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name ==="from" && currCode ==="USD"){
            newOption.selected=true;
        }else if(select.name==="to" && currCode==="INR"){
            newOption.selected=true;
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}

const updateFlag =(element)=>{
    let currCode=element.value;
    let contrycode=countryList[currCode];
    let newS=`https://flagsapi.com/${contrycode}/shiny/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newS;
};
 
button.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    updatgeExchangeRate();
});

const updatgeExchangeRate=async ()=>{
    let amount=document.querySelector(".amount input");
    amtVal=amount.value;
    if(amtVal===""||amtVal<1){
        amtVal=1;
        amount.value="1";
    }

     const URL=`${baseURl}/${fromCurr.value}`;
     fetch(URL).then(response => response.json()).then(result=>{
         let exchangerate=result.conversion_rates[toCurr.value]
        
     let finalAmount=amtVal*exchangerate;
     msg.innerText=`${amtVal} ${fromCurr.value}= ${finalAmount} ${toCurr.value}`;
    });
}


window.addEventListener("load",()=>{
    updatgeExchangeRate();
})