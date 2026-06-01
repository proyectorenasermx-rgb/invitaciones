/* ===================
   Carrusel
=================== */

const slides = document.querySelectorAll(".slide");

let current = 0;

function showSlide(index){

    slides.forEach(slide=>{
        slide.classList.remove("active");
    });

    slides[index].classList.add("active");
}

document.querySelector(".next").addEventListener("click",()=>{

    current++;

    if(current >= slides.length){
        current = 0;
    }

    showSlide(current);

});

document.querySelector(".prev").addEventListener("click",()=>{

    current--;

    if(current < 0){
        current = slides.length - 1;
    }

    showSlide(current);

});

setInterval(()=>{

    current++;

    if(current >= slides.length){
        current = 0;
    }

    showSlide(current);

},5000);


/* ===================
   Luciérnagas
=================== */

const container =
document.getElementById("fireflies");

for(let i=0;i<35;i++){

    const firefly =
    document.createElement("div");

    firefly.classList.add("firefly");

    firefly.style.left =
    Math.random()*100+"vw";

    firefly.style.top =
    Math.random()*100+"vh";

    firefly.style.animationDuration =
    (Math.random()*3+2)+"s";

    container.appendChild(firefly);

    moveFirefly(firefly);
}

function moveFirefly(firefly){

    setInterval(()=>{

        firefly.style.transition =
        "all 8s linear";

        firefly.style.left =
        Math.random()*100+"vw";

        firefly.style.top =
        Math.random()*100+"vh";

    },Math.random()*5000+3000);

}