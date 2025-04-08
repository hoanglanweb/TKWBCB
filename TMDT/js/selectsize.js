document.addEventListener('DOMContentLoaded', function() {
    // Lấy tất cả các phần tử kích thước
    const sizes = document.querySelectorAll(".product-layout_sizeContent .size");
  
    // Lấy phần tử hiển thị kích thước đã chọn
    const selectedSize = document.getElementById("selected-size");
  
    sizes.forEach((size) => {
      size.addEventListener("click", (event) => {
        // Loại bỏ class 'selected' khỏi tất cả các phần tử
        sizes.forEach((s) => s.classList.remove("selected"));
  
        // Lấy phần tử kích thước được click
        const clickedSize = event.target;
  
        // Thêm class 'selected' cho phần tử đã click
        clickedSize.classList.add("selected");
  
        // Cập nhật thông tin kích thước đã chọn
        selectedSize.textContent = `Kích thước đã chọn: ${clickedSize.textContent}`;
      });
    });
  });
  