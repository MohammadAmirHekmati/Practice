import { Controller, Post, Body } from '@nestjs/common';
import { LoginUserDto } from '../Dtos/login.dto';
import { LoginUserService } from '../Services/loginUser.service';

@Controller('user/login')
export class LoginController {
  constructor(
    private readonly loginUserService: LoginUserService,
    // private readonly loginResendEmailService: LoginResendEmailService,
    // private readonly loginVerifyService: LoginVerifyService,
  ) { }

  @Post()
  async loginUser(@Body() body: LoginUserDto) {
    return await this.loginUserService.loginUser(body);
  }

  // @Post('resend-email')
  // async loginResendEmail(data: { session: SessionType }) {
  //   return await this.loginResendEmailService.loginResendEmail(data.session);
  // }

  // @Post('verify')
  // async loginVerify(data: { body: EmailCodeType, session: SessionType }) {
  //   return await this.loginVerifyService.loginVerify(data.body, data.session);
  // }
}
