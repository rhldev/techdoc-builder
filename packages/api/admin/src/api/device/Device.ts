import { CategoryWhereUniqueInput } from "../category/CategoryWhereUniqueInput";

export type Device = {
  id: string;
  createdAt: Date;
  name: string;
  updatedAt: Date;
  category: CategoryWhereUniqueInput;
};
