import { makeAutoObservable } from "mobx";

export enum ResolutionMode {
  DISPLAY = "display",
  EXPORT = "export",
}
class Resolution {
  ppi: number = 150;

  constructor() {
    makeAutoObservable(this);
  }

  set(mode: ResolutionMode) {
    switch (mode) {
      case ResolutionMode.EXPORT:
        this.ppi = 300;
        break;
      case ResolutionMode.DISPLAY:
        this.ppi = 150;
        break;
    }
  }
}

export const resolution = new Resolution();
