import { StepWhereUniqueInput } from "../step/StepWhereUniqueInput";

export type Line = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  text: string | null;
  bullet: string;
  level: number;
  orderBy: number;
  step: StepWhereUniqueInput | null;
};
