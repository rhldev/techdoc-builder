import { GuideWhereUniqueInput } from "../guide/GuideWhereUniqueInput";

export type StepUpdateInput = {
  title?: string | null;
  orderBy?: number;
  guide?: GuideWhereUniqueInput | null;
};
