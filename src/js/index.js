const div = document.querySelector("#mainDiv");
const input = document.querySelector("#search");
const spin=document.querySelector(".spin")
const closeBtn=document.querySelector("#close")
const not=document.querySelector("#not")
// closeBtn.addEventListener("click",function(){
// document.querySelector(".err").classList.add("d-none")
// })
//-----Input---------------------------------
input.addEventListener("input", function() {
    spin.classList.remove("d-none");
     movieTitle(this.value); 
     if(this.value==""){
document.getElementById("main").classList.add("d-none")
     }else{
        document.getElementById("main").classList.remove("d-none")
     }
  });
  
//   input.addEventListener("keydown", function(e) {
//     if (e.key === "Enter") {
//       movieTitleS(this.value);
//       this.value = "";
//     
//     }
//   });
//-----Fetch API-----------------
async function movieTitle(title){
    try{
        let promise=await fetch(`https://www.omdbapi.com/?apikey=a407a7b3&s=${title}`);
        let data=await promise.json();
        console.log(data.Search);
        renderMovie(data.Search)
      if(data.Search){
        not.classList.add("d-none");
        div.classList.remove("d-none")
      }
}
//------Catch Error------------------------
catch (error) {
    console.log("Error: ", error);
  
    if (error) {
     
      not.classList.remove("d-none");
      div.classList.add("d-none")
    } 
  }
  
  
finally{
    console.log("Mission complated");
  
    spin.classList.add("d-none")
}

}

//---To Capitalize The First Letter
function upperCase(title){
let f=title.slice(0,1).toUpperCase();
return f+title.slice(1)
}

//------Render Movies
function renderMovie(movies){
div.innerHTML=movies.map((movie)=>`<div class="card" style="width: 18rem;">
<img style=" height:400px;" src="${movie.Poster=="N/A"?"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.59acm7M8zfvbkDUNHr6KdQAAAA%26pid%3DApi&f=1&ipt=bad2d20d4217209866ad1158cca4ba2ef74a98328a77c0ea9083ea6c3e9cc615&ipo=images":movie.Poster}" class="card-img-top" alt="${movie.Title}">
<div class="card-body">
<p class="card-text fs-4 fw-medium text-danger">${" "+movie.Title }</p>
<p class="card-text text-secondary fw-medium">Type: ${movie.Type==="N/A"?" Not available in the system":" "+upperCase(movie.Type)}</p>
<p class="card-text text-secondary fw-medium">Year:${movie.Year==="N/A"?" Not available in the system":" "+movie.Year}</p>
</div>
</div>`)
}