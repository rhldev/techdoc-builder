import { CategoryWhereUniqueInput } from "../category/CategoryWhereUniqueInput";

export type DeviceWhereInput = {
  id?: string;
  createdAt?: Date;
  name?: string;
  updatedAt?: Date;
  category?: CategoryWhereUniqueInput;
};
