let hasStarted=false;

document.querySelector(".myWrong").innerText=("0");

let startButton=document.querySelector(".startButton");



let prom="";
async function getJoke()
{
    let js= await axios.get("https://v2.jokeapi.dev/joke/Any");
    //console.log(js.data.joke);
    if(js.data.joke===undefined)
    {
        prom= "Being a self-taught developer is almost the same as being a cut neck chicken because you have no sense of direction in the beginning.";
    }
    else{
        prom=js.data.joke;
    }
}
async function go()
{

    if(hasStarted===true)
    {
        
        let wrongCount=0;
        document.querySelector(".item").innerText="";
        let s="Hello World!!!";
        getJoke();
        
        setTimeout(function(){
            s=prom;
            s = s.replace(/(\r\n|\n|\r)/gm, " ");
            let len=s.length;
            let index=0;
            let allSpans=[];
            for(let i=0;i<len;i++)
            {
                let span=document.createElement("SPAN");
                span.innerText=s[i];
                //console.log(s.charCodeAt(i));
                span.classList.add("upcoming");
                allSpans.push(span);
                document.querySelector(".item").appendChild(span);
            }
                let start=0;
                allSpans[0].classList.remove('upcoming');
                allSpans[0].classList.add('present');
                
                document.addEventListener('keypress',function (e){
                    let key=e.key;
                    if(index==len)
                    {
                        hasStarted=false;
                        startButton.disabled=false;
                        return;
                    }
                    else
                    {
                        startButton.disabled=true;
                    }

                    if(key===allSpans[index].innerText)
                    {
                        if(index===0)start= new Date().getTime();
                        allSpans[index].classList.remove('present');
                        allSpans[index].classList.add('success');
                        if(index+1<len)
                        {
                            allSpans[index+1].classList.remove('upcoming');
                            allSpans[index+1].classList.add('present');
                        }
                    }
                    else
                    {
                        if(index===0)start = new Date().getTime();
                        allSpans[index].classList.remove('present');
                        allSpans[index].classList.add('wrong');
                        wrongCount++;
                        let wrongSound=new Audio("kick-bass.mp3");
                        wrongSound.play();
                        document.querySelector(".myWrong").innerText=`${wrongCount}`;
                        if(index+1<len)
                        {
                            allSpans[index+1].classList.remove('upcoming');
                            allSpans[index+1].classList.add('present');
                        }
                    }
                    index++;
                    if(index===len)
                    {
                        hasStarted=false;
                        startButton.disabled=false;

                        var end = new Date().getTime();
                        var time = end - start;
                        let totalTime=Math.floor(time/1000);
                        let endSound=new Audio("crash.mp3");
                        endSound.play();

                        document.querySelector(".Result").innerText=`You Did it in ${totalTime} seconds, with ${wrongCount} mistakes.`;
                        
                        return;
                    }
                    else
                    {
                        startButton.disabled=true;
                    }
                });
                if(index==len)
                    {
                        hasStarted=false;
                        startButton.disabled=false;
                        return;

                    }
            
        },5000);
    }
    else
    {
        return;
    }
}

startButton.addEventListener('click',start);

function start()
{
    prom="";
    document.querySelector(".myWrong").innerText=(" 0");
    document.querySelector(".Result").innerText=("");
    hasStarted=true;
    startButton.disabled=true;

    //set mistake 0 and showTable="";
    go();

}