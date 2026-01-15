const input = document.querySelector(".input-list");
const button = document.querySelector(".button-list");
const list = document.querySelector(".list-group");

const  divs = document.querySelectorAll(".search");
const btnSearch = document.querySelector(".search-btn");

const searchInp = document.querySelector("#search-input");

button.addEventListener("click", addTodo);
list.addEventListener("click", deleteTodo)
function addTodo(event){
    event.preventDefault();

    const listDiv = document.createElement("div");
    listDiv.classList.add("lists");

    const addList = document.createElement("li");
    addList.innerText = input.value;
    addList.classList.add("add-list");
    listDiv.appendChild(addList);


    const buttonAdd = document.createElement("button");
    buttonAdd.innerHTML = "<i class = \"fa-solid fa-circle-check fa-2x\"></i>";
    buttonAdd.classList.add("add-btn");
    listDiv.appendChild(buttonAdd);


    const buttonRemove = document.createElement("button");
    buttonRemove.innerHTML = "<i class=\"fa-solid fa-trash fa-2x\"></i>";
    buttonRemove.classList.add("remove-btn");
    listDiv.appendChild(buttonRemove);


    list.appendChild(listDiv);
}

function deleteTodo(e){
    if(e.target.classList.contains("fa-trash")){
        // e.target.parentElement.parentElement.remove();
        e.target.closest(".lists").remove();
    }
     if(e.target.classList.contains("fa-circle-check")){
        e.target.closest(".lists").classList.toggle("check");
    }
}

btnSearch.addEventListener("click", (e)=>{
    e.preventDefault();

    divs[0].classList.toggle("expand");
});


const filter = (word)=>{
    Array.from(list.children).forEach(lists => {
        if(lists.textContent.includes(word)){
            lists.classList.remove("remove");
        }else{
            lists.classList.add("remove");
        }
    });
    console.log();
}

searchInp.addEventListener("keyup", ()=>{
    const word = searchInp.value.trim();
    filter(word);
});