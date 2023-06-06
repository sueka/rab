declare namespace ClassesCssNamespace {
  export interface IClassesCss {
    Chessman: string;
    Dragging: string;
    Preview: string;
  }
}

declare const ClassesCssModule: ClassesCssNamespace.IClassesCss;

export = ClassesCssModule;
