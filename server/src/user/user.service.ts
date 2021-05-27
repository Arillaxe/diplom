import { Op } from 'sequelize';
import { Injectable, Inject } from '@nestjs/common';
import { User } from './user.model';
import { CreateUserDto, SignUpUserDto, UpdateUserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(@Inject('USER_MODEL') private userModel: typeof User) {}

  findById(id: number): Promise<User> {
    return this.userModel.findOne<User>({ where: { id } });
  }

  findByEmail(email: string): Promise<User> {
    return this.userModel.findOne<User>({ where: { email } });
  }

  findAll(): Promise<User[]> {
    return this.userModel.findAll<User>();
  }

  findByLogin(login: string): Promise<User> {
    return this.userModel.findOne<User>({
      where: {
        [Op.or]: [
          { contractNumber: login },
          { email: login },
          { phone: login },
        ],
      },
    });
  }

  async signUp(userDto: SignUpUserDto) {
    const { password, ...withoutPassword } = userDto;
    const createdUser = await this.userModel.create(withoutPassword);

    await createdUser.setPassword(password);

    return await createdUser.save();
  }

  async create(userDto: CreateUserDto) {
    const { email, phone, contractNumber } = userDto;

    if (!email && !phone && !contractNumber) {
      throw { errors: [{ message: 'Atleast one of the fields should be specified: email, phone, contractNumber' }] };
    }

    const createdUser = await this.userModel.create(userDto);

    return await createdUser.save();
  }

  async update(userDto: UpdateUserDto) {
    const { email, phone, contractNumber } = userDto;
    const login = email || phone || contractNumber;

    if (!login) {
      throw { errors: [{ message: 'Atleast one of the fields should be specified: email, phone, contractNumber' }] };
    }

    const user = await this.findByLogin(login);

    await user.update(userDto);

    return user;
  }

  delete(id: number) {
    return this.userModel.destroy({ where: { id } });
  }
}
