const picker = document.querySelector("#photo-picker");
const gallery = document.querySelector("#memory-grid");
const status = document.querySelector("#upload-status");
const petalLayer = document.querySelector(".petal-layer");
const flowers = ["🌸", "🌷", "🌼", "✿"];
const backgroundSong = document.querySelector("#background-song");
const musicButton = document.querySelector("#music-toggle");
const musicLabel = document.querySelector("#music-label");

backgroundSong.volume = 1;

function startMusic() {
  backgroundSong.play().catch(() => {
    musicButton.hidden = false;
  });
}

musicButton.addEventListener("click", startMusic);
backgroundSong.addEventListener("play", () => {
  musicButton.hidden = true;
});
backgroundSong.addEventListener("error", () => {
  musicButton.disabled = true;
  musicLabel.textContent = "song unavailable";
  musicButton.hidden = false;
});

startMusic();

picker.addEventListener("change", () => {
  const images = [...picker.files].filter((file) => file.type.startsWith("image/"));

  images.forEach((file) => {
    const figure = document.createElement("figure");
    const imageWrap = document.createElement("div");
    const image = document.createElement("img");
    const caption = document.createElement("figcaption");
    const remove = document.createElement("button");
    const objectUrl = URL.createObjectURL(file);

    figure.className = "memory memory--added";
    imageWrap.className = "memory-image";
    image.src = objectUrl;
    image.alt = file.name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ");
    image.loading = "lazy";
    caption.innerHTML = `<span>+</span> another moment to keep`;
    remove.className = "remove-photo";
    remove.type = "button";
    remove.setAttribute("aria-label", "Remove added photo");
    remove.textContent = "×";
    remove.addEventListener("click", () => {
      URL.revokeObjectURL(objectUrl);
      figure.remove();
      status.textContent = "Photo removed.";
    });

    imageWrap.append(image);
    figure.append(remove, imageWrap, caption);
    gallery.append(figure);
  });

  if (images.length) {
    status.textContent = `${images.length} photo${images.length === 1 ? "" : "s"} added for this visit. They have not been uploaded.`;
  } else if (picker.files.length) {
    status.textContent = "Please choose image files to add to your page.";
  }
  picker.value = "";
});

function addFlower() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const petal = document.createElement("span");
  const duration = 13 + Math.random() * 9;
  petal.className = "petal";
  petal.textContent = flowers[Math.floor(Math.random() * flowers.length)];
  petal.style.left = `${Math.random() * 100}%`;
  petal.style.fontSize = `${13 + Math.random() * 13}px`;
  petal.style.setProperty("--duration", `${duration}s`);
  petal.style.setProperty("--drift", `${Math.round(Math.random() * 150 - 75)}px`);
  petalLayer.append(petal);
  window.setTimeout(() => petal.remove(), duration * 1000);
}

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  window.setInterval(addFlower, 1500);
}