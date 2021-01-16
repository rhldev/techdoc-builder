import { GuideWhereUniqueInput } from "../guide/GuideWhereUniqueInput";

export type StepCreateInput = {
  title?: string | null;
  orderBy: number;
  guide?: GuideWhereUniqueInput | null;
};
