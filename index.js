const api_endpoint = "https://api.nasa.gov/planetary/apod?api_key=6uLxa7baK4KCnAAImmcuqiobiJsyPl3rnMbIdcMS";

let images = localStorage.getItem("NASA_images")
if(images) {
    images = JSON.parse(images);
} else {
    images = []
}

function appendImage(image) {
    const el = document.createElement('div')
    el.classList.toggle("post");
    el.innerHTML = `
    <img src=${image.url} alt="">
    <div class="details">

    <div class="post-header">
        <h4 class="title">${image.title}</h4>
        <h4 class="date">${image.date}</h4>
    </div>

    <p class="description">${image.explanation}</p>

    <button class="like">Like</button>
        
    </div>`

    el.firstElementChild.onclick = function () {window.open(image.hdurl, "_blank")}

    document.querySelector("#main").appendChild(el);
}

async function getImage() {
    const res = await fetch(api_endpoint)
    const image = res.json();
    return image;
} 

getImage().then(image => {
    console.log(image);
    for (prop in image) console.log(prop);
    appendImage(image);
    appendImage(image);
    images.push(image);
});
