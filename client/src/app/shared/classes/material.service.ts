declare var M;

export interface IMaterialInstance {
  open?(): void;
  close?(): void;
  destroy?(): void;
}

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

  static initModal(element): IMaterialInstance {
    return M.Modal.init(element);
  }
}
