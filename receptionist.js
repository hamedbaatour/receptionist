// Create Receptionist (extending HTML Element)
export class Receptionist extends HTMLElement {
  /*⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘
                                       Template (HTML + CSS)
  ⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘*/

  template = `
<style>
  /*====================
         Shared CSS
    ====================*/
  :host {
    /*=== Font ===*/
    font-family: sans-serif;
    /*=== Primary ===*/
    --bg: #00b9ff;
    --txt: #ffffff;
  }

  ::-webkit-scrollbar {
    width: 8px; /* for vertical scrollbars */
    height: 8px; /* for horizontal scrollbars */
    border-radius: 2rem;
  }

  ::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 2rem;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 2rem;
  }

  /*====================
        Trigger (FAB)
    ====================*/
  .fab {
    width: 193px;
    height: 57px;
    bottom: 2rem;
    right: 5.5rem;
    position: fixed;
    overflow: hidden;
    border: none;
    outline: none;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: 1.15rem;
    background: var(--bg);
    color: var(--txt);
    border-radius: 2rem;
    padding: 1rem 2rem;
    cursor: pointer;
    transition: transform 0.25s ease-in-out;
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
  }

  .fab > span {
    position: absolute;
    transition: opacity 0.25s ease-in-out;
  }

  .fab:hover {
    transform: scale(1.05);
  }

  .fab-opened-text {
    opacity: 0;
  }

  .fab-closed-text {
    opacity: 0;
  }

  /*====================
            Card
    ====================*/
  .card-wrapper {
    filter: drop-shadow(0 0 0.5rem rgba(0, 0, 0, 0.3));
    bottom: 6rem;
    right: 1rem;
    position: fixed;
    border-radius: 2rem;
    overflow: hidden;
  }

  .card {
    width: 350px;
    height: 600px;
    display: flex;
    flex-flow: column;
    clip-path: polygon(
      0% 0%,
      100% 0%,
      100% 97%,
      53% 97%,
      50% 100%,
      47% 97%,
      0 97%
    );
    position: relative;
    transform: scale(0);
    transition: transform 0.25s ease-in-out;
    transform-origin: bottom center;
  }

  .card-active {
    display: flex;
    transform: scale(1);
  }

  .card-tip {
    background: white;
    height: 100%;
    width: 1.5rem;
    justify-self: center;
    align-self: center;
    position: absolute;
  }

  /*=== Card Header ===*/
  .card-header {
    background: var(--bg);
    color: var(--txt);
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    padding: 2rem 0 4.5rem 0;
    z-index: 1;
  }

  .header-title {
    margin: 0;
  }

  .header-percentage {
    margin: 1rem 0;
    font-size: 1rem;
    font-weight: bold;
    opacity: 0.5;
  }

  .header-progress-bar {
    max-height: 0.5rem;
    width: 70%;
    -webkit-appearance: none;
    appearance: none;
  }

  .header-progress-bar::-webkit-progress-bar {
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 1rem;
  }

  .header-progress-bar::-webkit-progress-value {
    background: rgba(255, 255, 255, 0.9);
    border-radius: 1rem;
  }

  .header-progress-bar::-moz-progress-bar {
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 1rem;
  }

  /*=== Card Body ===*/
  .card-body {
    height: 425px;
    margin-top: -40px;
    border-radius: 2rem;
    background: white;
    z-index: 2;
    box-shadow: 0 -1rem 0.9rem rgba(0, 0, 0, 0.1);
  }

  .list {
    margin: 0 0 0 0.75rem;
    padding: 0;
    list-style: none;
    overflow-x: hidden;
    overflow-y: auto;
    height: 95%;
  }

  .list-item {
    font-size: 1rem;
    margin: 2rem 0;
  }

  .list-item:last-child {
    margin: 2rem 0 0.5rem 0;
  }

  .list-item-mark {
    margin-right: 0.25rem;
    font-style: normal;
  }

  .list-item-mark-clickable {
    cursor: pointer;
    display: inline-block;
    transition: transform 0.25s ease-in-out;
    overflow: visible;
  }

  .list-item-mark-clickable:hover {
    transform: scale(1.1);
  }

  .list-item-title {
    font-size: 1.25rem;
  }

  .list-item-description {
    display: block;
    font-size: 0.85rem;
    opacity: 0.7;
    margin-top: 0.6rem;
    margin-left: 2rem;
  }

  .empty-list-notice {
    display: none;
    color: gray;
  }

  /*====================
         Shared CSS
    ====================*/
  .fade {
    opacity: 1;
  }

  .show {
    display: block;
  }
</style>

<!-- Card -->
<div class="card-wrapper">
  <section class="card">
    <div class="card-header">
      <h1 class="header-title">🤵 Finish Account Setup</h1>
      <p class="header-percentage"><span class="header-percentage-number">60%</span> Done</p>

      <progress class="header-progress-bar" max="100" value="70"> 70%</progress>
    </div>

    <div class="card-body">
      <ul class="list">
        <li class="empty-list-notice">No Todo Items Yet.</li>
      </ul>
    </div>
    <div class="card-tip"></div>
  </section>
</div>

<!-- Trigger -->
<button class="fab">
  <span class="fab-closed-text fade">🏁 Start Here !</span>
  <span class="fab-opened-text">✖️ Close</span>
</button>

  `;

  /*⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘
                                     Component (JS)
⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘⌘*/
  // error tracking variable
  error = false;

  // Fires when an instance of the element is created or updated
  constructor() {
    super();
  }

  // open or close Receptionist card
  toggleShowWidget(open) {
    if (open !== undefined && typeof open === "boolean") {
      if (open && !this.card.classList.contains("card-active")) {
        // open widget
        this.card.classList.add("card-active");
        this.openedText.classList.add("fade");
        this.closedText.classList.remove("fade");
      } else if (this.card.classList.contains("card-active")) {
        // close widget
        this.card.classList.remove("card-active");
        this.closedText.classList.add("fade");
        this.openedText.classList.remove("fade");
      }
    } else {
      this.card.classList.toggle("card-active");
      // Switch animation between FAB closed text (Start Here !) and open text ( X close )
      [...this.fab.children].forEach(span => span.classList.toggle("fade"));
    }

    // dispatch a custom event for <saas-receptionist> to indicate card open / closed state
    let event = new CustomEvent("widgetopen", {
      detail: this.card.classList.contains("card-active")
    });
    this.shadowRoot.host.dispatchEvent(event);
  }

  // --- data prop  ---
  dataProp() {
    let dataArray = this.getAttribute("data");

    // if data prop is string convert it to a js array
    if (typeof dataArray === "string") {
      try {
        dataArray = eval(dataArray.replace(/\s+/g, " "));
      } catch (e) {
        this.error = true;
        window.console.error(
          "Receptionist 'data' attribute is invalid. please provide a valid array."
        );
      }
    }
    if (!this.error) {
      if (window.Array.isArray(dataArray)) {
        if (dataArray.length === 0) {
          this.noDataNotice.classList.add("show");
        } else {
          // check if all 'data' array objects have a valid name && description properties
          dataArray.forEach(listItem => {
            if (!this.error) {
              if (typeof listItem === "object" && listItem !== null) {
                if (
                  !listItem.name ||
                  typeof listItem.name !== "string" ||
                  (listItem.name && listItem.name.length === 0)
                ) {
                  this.error = true;
                  window.console.error(
                    "all Receptionist 'data' array objects should have a valid 'name' property"
                  );
                } else if (
                  !listItem.description ||
                  typeof listItem.description !== "string" ||
                  (listItem.description && listItem.description.length === 0)
                ) {
                  this.error = true;
                  window.console.error(
                    "all Receptionist 'data' array objects should have a valid 'description' property"
                  );
                } else if (
                  listItem.checked !== undefined &&
                  typeof listItem.checked !== "boolean"
                ) {
                  this.error = true;
                  window.console.error(
                    "all Receptionist 'data' array objects should have a 'checked' property of type boolean"
                  );
                }
              } else {
                this.error = true;
                window.console.error(
                  "Receptionist 'data' array should contain objects with a valid 'name' & 'description' property"
                );
              }
            }
          });
          if (!this.error) {
            // before adding any new list items make sure to remove any old ones
            [...this.list.children].forEach(listItem => listItem.remove());

            // data prop is valid so loop through the array and add all list items to the list
            dataArray.forEach(listItem => {
              const li = window.document.createElement("li");
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
              this.list.appendChild(li);
            });

            // calculate percentage of the checked items and show it at the header of the card
            const checkedItemsNumber = dataArray.filter(
              listItem => listItem.checked
            ).length;
            let donePercentage = (checkedItemsNumber * 100) / dataArray.length;
            // format percentage
            donePercentage = Number.isInteger(donePercentage)
              ? donePercentage
              : donePercentage.toFixed(2);

            // update percentage text
            this.percentageText.innerHTML = `${donePercentage}%`;
            // update progress bar (update progress value attribute)
            this.progressBar.setAttribute("value", donePercentage);
          }
        }
      } else if (dataArray !== null) {
        window.console.error(
          "Receptionist 'data' attribute should be an array"
        );
      } else {
        this.noDataNotice.classList.add("show");
      }
    }
  }

  // --- settings prop ---
  settingsProp() {
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
        this.error = true;
        window.console.error(
          "Receptionist 'settings' attribute is invalid. please provide a valid object."
        );
      }
    }
    if (!this.error) {
      // settings object validation
      if (typeof settings === "object" && settings !== null) {
        const style = this.shadowRoot.querySelector("style");
        // settings backgroundColor validation
        if (
          settings.backgroundColor &&
          typeof settings.backgroundColor === "string" &&
          settings.backgroundColor.match(/^#[0-9a-f]{3,6}$/i)
        ) {
          style.innerHTML = style.innerHTML.replace(
            /--bg: #[0-9a-f]{3,6};/i,
            `--bg: ${settings.backgroundColor};`
          );
        } else if (
          settings.backgroundColor !== null &&
          settings.backgroundColor !== undefined
        ) {
          this.error = true;
          window.console.error(
            "Receptionist 'backgroundColor' should use a valid hex color format '#000000'"
          );
        }

        // settings textColor validation
        if (!this.error) {
          if (
            settings.textColor &&
            typeof settings.textColor === "string" &&
            settings.textColor.match(/^#[0-9a-f]{3,6}$/i)
          ) {
            style.innerHTML = style.innerHTML.replace(
              /--txt: #[0-9a-f]{3,6};/i,
              `--txt: ${settings.textColor};`
            );
          } else if (
            settings.textColor !== null &&
            settings.textColor !== undefined
          ) {
            this.error = true;
            window.console.error(
              "Receptionist 'textColor' should have a valid hex color format '#ffffff'"
            );
          }
        }
      } else if (settings !== null) {
        this.error = true;
        window.console.error(
          "Receptionist 'settings' attribute should be an object"
        );
      }
    }
  }

  // --- open prop ---
  openProp() {
    let open = this.getAttribute("open");
    if (typeof open === "string") {
      open = open.replace(/\s+|'+|"+|\n+/g, "").toLowerCase();
      try {
        open = open === "true";
      } catch (e) {
        this.error = true;
        window.console.error(
          "Receptionist 'open' attribute is invalid. please provide a boolean value."
        );
      }
    }

    if (!this.error && open !== null && open !== undefined) {
      if (typeof open === "boolean") {
        this.toggleShowWidget(open);
      } else {
        this.error = true;
        window.console.error(
          "Receptionist 'open' attribute is invalid. please provide a boolean value."
        );
      }
    }
  }
  // Fires when Receptionist gets inserted into the document
  async connectedCallback() {
    const _this = this;
    // Set component template (HTML)
    this.attachShadow({ mode: "open" }).innerHTML = this.template;

    // Setting ShadowDOM elements
    this.fab = this.shadowRoot.querySelector(".fab");
    this.card = this.shadowRoot.querySelector(".card");
    this.list = this.shadowRoot.querySelector(".list");
    this.noDataNotice = this.shadowRoot.querySelector(".empty-list-notice");
    this.percentageText = this.shadowRoot.querySelector(
      ".header-percentage-number"
    );
    this.progressBar = this.shadowRoot.querySelector(".header-progress-bar");
    this.closedText = this.shadowRoot.querySelector(".fab-closed-text");
    this.openedText = this.shadowRoot.querySelector(".fab-opened-text");

    //  === all Receptionist props (settings,data...) ===
    // props initial setup
    this.dataProp();
    this.settingsProp();
    this.openProp();
    // TODO: move this to `attributeChangedCallback`
    // props listener setup for any attribute changes
    const observer = new MutationObserver(mutations => {
      mutations.forEach(function(mutation) {
        if (mutation.type === "attributes") {
          if (mutation.attributeName === "settings") {
            _this.settingsProp();
          } else if (mutation.attributeName === "data") {
            _this.dataProp();
          } else if (mutation.attributeName === "open") {
            _this.openProp();
          }
        }
      });
    });
    observer.observe(this.shadowRoot.host, {
      attributes: true //configure it to listen to attribute changes
    });

    // FAB button click event handler
    this.fab.addEventListener("click", e => {
      // toggle open / close receptionist widget on click
      this.toggleShowWidget();
      // dispatch a custom event for <saas-receptionist> to indicate fab button clicked
      let event = new CustomEvent("widgetclick", e);
      this.shadowRoot.host.dispatchEvent(event);
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
