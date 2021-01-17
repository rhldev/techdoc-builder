import { CategoryWhereUniqueInput } from "../category/CategoryWhereUniqueInput";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";
import { DeviceWhereUniqueInput } from "../device/DeviceWhereUniqueInput";

export type GuideUpdateInput = {
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
