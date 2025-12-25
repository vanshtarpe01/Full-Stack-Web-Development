// JSON.stringify(); // Used to convert object into JSON format
// JSON.parse(); // Used to convert JSON to the JS Object

let person = [
    {name : "Vansh", rollno : 52},
    {name : "Suraj", rollo :49},
    {name : "Somesh", rollno : 68},
    {name : "Soham", rollno : 46}
];

// console.log(person[0].name);
// let personjson =JSON.stringify(person)
// console.log(personjson);
// console.log(JSON.parse(personjson));

// let output = document.querySelector("#output");
// let personname = person[0].name;
// output.innerHTML += `<li>${person[0].name} </li>`

// for(let i =0; i<= person.length; i++){
//     output.innerHTML += "<li>"+person[i].name +"</li>";
// }


const request = new XMLHttpRequest();
request.addEventListener("readystatechange", ()=>{
    console.log(request.responseText);
});

request.open("GET","../data.json");
request.send();