class DataService {
  constructor() {
    this.colors = this._onStorageChange();
  }

  add(color) {
    this.colors.push(new DataModel({ color }));
    this._commitChanges(this.colors);
  }

  update(data) {
    this.colors.forEach((color) => {
      data.forEach((element) => {
        if (color.id == element.id) {
          color.checked = element.checked;
        }
      });
    });
    this._commitChanges(this.colors);
  }

  delete() {
    localStorage.clear();
    this.colors = this._onStorageChange();
  }

  filter(filterText) {
    if (filterText) {
      this.dataFiltered = this.colors.filter((color) => {
        return color.type === filterText;
      });
    } else {
      this.dataFiltered = this.colors;
    }
    return this.dataFiltered;
  }

  _commitChanges(colors) {
    localStorage.setItem("colors", JSON.stringify(colors));
    this.colors = this._onStorageChange();
  }
  _onStorageChange() {
    return (
      JSON.parse(localStorage.getItem("colors")) || [
        { id: 1, type: "primario", color: "rojo", checked: true },
        { id: 2, type: "primario", color: "amarillo", checked: false },
        { id: 3, type: "primario", color: "azul", checked: false },
        { id: 4, type: "secundario", color: "naranja", checked: true },
        { id: 5, type: "secundario", color: "verde", checked: true },
      ]
    );
  }
}
