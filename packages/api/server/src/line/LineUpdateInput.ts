import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional, IsInt, ValidateNested } from "class-validator";
import { StepWhereUniqueInput } from "../step/StepWhereUniqueInput";
import { Type } from "class-transformer";
@InputType()
class LineUpdateInput {
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  text?: string | null;
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  bullet?: string;
  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsInt()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  level?: number;
  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsInt()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  orderBy?: number;
  @ApiProperty({
    required: false,
    type: StepWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => StepWhereUniqueInput)
  @IsOptional()
  @Field(() => StepWhereUniqueInput, {
    nullable: true,
  })
  step?: StepWhereUniqueInput | null;
}
export { LineUpdateInput };
