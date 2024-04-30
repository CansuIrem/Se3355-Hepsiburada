function resimDegistir(record) {
    const title = document.getElementById('fbodyTitle')
    console.log(title);
    const Subtitle = document.getElementById('fbodySubtitle')
    console.log(Subtitle);

    const secilenImg = document.getElementById('mainProdeImage')
    console.log(secilenImg);

    document.getElementById("mainProdeImage").src = record.img;
    title.innerText = record.title;
    Subtitle.innerText = record.subTitle;
}

// footer description

var moreBtn = document.getElementById("more");
var lessBtn = document.getElementById("less");
var hiddenParagraphs = document.querySelectorAll("#footerdesc p:not(:first-of-type)");

moreBtn.addEventListener("click", function () {
    for (var i = 0; i < hiddenParagraphs.length; i++) {
        hiddenParagraphs[i].style.display = "block";
    }
    moreBtn.style.display = "none";
});

lessBtn.addEventListener("click", function () {
    for (var i = 0; i < hiddenParagraphs.length; i++) {
        hiddenParagraphs[i].style.display = "none";
    }
    moreBtn.style.display = "block";
});

document.addEventListener('DOMContentLoaded', function () {
    const searchButton = document.getElementById('searchButton');
    searchButton.addEventListener('click', function (event) {
        const keyword = document.getElementById('search').value;
        if (keyword.trim() !== "") {
            window.location.href = "searchPage.html?keyword=" + encodeURIComponent(keyword);
        } else {
            alert("Lütfen bir arama terimi girin.");
        }
    });
});


getMain()
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });



function getMain() {
    const url = "https://hepsiburada-se3355-ddf5e5d1eaab.herokuapp.com";

    return fetch(`${url}/main`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(error => {
            return Promise.reject(error);
        });
}

window.onload = getMain()
    .then(data => {
        const images = data.data;
        console.log(images);

        const futuresBody = document.getElementById("futuresBody");
        const fbodySideContent = document.createElement("div");
        fbodySideContent.classList.add("fbodySideContent");
        const fbodyTitle = document.createElement("span");
        fbodyTitle.setAttribute("id", "fbodyTitle");
        fbodyTitle.textContent = images[0].title;
        fbodySideContent.appendChild(fbodyTitle);

        const fbodySubtitle = document.createElement("h2");
        fbodySubtitle.setAttribute("id", "fbodySubtitle");
        fbodySubtitle.textContent = images[0].subTitle;
        fbodySideContent.appendChild(fbodySubtitle);

        const button = document.createElement("button");
        button.textContent = "Acele Et Kaçırma";
        fbodySideContent.appendChild(button);

        const span = document.createElement("span");
        span.textContent = "Stok: 100";
        fbodySideContent.appendChild(span);

        futuresBody.appendChild(fbodySideContent);

        const fbodyMainImage = document.createElement("div");
        fbodyMainImage.classList.add("fbodyMainImage");
        const img = document.createElement("img")
        img.setAttribute("id", "mainProdeImage");
        img.src = images[0].img;
        img.alt = "";

        fbodyMainImage.appendChild(img);

        futuresBody.appendChild(fbodyMainImage);


        const firstArrowElement = document.createElement('i');
        firstArrowElement.classList.add('bi', 'bi-arrow-left');
        firstArrowElement.innerHTML = '&larr;';
        const lastArrowElement = document.createElement('i');
        lastArrowElement.classList.add('bi', 'bi-arrow-left');
        lastArrowElement.innerHTML = '&rarr;';

        const futuresBottomDiv = document.querySelector('.futuresBottom');
        futuresBottomDiv.appendChild(firstArrowElement);

        images.forEach(record => {
            const imageDiv = document.createElement("div");
            imageDiv.classList.add("productImages");
            const img = document.createElement("img");
            img.src = record.img;
            img.alt = record.title;
            img.onclick = function () {
                resimDegistir(record);
            };
            imageDiv.appendChild(img);
            futuresBottomDiv.appendChild(imageDiv)
        });

        futuresBottomDiv.appendChild(lastArrowElement);

    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
