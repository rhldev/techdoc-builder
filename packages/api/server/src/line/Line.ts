import { ObjectType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsDate,
  IsOptional,
  IsInt,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { StepWhereUniqueInput } from "../step/StepWhereUniqueInput";
@ObjectType()
class Line {
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  id!: string;
  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  createdAt!: Date;
  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  updatedAt!: Date;
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  text!: string | null;
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
  step!: StepWhereUniqueInput | null;
}
export { Line };
