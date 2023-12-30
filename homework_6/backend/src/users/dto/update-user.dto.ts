import { OmitType, PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";
import { IsUrl } from "class-validator";

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ["code"])
) {
  @IsUrl()
  avatarUrl: string;
}
