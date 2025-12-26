// Create a <div> and add text inside it.
let div = document.createElement("div");
div.innerHTML = "<p>Hello i am text inside the div </p>";
document.body.prepend(div);

// Create a <li> and append it to an existing <ul>.
let li1 = document.createElement("li");
li1.innerText = "Apple";
let li2 = document.createElement("li");
li2.innerText = "Banana";
let li3 = document.createElement("li");
li3.innerText = "Cherry";
// let ol = document.getElementsByTagName("ol")[0];
let ol = document.querySelector("ol");
ol.prepend(li1);
ol.append(li2);
ol.append(li3);

// Create an <img> element and set its src.
let img = document.createElement("img");
img.setAttribute("src", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSESfgG3D4QwIwpUocSdB_Zfo6j5Z6qrkj9eQ&s")
document.body.append(img);

// Create a button and add it to the page.
let btn = document.createElement("button");
btn.innerText = "Submit";
document.body.append(btn);

// Create an <a> tag with href and text.
let a = document.createElement("a");
a.innerText = "Click Here";
a.setAttribute("href", "https://www.google.com");
document.body.append(a);

// Create a <select> dropdown with 5 options.
let select = document.createElement("select");

let defaultSelect = document.createElement("option");
defaultSelect.innerText = "Select Option";
defaultSelect.setAttribute("selected", true);
defaultSelect.setAttribute("disabled", true);
let option1 = document.createElement("option");
option1.innerText = "Option 1";
let option2 = document.createElement("option");
option2.innerText = "Option 2";
let option3 = document.createElement("option");
option3.innerText = "Option 3";
let option4 = document.createElement("option");
option4.innerText = "Option 4";
let option5 = document.createElement("option");
option5.innerText = "Option 5";

select.append(defaultSelect);
select.append(option1);
select.append(option2);
select.append(option3);
select.append(option4);
select.append(option5);

document.body.append(select);


// Create a list from an array of numbers.
let ul = document.querySelector("ul");
for(let i = 0; i<6; i++){
    let temp = document.createElement("li");
    temp.innerText = i;
    ul.append(temp);
}

// Create multiple <p> elements using an array of strings.
let texts = ["Hello Vansh", "Learning JavaScript", "DOM is fun", "Keep practicing!"];
let body = document.body;
for(let i=0; i< texts.length; i++){
    let temp = document.createElement("p");
    temp.innerText = texts[i];
    body.append(temp);
}

let table = document.createElement("table");
table.border = "1"; // optional, just to see the borders

let columns = ["Sr.NO", "Name", "Roll No", "Age"];
let rows = [
    [1, "Vansh Tarpe", "MLU25S211", "19"],
    [2, "Soham Vilaytkar", "MLU25S229", "20"],
    [3, "Lavanya Gaikwad", "MLU25S213", "18"]
];

// Create header row
let headerRow = document.createElement("tr");
columns.forEach(col => {
    let th = document.createElement("th");
    th.innerText = col;
    headerRow.append(th);
});
table.append(headerRow);

// Create data rows
rows.forEach(rowData => {
    let tr = document.createElement("tr");
    rowData.forEach(cellData => {
        let td = document.createElement("td");
        td.innerText = cellData;
        tr.append(td);
    });
    table.append(tr);
});

// Append table to body
document.body.append(table);

// Create a card layout using div, h3, and p.
let card = document.createElement("div");

let h3c = document.createElement("h3");
h3c.innerText = "Hello I am Card 1";
let cardp = document.createElement("p");
cardp.innerText = "Hello i am Card 1 and I dont know why i created i mean for what reason...?";

card.classList.add("card");
h3c.classList.add("card-h3");
cardp.classList.add("card-p");
card.append(h3c);
card.append(cardp);

document.body.append(card);