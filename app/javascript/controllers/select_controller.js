import ApplicationController from './application_controller';
import Select from 'svelte-select';
import StimulusReflex from "stimulus_reflex";

// The stimulus controller won't reconnect unless the controller detaches first
document.addEventListener('cable-ready:before-morph', (event) => {
  const topLevel = document.querySelector(event.detail.selector);
  const controllers = topLevel.querySelectorAll('[data-controller="select"]');
  controllers.forEach(element => {
    const parent = element.parentNode;
    parent.removeChild(element);
  })
})

export default class extends ApplicationController {
  static targets = ["select"];

  get clearable() {
    return this.data.get('clearable') === "true";
  }

  get creatable() {
    return this.data.get('creatable') === 'true';
  }

  get multiple() {
    return this.data.get('multiple') === 'true';
  }

  get value() {
    return this.data.get("value");
  }

  get url() {
    return this.data.get("url");
  }

  get selected() {
    return this.data.get("selected");
  }

  set selected(newSelected) {
    this.data.set("selected", newSelected);
  }

  initialize() {
    console.log("Connecting", this.value);
    StimulusReflex.register(this)
    this.selectTarget.classList.add("d-none");
    let selected = this.multiple ? [] : null;

    this.select = new Select({
      target: this.element,
      props: {
        items: [],
        isVirtualList: true,
        isDisabled: this.selectTarget.disabled,
        selectedValue: selected,
        isClearable: this.clearable,
        isCreatable: this.creatable,
        isMulti: this.multiple,
        loadOptions: async (filterText) => {
          const resp = await fetch(`${this.url}?q=${filterText}`);
          return await resp.json();
        }
      }
    });

    this.select.$on("select", e => {
      const event = new Event('change');
      this.selected = JSON.stringify(e.detail);
      this.selectTarget.value = this.selected;
      console.log(this.selectTarget.value);
      this.selectTarget.dispatchEvent(event);
    });

    this.select.$on("clear", e => {
      const event = new Event('change');
      this.selectTarget.value = "";
      this.selectTarget.dataset.value = "";
      this.selectTarget.dispatchEvent(event);
    });
  }

  disconnect() {
    try {
      this.select.$destroy();
    } catch (e) {

    }
  }
}
