let currentImageIndex = 0;
let imageInterval;

function openModal(title, imageSources, description, fullName, gender, squad) {
    const modal = document.getElementById("modal");
    document.getElementById("modal-title").innerText = title;
    document.getElementById("modal-fullname").innerText = `ФИО: ${fullName}`;
    document.getElementById("modal-gender").innerText = `Пол: ${gender}`;
    document.getElementById("modal-squad").innerText = `Отряд: ${squad}`;
    document.getElementById("modal-description").innerText = description;

    currentImageIndex = 0;
    document.getElementById("modal-image").src = imageSources[currentImageIndex];

    if (imageInterval) {
        clearInterval(imageInterval);
    }

    imageInterval = setInterval(() => {
        currentImageIndex = (currentImageIndex + 1) % imageSources.length;
        document.getElementById("modal-image").src = imageSources[currentImageIndex];
    }, 10000); // Смена изображения каждые 10 секунд

    modal.style.display = "flex";
}

function closeModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "none";

    if (imageInterval) {
        clearInterval(imageInterval);
    }
}
