import { StepWhereUniqueInput } from "../step/StepWhereUniqueInput";

export type LineCreateInput = {
  text?: string | null;
  bullet: string;
  level: number;
  orderBy: number;
  step?: StepWhereUniqueInput | null;
};
