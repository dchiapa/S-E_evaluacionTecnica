class DataController {
  constructor(DataService, DataView) {
    this.dataService = DataService;
    this.dataView = DataView;

    this.dataView.bindAddColor(this.handleAddColor);
    this.dataView.bindUpdateColors(this.handleUpdateColors);
    this.dataView.bindDeleteColors(this.handleDeleteColors);
    this.dataView.bindFilterColors(this.handleFilterdColors);

    this.onColorListChanged(this.dataService.colors);
  }

  onColorListChanged = (colors) => {
    this.dataView.render(colors);
  };

  handleAddColor = (color) => {
    this.dataService.add(color);
    this.onColorListChanged(this.dataService.colors);
  };

  handleUpdateColors = (data) => {
    this.dataService.update(data);
  };

  handleDeleteColors = () => {
    this.dataService.delete();
    this.onColorListChanged(this.dataService.colors);
  };

  handleFilterdColors = (filterText) => {
    return this.dataService.filter(filterText);
  };
}
