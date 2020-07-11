document.getElementById("modal_link").addEventListener("click", function(event){ // show modal
  event.preventDefault();
  let element, block, arr_1, body, hidden, arr_2;
  body = document.body;
  element = document.getElementById("modal");
  hidden = "body_hidden";
  block = "modal_block";
  arr_1 = element.className.split(" ");
  if (arr_1.indexOf(block) == -1) {
    element.className += " " + block;
  };
  arr_2 = body.className.split(" ");
  if (arr_2.indexOf(hidden) == -1) {
    body.className += " " + hidden;
  };
});

document.getElementById("close").addEventListener("click", function(){ // close modal
  let element = document.getElementById("modal");
  let body = document.body;
  element.className = element.className.replace(/\bmodal_block\b/g, "");
  body.className = body.className.replace(/\bbody_hidden\b/g, "");
});

let slider = new KeenSlider("#my-keen-slider", { // slider
  created: function(instance) {
    let dots_wrapper = document.getElementById("dots");
    let slides = document.querySelectorAll(".keen-slider__slide");
    slides.forEach(function(t, idx) {
      let dot = document.createElement("button");
      dot.classList.add("dot");
      dots_wrapper.appendChild(dot);
      dot.addEventListener("click", function() {
        instance.moveToSlide(idx);
      });
    });
    updateClasses(instance);
  },
  slideChanged(instance) {
    updateClasses(instance);
  }
});

function updateClasses(instance) { // slider dot active
  let slide = instance.details().relativeSlide;
  let dots = document.querySelectorAll(".dot");
  dots.forEach(function(dot, idx) {
    idx === slide
      ? dot.classList.add("dot--active")
      : dot.classList.remove("dot--active");
  });
};

document.getElementById("arrow").addEventListener("click", function(){ // arrow animation
  let aperti_arrow, aperti_conteiner, aperti_content, getHeight, arr, arrow_rotate;
  arrow_rotate = "aperti_arrow_rotate"
  getHeight = document.getElementById("aperti_content").offsetHeight; // height this block
  aperti_arrow = document.getElementById("arrow");
  aperti_conteiner = document.getElementById("aperti_conteiner");
  aperti_content = document.getElementById("aperti_content");
  if (!aperti_arrow.classList.contains("aperti_arrow_rotate")) {
    arr = aperti_arrow.className.split(" ");
    if (arr.indexOf(arrow_rotate) == -1) {
      aperti_arrow.className += " " + arrow_rotate;
    }
    aperti_conteiner.setAttribute("style", "margin-top: "+"-"+getHeight+"px");
    aperti_content.setAttribute("style", "margin-top: "+"-"+getHeight+"px");
  } else if (aperti_arrow.classList.contains("aperti_arrow_rotate")) {
    aperti_arrow.className = aperti_arrow.className.replace(/\baperti_arrow_rotate\b/g, "");
    aperti_conteiner.setAttribute("style", "margin-top: "+"0"+"px");
    aperti_content.setAttribute("style", "margin-top: "+"0"+"px");
  }
});
