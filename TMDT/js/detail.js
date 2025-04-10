document.addEventListener("DOMContentLoaded", () => {
  // hiện thị thôn tin sản phẩm ///
  const urlParams = new URLSearchParams(window.location.search);
  const productIdRaw = urlParams.get("id");
  const productId = productIdRaw ? parseInt(productIdRaw) : null; // dùng để chuyển dạng chuỗi sang thành số nguyên.

  const container = document.getElementById("product-detail");
  const template = document.getElementById("product-template");

  console.log("Product ID:", productId);

  fetch("/TMDT/Data/data.json") // đường dẫn tương đối lấy dữ liệu trong file data.json.
    .then((res) => res.json()) // sau khi lấy phản hồi res => chuyển đổi dữ liêu sang JSON
    .then((data) => {
      const product = data.Nike.find((item) => item.id === productId); // dữ liệu được parse ra => truyền vào dưới dạng callback data.

      if (!product) {
        document.getElementById("product-detail").innerHTML =
          "<p>San pham khong ton tai!</p>";
        return;
      }
      // cloneNode là hàm sao chép một node html , true là sao chép đệ quy bên trong
      // hàm clone sẽ lấy nội dung bên trong template --> sao chép mọi thứ sâu bên trong --> gán biến vào clone.
      // dùng appendchild để hiển thị lên trang html
      const clone = template.content.cloneNode(true);
      const images = product.images || [product.thumbail];

      // Thêm ảnh vào slider-wrapper
      const slider = clone.querySelector("#slider");
      const sliderWrapper = slider.querySelector(".slider-wrapper");

      images.forEach((src, index) => {
        const img = document.createElement("img");
        img.src = src;
        img.className = "slide";
        if (index === 0) img.classList.add("active");
        sliderWrapper.appendChild(img);
      });

      // Hiển thị thông tin sản phẩm
      clone.querySelector(".title").textContent = product.title;
      clone.querySelector(".shoes").textContent = product.Sex;

      // đoạn code thành dùng để hiện thị danh sách size sản phẩm.
      const sizeList = clone.querySelector("#size-list"); // tạo 1 bản sao template html
      product.sizes.forEach((size) => {
        // duyệt qua từng mảng chứa các kích cỡ size , forEach-> lặp qua từng size trong mảng
        const sizeElement = document.createElement("p"); // tạo thẻ mới <p> cho từng size.
        sizeElement.classList.add("size"); // thêm class="size" cho thẻ.
        sizeElement.textContent = size; // hiển thị size trong thẻ <p>
        sizeList.appendChild(sizeElement); // hiển thị thẻ <p> vừa tạo vào bên trong phần tử #size-list
      });

      container.appendChild(clone); // hiện thị ra trang html được truyền vào.

      const sizes = document.querySelectorAll(
        ".product-layout_sizeContent .size" // tạo sự kiện chọn kích thước
      );
      sizes.forEach((size) => {
        size.addEventListener("click", (event) => {
          const clickedSize = event.target;
          if (clickedSize.classList.contains("selected")) {
            clickedSize.classList.remove("selected"); // loại bỏ lớp "selected" khỏi phần tử
          } else {
            sizes.forEach((s) => s.classList.remove("selected"));
            clickedSize.classList.add("selected");
          }
        });
      });

      let current = 0;
      const slides = slider.querySelectorAll(".slide");

      const showSlide = (index) => {
        slides.forEach((slide, i) => {
          slide.classList.remove("active");
          if (i === index) slide.classList.add("active");
        });
      };

      // Nút điều hướng
      container.querySelector(".prev").addEventListener("click", () => {
        current = (current - 1 + slides.length) % slides.length;
        showSlide(current);
      });

      container.querySelector(".next").addEventListener("click", () => {
        current = (current + 1) % slides.length;
        showSlide(current);
      });

      // ✅ Tự động chuyển slide mỗi 3 giây
      setInterval(() => {
        current = (current + 1) % slides.length;
        showSlide(current);
      }, 3000);
    })
    .catch((err) => console.error("loi roi", err));
});

function clickAlert() {
  alert("ban da them san pham vao gio hang!!!");
}
