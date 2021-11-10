class DataView {
  constructor() {
    this.form = document.querySelector(".form");
    this.formInput = this.form.querySelector(".form__input");
    this.formButton = this.form.querySelector(".form__btn");
    this.select = document.querySelector(".select");
    this.table = document.querySelector(".table");

    this.deleteButton = document.querySelector(".btn__delete");
    this.saveButton = document.querySelector(".btn__save");

    this._temporaryColor = "";
    this._temporaryNewData = [];
    this.dataFiltered = [];

    this._addListener();
  }

  get _color() {
    return this.formInput.value;
  }

  _resetInput() {
    this.formInput.value = "";
  }

  render(data) {
    this.table.innerHTML = "";
    if (data.length === 0) {
      const p = document.createElement("p");
      p.innerText = "No hay datos que mostrar";
      this.table.parentNode().appendChild(p);
    } else {
      for (let element of data) {
        const tr = document.createElement("tr");
        const td1 = document.createElement("td");
        const td2 = document.createElement("td");
        tr.setAttribute("id", element.id);
        td1.innerText = element.color;
        td2.innerHTML = `<input value=${element.id} type="checkbox" ${
          element.checked ? "checked" : ""
        }/>`;
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.childNodes[1].childNodes[0].addEventListener("change", (e) =>
          this._updateData(e)
        );
        this.table.appendChild(tr);
      }
    }
  }

  bindAddColor(handler) {
    this.formButton.addEventListener("click", (e) => {
      e.preventDefault();
      this._temporaryColor && handler(this._temporaryColor);
      this._resetInput();
    });
  }

  bindDeleteColors(handler) {
    this.deleteButton.addEventListener("click", (e) => {
      e.preventDefault();
      handler();
    });
  }

  _updateData(e) {
    this._modified = this._temporaryNewData.find((element) => {
      return element.id === e.target.value;
    });

    this._modified
      ? (this._modified.checked = e.target.checked)
      : this._temporaryNewData.push({
          id: e.target.value,
          checked: e.target.checked,
        });
  }

  bindUpdateColors(handler) {
    this.saveButton.addEventListener("click", (e) => {
      e.preventDefault();
      this._temporaryNewData && handler(this._temporaryNewData);
      this.dataFiltered = [];
    });
  }

  bindFilterColors(handler) {
    this.select.addEventListener("change", (e) => {
      this.dataFiltered = handler(e.target.value);
      this.render(this.dataFiltered);
    });
  }

  _addListener() {
    this.formInput.addEventListener("input", (e) => {
      this._temporaryColor = e.target.value;
    });
  }
}
