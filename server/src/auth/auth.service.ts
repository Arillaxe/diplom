import { uuid } from 'uuidv4';
import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';
import { CreateUserDto, SignUpUserDto } from 'src/user/user.dto';
import { User } from 'src/user/user.model';
import { UserService } from '../user/user.service';
import { SignInUserDto } from './auth.dto';
import { PasswordReset } from './passwordReset.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly mailService: MailService,
    @Inject('PASSWORD_RESET_MODEL') private readonly passwordResetModel: typeof PasswordReset,
  ) {}

  getUserById(userId: number) {
    return this.userService.findById(userId); 
  }

  async signIn(user: SignInUserDto) {
    const { login, fullName, password } = user;

    const foundUser = await this.userService.findByLogin(login);

    if (!foundUser || !this.checkUserFullName(foundUser, fullName)) {
      throw { message: 'Invalid login/fullName/password combination', status: 400 };
    }

    const { lastSignIn } = foundUser;

    if (lastSignIn && !await foundUser.validatePassword(password)) {
      throw { message: 'Invalid login/fullName/password combination', status: 400 };
    }

    if (!lastSignIn) {
      await foundUser.setPassword(password);

      await foundUser.save();
    }

    await foundUser.update({ lastSignIn: Date.now() });

    const accessToken = this.jwtService.sign(foundUser.toAuthJSON());

    return {
      user: foundUser.toAuthJSON(),
      accessToken,
    };
  }

  private checkUserFullName(user: User, fullName: string): Boolean {
    const [lastName, name, surname] = fullName.split(' ');

    if (lastName !== user.lastName || name !== user.name || surname !== user.surname) return false;

    return true;
  }

  async signUpUser(user: SignUpUserDto) {
    const createdUser = await this.userService.signUp(user);
    const accessToken = this.jwtService.sign(createdUser.toAuthJSON());

    return {
      user: createdUser.toAuthJSON(),
      accessToken,
    };
  }

  async createUser(user: CreateUserDto) {
    const createdUser = await this.userService.create(user);

    return {
      user: createdUser.toAuthJSON(),
    };
  }

  async requestResetPassword(login: string, email: string) {
    const user = await this.userService.findByLogin(login);

    if (!user) {
      throw { status: 404, message: 'No user found' };
    }

    if (!user.email && email) {
      throw { status: 400, message: 'Please specify an email' };
    }

    const key = uuid();

    await this.passwordResetModel.create({ key, userId: user.id });

    const emailToSendTo = user.email || email;

    await this.mailService.sendPasswordResetLink(emailToSendTo, `http://localhost:3000/passwordReset/${key}`);

    return { status: 200, message: 'Successefully sent password reset link to users email' };
  }

  async resetPassword(key: string, password: string) {
    const passwordReset = await this.passwordResetModel.findOne({ where: { key } });

    const passwordResetTTL = +process.env.PASSWORD_RESET_TTL;

    if (!passwordReset || (passwordResetTTL && Date.now() - passwordReset.createdAt > passwordResetTTL)) {
      throw { status: 404, message: 'Invalid link' };
    }

    const user = await this.userService.findById(passwordReset.userId);

    await user.setPassword(password);

    await user.save();
    await passwordReset.destroy();

    return { status: 200, message: 'Password changed successefully!' };
  }
}
