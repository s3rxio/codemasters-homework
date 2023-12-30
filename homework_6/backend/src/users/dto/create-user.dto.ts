import { Exclude } from "class-transformer";
import { IsNotEmpty, IsNumberString, IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @Exclude({ toPlainOnly: true })
  @IsNumberString()
  @IsNotEmpty()
  code: string;
}
