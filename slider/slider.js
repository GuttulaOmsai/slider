const wrapper = document.querySelector(".wrapper");
const carousal = document.querySelector(".carousal");
const arrowBts = document.querySelectorAll(".wrapper i");
const firstCardWidth = carousal.querySelector(".card").offsetWidth;
const carousalChildren =[...carousal.children];


 let isDragging = false;
 let startX; 
 let startScrollingLeft; 
 let timeoutId;

let cardPerView = Math.round(carousal.offsetWidth/ firstCardWidth);

carousalChildren.slice(-cardPerView).reverse().forEach(card => {
  carousal.insertAdjacentHTML("afterbegin", card.outerHTML);
});
carousalChildren.slice(0,cardPerView).forEach(card => {
  carousal.insertAdjacentHTML("beforeend", card.outerHTML);
});

arrowBts.forEach((btn) => {
  btn.addEventListener("click", () => {
    const scrollDistance = btn.id === "left" ? -firstCardWidth : firstCardWidth;
    carousal.scrollLeft += scrollDistance;
  });
});

const dragStart = (e) => {
  isDragging = true;
  carousal.classList.add("dragging");
  startX = e.pageX;
  startScrollingLeft = carousal.scrollLeft;
};

const dragging = (e) => {
  if (!isDragging) return;
  const mouseX = e.pageX;
  const scrollAmount = (mouseX - startX) * 2; 
  carousal.scrollLeft = startScrollingLeft - scrollAmount;
};

const dragStop = () => {
  isDragging = false;
  carousal.classList.remove("dragging");
}
const autoPlay= () =>{
  if(window.innerWidth < 800 )return;
  timeoutId = setTimeout(()=> carousal.scrollLeft += firstCardWidth, 2500);

}
autoPlay();
const infiniteScroll = () => {
  if(carousal.scrollLeft === 0) {
      carousal.classList.add("no-transition");
      carousal.scrollLeft=carousal.scrollWidth - (2 * carousal.offsetWidth );
      carousal.classList.remove("no-transition");
    

  } 
  else if(Math.ceil(carousal.scrollLeft) === carousal.scrollWidth - carousal.offsetWidth) {
       carousal.classList.add("no-transition");
       carousal.scrollLeft = carousal.offsetWidth;
       carousal.classList.remove("no-transition");
  }

  clearTimeout(timeoutId);
  if(!wrapper.matches(":hover")) autoPlay();
}
carousal.addEventListener("mousedown", dragStart);
carousal.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousal.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", infiniteScroll);
wrapper.addEventListener("mouseleave", autoPlay);
