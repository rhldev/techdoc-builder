import { CategoryWhereUniqueInput } from "../category/CategoryWhereUniqueInput";

export type DeviceCreateInput = {
  name: string;
  category: CategoryWhereUniqueInput;
};
