import { LabMeta } from "./LabMeta";

export interface ILabComponent {
  meta?: LabMeta;
  ngOnInit(): void;
}