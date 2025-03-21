document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll(".draggable");
    const canvas = document.getElementById("canvas");
    const editor = document.getElementById("editor");
    const editText = document.getElementById("edit-text");
    const editColor = document.getElementById("edit-color");
    const saveBtn = document.getElementById("save-btn");

    let selectedElement = null;

    elements.forEach(el => {
        el.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("type", e.target.dataset.type);
        });
    });

    canvas.addEventListener("dragover", (e) => {
        e.preventDefault();
    });

    canvas.addEventListener("drop", (e) => {
        e.preventDefault();
        const type = e.dataTransfer.getData("type");
        let newElement;

        if (type === "text") {
            newElement = document.createElement("p");
            newElement.textContent = "New Text";
        } else if (type === "image") {
            newElement = document.createElement("img");
            newElement.src = "https://via.placeholder.com/100";
            newElement.style.width = "100px";
        } else if (type === "button") {
            newElement = document.createElement("button");
            newElement.textContent = "Click Me";
        }

        if (newElement) {
            newElement.classList.add("element");
            newElement.style.color = "black";
            newElement.setAttribute("draggable", "true");
            newElement.addEventListener("click", () => openEditor(newElement));
            canvas.appendChild(newElement);
        }
    });

    function openEditor(el) {
        selectedElement = el;
        editText.value = el.textContent || "";
        editColor.value = el.style.color || "#000000";
        editor.classList.remove("hidden");
    }

    saveBtn.addEventListener("click", () => {
        if (selectedElement) {
            selectedElement.textContent = editText.value;
            selectedElement.style.color = editColor.value;
            editor.classList.add("hidden");
        }
    });
});
