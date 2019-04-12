declare var M;

export interface IMaterialInstance {
  open?(): void;
  close?(): void;
  destroy?(): void;
}

export interface IMaterialDatepicker extends IMaterialInstance {
  date?: Date;
}

export class MaterialService {
  static toast(message: string) {
    M.toast({ html: message });
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

  static initTooltip(element): IMaterialInstance {
    return M.Tooltip.init(element);
  }

  static initTapTarget(element): IMaterialInstance {
    return M.TapTarget.init(element);
  }

  static initDatepicker(element, onClose: () => void): IMaterialDatepicker {
    return M.Datepicker.init(element, {
      format: 'dd.mm.yyyy',
      showClearBtn: true,
      onClose
    });
  }
}
