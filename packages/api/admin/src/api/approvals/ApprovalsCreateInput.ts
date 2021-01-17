import { GuideWhereUniqueInput } from "../guide/GuideWhereUniqueInput";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type ApprovalsCreateInput = {
  changeData: string;
  guide: GuideWhereUniqueInput;
  originalData: string;
  owner: UserWhereUniqueInput;
  requestor: UserWhereUniqueInput;
};
