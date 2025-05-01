function findC(name) {
  return document.getElementsByClassName(name)[0];
}
function findI(name) {
  return document.getElementById(name);
}
function createElement(name, type, parent, attributes) {
  if (attributes == null) {
    attributes = [];
  }

  if (parent == null) {
    return null;
  } else {
    if (typeof parent === "string" || typeof parent === "number") {
      parent = findC(parent);
    }
  }

  let newElement = document.createElement(type);

  if (parent === null) {
    document.body.appendChild(newElement);
  } else {
    parent.appendChild(newElement);
  }

  let setStyle = "";
  let keys = Object.keys(attributes);
  for (let i = 0; i < keys.length; i++) {
    setStyle += keys[i] + ": " + attributes[keys[i]] + "; ";
  }
  newElement.setAttribute("style", setStyle);
  newElement.setAttribute("class", name);

  return newElement;
}

const style = document.createElement("style");
style.innerHTML = `
.modal {
  padding: 8px;
  background: var(--contentColor);
  border: 2px solid var(--contentColor2);
  border-radius: 12px;
  width: 350px;
  max-height: calc(100% - 32px);
  overflow-y: auto;
  transform: scale(0.9);
  transition: transform 0.2s;
}

.closeModal{
  position: absolute;
  display: flex;
  width: 24px;
  height: 24px;
  right: 4px;
  top: 4px;
  background: rgba(0, 0, 0, 0.45);
  border-radius: 100%;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 22px;
  line-height: 22px;
  transition: 0.1s;
  font-weight: normal;
  color: white;
}
.modalTitle {
  font-weight: bold;
  font-size: 30px;
}
.modalButtons {
  margin-top: 8px;
  text-align: right;
}
.modalButton {
  margin-left: 4px;
  border-radius: 8px;
  margin-top: 4px;
  line-height: unset;
}
.modalContent {
  font-size: 15px;
}
button {
  border: none;
  color: white;
  background: var(--themeColor);
  padding: 6px;
  font-family: var(--secondFont);
  font-weight: 600;
  font-size: 20px;
  line-height: 20px;
  cursor: pointer;
  transition: 0.1s;
  border-radius: 8px;
}

button:active {
  transform: scale(0.95);
}
`;
document.body.appendChild(style);

function showPopUp(title, content, buttons) {
  let modalID = Math.floor(Math.random()*100000000);
  let modalHTML = `<div class="modalTitle" id="modalTitle${modalID}">${title}</div><div id="modalText${modalID}">${content}</div><div class="modalButtons" id="modalButtons${modalID}"></div>`;
  let backBlur = createElement("backBlur", "div", "body");
  backBlur.id = "backBlur" + modalID;
  let newModal = createElement("modal", "div", backBlur);
  newModal.innerHTML = modalHTML;
  let modalButtons = findI("modalButtons" + modalID);
  for (let i in buttons) {
    let thisButton = createElement("modalButton", "button", modalButtons);
    thisButton.textContent = buttons[i][0];
    if (buttons[i][1] != null) {
      thisButton.style.background = buttons[i][1];
    }
    if (i == 0) {
      thisButton.focus();
    }
    thisButton.addEventListener("click", function () {
      if (typeof buttons[i][2] == "function") {
        buttons[i][2]();
      }
      if (buttons[i][3] != true) {
        backBlur.style.opacity = 0;
        newModal.style.transform = "scale(0.9)";
        setTimeout(function () {
          backBlur.remove();
        }, 199);
      }
    });
  }
  backBlur.style.opacity = 1;
  newModal.style.transform = "scale(1)";
  return modalID;
}
