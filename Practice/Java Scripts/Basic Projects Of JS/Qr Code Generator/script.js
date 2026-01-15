const btn = document.querySelector("button");
const img = document.querySelector("div");
const input = document.querySelector("input");

btn.addEventListener("click", ()=>{
  fetch(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${input.value}`).then((response)=>{
    console.log(response);
    return response.blob();
  }).then((blob)=>{
    const objectUrl = URL.createObjectURL(blob);
    img.innerHTML = `<img src="${objectUrl}" height="150px width="150px">`;
  }).catch((err)=>{
    console.log("There was the problem with the fetch operation : ", err);
  });
});