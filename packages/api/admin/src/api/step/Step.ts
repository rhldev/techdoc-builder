import { GuideWhereUniqueInput } from "../guide/GuideWhereUniqueInput";

export type Step = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string | null;
  orderBy: number;
  guide: GuideWhereUniqueInput | null;
};
