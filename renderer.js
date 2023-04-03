async function printFlatpakVersion() {
  let flatpakVersionNode = document.getElementById("flatpak-version");
  let txt = "";
  try {
    txt = await window.versions.flatpak();
  } catch (error) {
    txt = "There was an error loading flatpak version!";
  }
  flatpakVersionNode.innerText = txt;
}

printFlatpakVersion();
