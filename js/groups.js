let queryString = location.search;
let level = queryString.split("&")[1].split("=")[1];
let mainGroup = document.querySelector(".container");
window.addEventListener("load", (e) => {
  if (level == "level1") {
    for (let index = 0; index < 4; index++) {
      let group = document.createElement("section");
      mainGroup.appendChild(group);
      group.id = `g${index + 1}`;
      group.classList.add("group");

      for (let imageindex = 1; imageindex <= 4; imageindex++) {
        let playImage = document.createElement("img");
        playImage.src = `/images/${level}-${group.id}/${imageindex}.jpg`;
        group.appendChild(playImage);
      }

      let groupbtn = document.createElement("input");
      groupbtn.type = "submit";
      groupbtn.value = `group ${index + 1}`;
      groupbtn.classList.add("btn");
      group.appendChild(groupbtn);
      groupbtn.addEventListener("click", (e) => {
        document.querySelector("input[name=group]").value = group.id;
      });
    }
  } else {
    for (let index = 0; index < 2; index++) {
      let group = document.createElement("section");
      mainGroup.appendChild(group);
      group.id = `g${index + 1}`;
      group.classList.add("group9");

      for (let imageindex = 1; imageindex <= 9; imageindex++) {
        let playImage = document.createElement("img");
        playImage.src = `/images/${level}-${group.id}/${imageindex}.jpg`;
        group.appendChild(playImage);
      }
      let groupbtn = document.createElement("input");
      groupbtn.type = "submit";
      groupbtn.value = `group ${index + 1}`;
      group.appendChild(groupbtn);
      groupbtn.addEventListener("click", (e) => {
        document.querySelector("input[name=group]").value = group.id;
      });
    }
  }
  let textElm = document.createElement("input");
  textElm.style.display = "none";
  textElm.type = "text";
  textElm.name = "level";
  textElm.value = level;
  document.querySelector("form").appendChild(textElm);
});
