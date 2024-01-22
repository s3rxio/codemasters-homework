import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserService } from "./user.service";

@NgModule({
  declarations: [],
  providers: [UserService],
  imports: [CommonModule],
  exports: []
})
export class UserModule {}
