import { CategoryWhereUniqueInput } from "../category/CategoryWhereUniqueInput";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";
import { DeviceWhereUniqueInput } from "../device/DeviceWhereUniqueInput";

export type GuideWhereInput = {
  createdAt?: Date;
  id?: string;
  updatedAt?: Date;
  obsolete?: Date | null;
  title?: string | null;
  conclusion?: string | null;
  publishedOn?: Date | null;
  introduction?: string | null;
  type?: string | null;
  category?: CategoryWhereUniqueInput | null;
  user?: UserWhereUniqueInput | null;
  device?: DeviceWhereUniqueInput | null;
};
