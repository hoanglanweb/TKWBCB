let sliderIndex = 0;

function moveSlide(n) {
  const slides = document.querySelectorAll(".slide"); // Lấy tất cả các slide
  const sliderContainer = document.querySelector(".col-left_image-slider"); // Lấy phần tử chứa slides
  
  // Cập nhật sliderIndex với số bước di chuyển, đảm bảo không vượt quá phạm vi số slide
  sliderIndex = (sliderIndex + n + slides.length) % slides.length;
  
  const offset = -sliderIndex * 100; // Mỗi slide chiếm 100% chiều rộng

  sliderContainer.style.transform = `translateX(${offset}%)`;
}
setInterval(() => moveSlide(1),3000)