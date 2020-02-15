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
