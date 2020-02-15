// Create Receptionist (extending HTML Element)
export class Receptionist extends HTMLElement {
  // Fires when an instance of the element is created or updated
  constructor() {
    super();
  }

  // Fires when Receptionist gets inserted into the document
  async connectedCallback() {
    // Import component template (HTML)
    this.attachShadow({ mode: "open" }).innerHTML = await (
      await fetch("../receptionist.html")
    ).text();

    // Getting ShadowDOM elements
    const fab = this.shadowRoot.querySelector(".fab");
    const card = this.shadowRoot.querySelector(".card");
    const list = this.shadowRoot.querySelector(".list");
    const noDataNotice = this.shadowRoot.querySelector(".empty-list-notice");

    // Receptionist settings+data props passed in (html attributes)
    let error = false;
    let dataArray = this.getAttribute("data");
    if (typeof dataArray === "string") {
      try {
        dataArray = eval(dataArray);
      } catch (e) {
        error = true;
        window.console.error(
          "Receptionist 'data' attribute is invalid. please provide a valid array."
        );
      }
    }
    if (!error) {
      if (window.Array.isArray(dataArray)) {
        if (dataArray.length === 0) {
          noDataNotice.classList.add("show");
        } else {
          // check if all 'data' array objects have a valid name && description properties
          dataArray.forEach(listItem => {
            if (!error) {
              if (typeof listItem === "object" && listItem !== null) {
                if (
                  !listItem.name ||
                  typeof listItem.name !== "string" ||
                  (listItem.name && listItem.name.length === 0)
                ) {
                  error = true;
                  window.console.error(
                    "all Receptionist 'data' array objects should have a valid 'name' property"
                  );
                } else if (
                  !listItem.description ||
                  typeof listItem.description !== "string" ||
                  (listItem.description && listItem.description.length === 0)
                ) {
                  error = true;
                  window.console.error(
                    "all Receptionist 'data' array objects should have a valid 'description' property"
                  );
                } else if (
                  listItem.checked !== undefined &&
                  typeof listItem.checked !== "boolean"
                ) {
                  error = true;
                  window.console.error(
                    "all Receptionist 'data' array objects should have a 'checked' property of type boolean"
                  );
                }
              } else {
                error = true;
                window.console.error(
                  "Receptionist 'data' array should contain objects with a valid 'name' & 'description' property"
                );
              }
            }
          });
          if (!error) {
            // data prop is valid so loop through the array and add all list items to the list
            dataArray.forEach(listItem => {
              const li = document.createElement("li");
              li.className = "list-item";
              li.innerHTML = `
                ${
                  listItem.checked
                    ? '<i class="list-item-mark">✔️</i>'
                    : '<i class="list-item-mark">❌</i>'
                }
                <span class="list-item-title">${listItem.name}</span>
                <span class="list-item-description">${
                  listItem.description
                }</span>`;
              list.appendChild(li);
            });
          }
        }
      } else if (dataArray !== null) {
        window.console.error(
          "Receptionist 'data' attribute should be an array"
        );
      } else {
        noDataNotice.classList.add("show");
      }
    }

    // FAB button click event handler
    fab.addEventListener("click", () => {
      card.classList.toggle("card-active");
      // Switch animation between FAB closed text (Start Here !) and opened text ( X close )
      [...fab.children].forEach(span => span.classList.toggle("fade"));
    });
  }

  // Fires when Receptionist gets removed from the document
  disconnectedCallback() {}

  // Fires when a Receptionist attribute is added, removed, or updated
  attributeChangedCallback(attrName, oldVal, newVal) {}

  // Fires when Receptionist is moved from one HTML document to another one
  adoptedCallback() {}
}

// Register Receptionist as a custom element
window.customElements.define("saas-receptionist", Receptionist);
