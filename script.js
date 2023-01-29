const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-content');
const containers = document.getElementsByClassName('img-container');
const closeBtn = document.getElementById('closeButton');


function SearchPhotos() {
    let per_page = 20;
    let clientId = "wg3fcFxezYfrl1MPuWDmZfgKT16sM5a4SOhpBi2Zw0U";
    let query = document.getElementById("search").value;
    let url = "https://api.unsplash.com/search/photos/?client_id=" + clientId + "&query=" + query + "&per_page" + per_page;
    let url1 = "https://api.unsplash.com/photos/random?client_id=wg3fcFxezYfrl1MPuWDmZfgKT16sM5a4SOhpBi2Zw0U&count=10"
    
 
    fetch(url)        
    .then(function (data) {
            return data.json();
            
        })
        .then(function (data) {
                data.results.forEach(photo => {
                document.getElementById("result").innerHTML += `
                  <img src="${photo.urls.small}">
                  <a href="${photo.links.download}">
                  <p>"${photo.description}"<p>  
                 `;
            });
        });
}



window.addEventListener('scroll', function () {
    if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
        SearchPhotos();
    }
});
