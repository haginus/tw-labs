import { Type } from "@angular/core";
import { LabMeta } from "./LabMeta";

export class Lab {
  constructor(public component: Type<any>, public meta: LabMeta) {}
}

