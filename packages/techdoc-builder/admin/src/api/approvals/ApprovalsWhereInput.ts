import { GuideWhereUniqueInput } from "../guide/GuideWhereUniqueInput";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type ApprovalsWhereInput = {
  changeData?: string;
  createdAt?: Date;
  guide?: GuideWhereUniqueInput;
  id?: string;
  originalData?: string;
  owner?: UserWhereUniqueInput;
  requestor?: UserWhereUniqueInput;
  updatedAt?: Date;
};
