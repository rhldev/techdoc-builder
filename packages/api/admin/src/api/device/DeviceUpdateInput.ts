import { CategoryWhereUniqueInput } from "../category/CategoryWhereUniqueInput";

export type DeviceUpdateInput = {
  name?: string;
  category?: CategoryWhereUniqueInput;
};
