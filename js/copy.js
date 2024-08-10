const copyAll = document.querySelector(".copyAll");

copyAll.addEventListener("click", async () => {
    try {
        const response = await fetch("data.json");
        const res = await response.json();

        let textToCopy = "";
        res.images.slice(0, 20).forEach(image => {
            textToCopy = textToCopy + `${res.folderName} ${parseInt(image.substring(0, image.lastIndexOf('.')))}\n`;
        });
        navigator.clipboard.writeText(textToCopy);

        copyAll.textContent = "Copied All Results";
        setTimeout(() => {
            copyAll.textContent = "Copy All Results";
        }, 400);
    } catch (error) {
        console.log(`Error while fetching data.json: ${error}`);
    }
}); 