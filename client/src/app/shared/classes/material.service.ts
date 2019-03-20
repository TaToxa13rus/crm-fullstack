declare var M;

export class MaterialService {
  static toast(message: string) {
    M.toast({html: message});
  }

  static initializeFloatingButton(element) {
    M.FloatingActionButton.init(element);
  }

  static updateTextInputs() {
    M.updateTextFields();
  }
}
