document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    // Ürün detaylarını getirmek için HTTP request yapılabilir
    fetch('https://hepsiburada-se3355-ddf5e5d1eaab.herokuapp.com/listProductbyId/' + productId)
      .then(response => response.json())
      .then(data => {
        const product = data.data[0];
        console.log(data);
        const productImg = document.getElementById('product-img');
        const img = document.createElement("img");
        img.src = product.img;
        img.classList.add('img-product')
        productImg.appendChild(img);

        const productTitle = document.getElementById('product-title');
        const titleAndDescription = document.createElement("h4");
        titleAndDescription.textContent = product.title + " " + product.description;
        productTitle.appendChild(titleAndDescription);

        const title = document.createElement("div");
        title.textContent = product.title;
        title.classList.add("text-primary");
        productTitle.appendChild(title);

        const priceElement = document.getElementById('price');

        const price = document.createElement("h3");
        price.textContent = product.price + ",00 TL";
        priceElement.appendChild(price);

        const installment = document.createElement("div");
        installment.textContent = (product.price / 6).toFixed(2) + " x 6 aya varan Taksitle";
        priceElement.appendChild(installment);

        const sellerContainer = document.getElementById('seller');
        const seller = document.createElement("span");
        seller.classList.add("text-primary")
        sellerContainer.textContent = "Satıcı: ";
        seller.textContent = product.seller;
        sellerContainer.appendChild(seller);



        // Ürün detaylarını ekrana ekle
        /*productDetail.innerHTML = `
          <h2>${data.title}</h2>
          <p>${data.description}</p>
          <p>Price: $${data.price}</p>
          <img src="${data.productImage}" alt="${data.title}">
        `;*/
      })
      .catch(error => console.error('Error fetching product detail:', error));
  });