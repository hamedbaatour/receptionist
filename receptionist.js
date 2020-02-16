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
      await fetch("/receptionist.html")
    ).text();

    // Getting ShadowDOM elements
    const fab = this.shadowRoot.querySelector(".fab");
    const card = this.shadowRoot.querySelector(".card");
    const list = this.shadowRoot.querySelector(".list");
    const noDataNotice = this.shadowRoot.querySelector(".empty-list-notice");

    //  === Receptionist settings+data props passed in (html attributes) ===
    let error = false;

    // --- settings prop ---
    let settings = this.getAttribute("settings");

    // if settings prop is string convert it to a js object
    if (typeof settings === "string") {
      try {
        settings = settings
          .replace(/\s+/g, "")
          .replace(/'/g, '"')
          .replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:([^\/])/g, '"$2":$4');
        settings = JSON.parse(settings);
      } catch (e) {
        error = true;
        window.console.error(
          "Receptionist 'settings' attribute is invalid. please provide a valid object."
        );
      }
    }
    if (!error) {
      // settings object validation
      if (typeof settings === "object" && settings !== null) {
        const style = this.shadowRoot.querySelector("style");
        console.log(settings.backgroundColor);
        // settings backgruondColor validation
        if (
          settings.backgroundColor &&
          typeof settings.backgroundColor === "string" &&
          settings.backgroundColor.match(/^#[0-9a-f]{3,6}$/i)
        ) {
          style.innerHTML = style.innerHTML.replace(
            "--bg: #00b9ff;",
            `--bg: ${settings.backgroundColor};`
          );
        } else if (
          settings.backgroundColor !== null &&
          settings.backgroundColor !== undefined
        ) {
          error = true;
          window.console.error(
            "Receptionist 'backgroundColor' should have a valid hex color format '#000000'"
          );
        }

        // settings textColor validation
        if (!error) {
          if (
            settings.textColor &&
            typeof settings.textColor === "string" &&
            settings.textColor.match(/^#[0-9a-f]{3,6}$/i)
          ) {
            style.innerHTML = style.innerHTML.replace(
              "--txt: #ffffff;",
              `--txt: ${settings.textColor};`
            );
          } else if (
            settings.textColor !== null &&
            settings.textColor !== undefined
          ) {
            error = true;
            window.console.error(
              "Receptionist 'textColor' should have a valid hex color format '#ffffff'"
            );
          }
        }
      } else if (settings !== null) {
        error = true;
        window.console.error(
          "Receptionist 'settings' attribute should be an object"
        );
      }
    }

    // --- data prop  ---
    let dataArray = this.getAttribute("data");

    // if data prop is string convert it to a js array
    if (typeof dataArray === "string") {
      try {
        dataArray = eval(dataArray.replace(/\s+/g, " "));
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
