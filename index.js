const api_endpoint = "https://api.nasa.gov/planetary/apod?api_key=6uLxa7baK4KCnAAImmcuqiobiJsyPl3rnMbIdcMS";

function renderImage(image) {
    const el = document.createElement('div')
    el.classList.toggle("post");
    el.innerHTML = `
    <img src=${image.url} alt="">
    <div class="details">

        <div class="post-header">
            <h3 class="title">${image.title}</h3>
            <h3 class="date">${image.date}</h3>
        </div>

        <p class="description">${image.explanation}</p>
        
    </div>
    <button class=${image.likeState} data-postid=${image.postid}>LIKE</button>`

    const postImage = el.firstElementChild;
    const likeButton = el.lastElementChild;
    postImage.onclick = () => {window.open(image.hdurl, "_blank")}
    likeButton.onclick = toggleLikeState;
    
    document.querySelector("#main").appendChild(el);
}

function toggleLikeState(e) {
    const heart = document.createElement("div");
    const likeBtn = e.target;
    heart.classList.add("heart-shape");

    if (likeBtn.classList.contains("not-liked")){
        likeBtn.classList = "liked" 
        likeBtn.parentElement.appendChild(heart)
        setTimeout(() => heart.remove(), 1950)
        images[likeBtn.dataset.postid].likeState = "liked"
    } else {
        likeBtn.classList = "not-liked"
        images[likeBtn.dataset.postid].likeState = "not-liked"
    }

    // save changes
    sessionStorage.setItem("NASA_images", JSON.stringify(images))
}

async function getImage() {
    const res = await fetch(api_endpoint)
    return res.json();
} 

function loadImages(images) {
    document.querySelector("#main").innerHTML = ""
    images.forEach((element, index) => {
        element["postid"] = index;
        renderImage(element)
    });
}



//===============MAIN===============//
let images = sessionStorage.getItem("NASA_images")
if(images && images != "null") {
    images = JSON.parse(sessionStorage.getItem("NASA_images"))
} else {
    images = []
}

getImage().then(image => {
    // add the image only if it is not in the database
    if (!images.find(el => el.title === image.title)) {
        image["likeState"] = "not-liked";
        images.push(image);
    }
    loadImages(images)
    sessionStorage.setItem("NASA_images", JSON.stringify(images))
});