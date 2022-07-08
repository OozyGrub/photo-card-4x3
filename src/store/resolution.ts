import { makeAutoObservable } from "mobx";

export enum ResolutionMode {
  DISPLAY = "display",
  EXPORT = "export",
}
class Resolution {
  ppi: number = 0;

  constructor() {
    makeAutoObservable(this);
    this.set(ResolutionMode.DISPLAY);
  }

  set(mode: ResolutionMode) {
    switch (mode) {
      case ResolutionMode.EXPORT:
        this.ppi = 300;
        break;
      case ResolutionMode.DISPLAY:
        this.ppi = 75;
        break;
    }
  }
}

export const resolution = new Resolution();
