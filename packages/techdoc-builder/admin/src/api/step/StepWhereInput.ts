import { GuideWhereUniqueInput } from "../guide/GuideWhereUniqueInput";

export type StepWhereInput = {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  title?: string | null;
  orderBy?: number;
  guide?: GuideWhereUniqueInput | null;
};
