declare namespace ClassesCssNamespace {
  export interface IClassesCss {
    Container: string;
    Pre: string;
    TextArea: string;
  }
}

declare const ClassesCssModule: ClassesCssNamespace.IClassesCss;

export = ClassesCssModule;
