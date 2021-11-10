class DataModel {
  constructor({ color, type, checked }) {
    this.id = this.idGenerator();
    this.color = color;
    type ? (this.type = type) : (this.type = "otro");
    checked ? (this.checked = checked) : (this.checked = false);
  }
  idGenerator() {
    const id = new Date().getTime();
    return id;
  }
}
