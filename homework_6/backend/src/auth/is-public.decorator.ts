import { SetMetadata } from "@nestjs/common";

export const IS_PUBLIC_KEY = "isPublic";

export const IsPublic = (flag: boolean = true) =>
  SetMetadata(IS_PUBLIC_KEY, flag);
