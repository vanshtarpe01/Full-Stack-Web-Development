document.addEventListener("DOMContentLoaded", ()=>{
    const button = document.getElementById("download-btn");
    const progressBar = document.getElementById("progress-bar");
    const percentage = document.getElementById("percentage");
    const label = document.getElementById("status-label");


    button.addEventListener("click", ()=>{
        let progress = 0;
        button.disabled = true;
        label.textContent = "Downloading...";

        const interval = setInterval(()=>{
            if(progress>= 100){
                clearInterval(interval);
                label.textContent = "Downloaded..";
                button.textContent = "Downloaded";
                button.style.backgroundColor = "#7fae7c";
                button.style.opacity = "1";
            }else{
                progress++;
                progressBar.style.width = `${progress}%`;
                percentage.textContent = `${progress}%`;
            }
        }, 60);
    })
})