
// Fetch data from the API
fetch('https://turkiyeapi.dev/api/v1/provinces')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // Get the select element
    const select = document.getElementById('citySelect');

    // Clear existing options
    select.innerHTML = '';

    // Populate the combobox with city names
    data.data.forEach(city => {
      const option = document.createElement('option');
      option.value = city.name;
      option.textContent = city.name;
      select.appendChild(option);
    });
  })
  .catch(error => console.error('Error fetching data:', error));


const urlParams = new URLSearchParams(window.location.search);
let keyword = urlParams.get('keyword');
// Define an asynchronous function to fetch data from the database
async function fetchDataFromDatabase() {
  try {


    // Make a GET request to the database API endpoint
    const response = await fetch('https://hepsiburada-se3355-ddf5e5d1eaab.herokuapp.com/searchProduct', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ keyword })
    });

    // Check if the response is successful (status code 200)
    if (!response.ok) {
      throw new Error('Failed to fetch data from the database');
    }

    // Parse the JSON response
    const data = await response.json();

    return data.data; // Return the fetched data
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return []; // Return an empty array in case of error
  }
}

// Function to render products fetched from the API
async function renderProducts() {
  try {
    // Fetch product data from the database
    const products = await fetchDataFromDatabase();

    // Get the product container element
    const container = document.getElementById("product-container");
    container.innerHTML = ""; // Clear previous content
    const categories = [];
    // Render each product
    products.forEach(product => {
      categories.push(product.category);
      const card = document.createElement("div");
      card.classList.add("product-card");
      card.setAttribute('id', product._id);

      // Product image
      const img = document.createElement("img");
      img.src = product.img;
      img.style.width = "180px";
      img.style.padding = "3px";
      img.classList.add("product-img");
      img.setAttribute('id', product._id);
      card.appendChild(img);

      // Product title
      const title = document.createElement("h5");
      title.textContent = product.title;
      card.appendChild(title);

      // Product description
      const description = document.createElement("p");
      description.textContent = product.description;
      card.appendChild(description);

      // Product price
      const price = document.createElement("p");
      price.textContent = "Price: " + product.price + " TL";
      card.appendChild(price);

      container.appendChild(card); // Append card to the container
    });

    // Convert the array to a Set to remove duplicates
    let categoriesSet = new Set(categories);

    // Convert the Set back to an array (if needed)
    let uniqueArray = Array.from(categoriesSet);
    console.log(uniqueArray);

    const leftSideBox = document.getElementById('left-side-box');
    leftSideBox.innerHTML = "";
    const kategori = document.createElement("li");
    kategori.textContent = "Kategori";
    const tumKategoriler = document.createElement("li");
    tumKategoriler.textContent = "Tüm kategoriler";
    leftSideBox.appendChild(kategori);
    leftSideBox.appendChild(tumKategoriler);

    uniqueArray.forEach(category => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.textContent = category;
      a.setAttribute("href", "#");
      li.appendChild(a);
      leftSideBox.appendChild(li);
    });
    



  } catch (error) {
    console.error('Error rendering products:', error.message);
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const searchButton = document.getElementById('search-button');
  searchButton.addEventListener('click', function (event) {
    const newKeyword = document.getElementById('search').value;
    if (newKeyword.trim() !== "") {
      keyword = newKeyword;
      renderProducts();
    } else {
      alert("Lütfen bir arama terimi girin.");
    }
  });
});

// Call the function to render products when the page loads
document.addEventListener("DOMContentLoaded", renderProducts);



// Sayfa yüklendiğinde ürünleri göster
//window.addEventListener("load", renderProducts);

document.getElementById("location-btn").addEventListener("click", function () {
  console.log("Open window button clicked");
  var window = document.getElementById("citySelectionWindow");
  window.classList.toggle("hidden");
});

document.getElementById("applyButton").addEventListener("click", function () {
  var selectedCity = document.getElementById("citySelect").value;
  document.getElementById("location-btn").innerText = "" + selectedCity;
  document.getElementById("citySelectionWindow").classList.add("hidden");
});


document.addEventListener('DOMContentLoaded', function () {
  const productList = document.getElementById('product-container');
  productList.addEventListener('click', function (event) {
    if (event.target.classList.contains('product-card') || event.target.classList.contains('product-img')) {
      const productId = event.target.getAttribute('id');
      window.location.href = 'productPage.html?id=' + productId;
    }
  });
});
