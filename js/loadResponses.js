const searchBar = document.querySelector(".searchInput");
const searchBtn = document.querySelector(".search");

searchBar.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        loadResponses();
    }
});

searchBtn.addEventListener("click", loadResponses());

const responseContainer = document.querySelector(".responseContainer");

async function loadResponses() {
    try {
        const response = await fetch("data.json");
        const res = await response.json();

        responseContainer.innerHTML = ``;

        res.images.slice(0, 20).forEach(image => {
            const frameContainer = document.createElement("div");
            frameContainer.className = "frameContainer";

            let videoName = res.folderName;
            let frameSecond = (parseInt(image.substring(0, image.lastIndexOf('.'))) / 25).toFixed(3);
            let frameNumber = parseInt(image.substring(0, image.lastIndexOf('.')));

            const imageContainer = document.createElement('div');
            imageContainer.classList.add('imageContainer');

            const imageFrame = document.createElement('img');
            imageFrame.alt = '';
            imageFrame.src = `images/${res.folderName}/${image}`;
            imageContainer.appendChild(imageFrame);

            const description = document.createElement('div');
            description.classList.add('description');

            // Create desciptionDetail elements
            const createDesciptionDetail = (label, content) => {
                const detail = document.createElement('div');
                detail.classList.add('desciptionDetail');
                detail.style.padding = '5px';
                detail.style.borderRadius = '5px';
                detail.style.display = 'flex';
                detail.style.flexDirection = 'column';
                detail.style.justifyContent = 'center';
                detail.style.alignItems = 'center';
                detail.style.gap = '5px';

                const labelElement = document.createElement('div');
                labelElement.style.fontWeight = 'bold';
                labelElement.textContent = label;

                const contentElement = document.createElement('div');
                contentElement.textContent = content;

                detail.appendChild(labelElement);
                detail.appendChild(contentElement);

                return detail;
            };

            const videoDetail = createDesciptionDetail('Video', res.folderName);
            const secondDetail = createDesciptionDetail('Second', `${frameSecond}s`);
            const frameDetail = createDesciptionDetail('Frame', frameNumber);

            const copyDetail = document.createElement('div');
            copyDetail.classList.add('desciptionDetail', 'copyDetail');
            copyDetail.style.padding = '5px';
            copyDetail.style.borderRadius = '5px';
            copyDetail.style.display = 'flex';
            copyDetail.style.flexDirection = 'column';
            copyDetail.style.justifyContent = 'center';
            copyDetail.style.alignItems = 'center';
            copyDetail.style.gap = '5px';

            const copyLabel = document.createElement('div');
            copyLabel.style.fontWeight = 'bold';
            copyLabel.textContent = 'Copy';

            const copyIcon = document.createElement('img');
            copyIcon.alt = 'copy';
            copyIcon.src = 'icons/copy.svg';
            copyIcon.width = 20;
            copyIcon.height = 20;

            copyDetail.appendChild(copyLabel);
            copyDetail.appendChild(copyIcon);

            description.appendChild(videoDetail);
            description.appendChild(secondDetail);
            description.appendChild(frameDetail);
            description.appendChild(copyDetail);

            frameContainer.appendChild(imageContainer);
            frameContainer.appendChild(description);

            imageContainer.addEventListener("click", () => {
                document.querySelector(".videoController").style.display = "flex";
                document.querySelector(".blur").style.display = "block";
                createVideo(videoName, frameSecond);
            });

            const copyDetails = frameContainer.querySelector('.copyDetail');

            copyDetails.addEventListener('click', () => {
                const textToCopy = `${res.folderName} ${parseInt(image.substring(0, image.lastIndexOf('.')))}`;
                navigator.clipboard.writeText(textToCopy);

                copyLabel.textContent = "Copied";
                setTimeout(() => { copyLabel.textContent = "Copy"; }, 400);
            });

            responseContainer.appendChild(frameContainer);
        });

    } catch (error) {
        console.log(`Error while fetching data.json: ${error}`);
    }
}

document.querySelector(".blur").addEventListener("click", () => {
    document.querySelector(".videoController").style.display = "none";
    document.querySelector(".blur").style.display = "none";
    document.querySelector(".video").pause();
});

document.querySelector(".exitVideo").addEventListener("click", () => {
    document.querySelector(".videoController").style.display = "none";
    document.querySelector(".blur").style.display = "none";
    document.querySelector(".video").pause();
});

document.querySelector(".goBack").addEventListener("click", () => {
    document.querySelector(".videoController").style.display = "none";
    document.querySelector(".blur").style.display = "none";
    document.querySelector(".video").pause();
});

document.querySelector(".videoSearch").addEventListener("click", () => {
    const videoName = document.querySelector(".nameInput").value;
    const frameInput = document.querySelector(".frameInput").value;
    const fpsInput = document.querySelector(".fpsInput").value;

    const video = document.querySelector(".video");
    video.src = `videos/${videoName}.mp4`;
    video.currentTime = (frameInput / fpsInput).toFixed(3);
    video.autoplay = false;
})

function createVideo(videoName, frameSecond) {
    const video = document.querySelector(".video");
    video.src = `videos/${videoName}.mp4`;
    video.currentTime = frameSecond;
    video.autoplay = false;

    document.querySelector(".playVideo").addEventListener("click", () => {
        video.play();
    });

    document.querySelector(".stopVideo").addEventListener("click", () => {
        video.pause();
    });
}




