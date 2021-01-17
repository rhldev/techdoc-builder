import { LineWhereUniqueInput } from "./LineWhereUniqueInput";
import { LineUpdateInput } from "./LineUpdateInput";

export type UpdateLineArgs = {
  where: LineWhereUniqueInput;
  data: LineUpdateInput;
};
