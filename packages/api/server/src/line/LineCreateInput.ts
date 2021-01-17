import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional, IsInt, ValidateNested } from "class-validator";
import { StepWhereUniqueInput } from "../step/StepWhereUniqueInput";
import { Type } from "class-transformer";
@InputType()
class LineCreateInput {
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
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  bullet!: string;
  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsInt()
  @Field(() => Number)
  level!: number;
  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsInt()
  @Field(() => Number)
  orderBy!: number;
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
export { LineCreateInput };
