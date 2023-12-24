import { compare, hash } from 'bcrypt';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './users.schema';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;

          schema.pre('save', async function (next) {
            if (this.isModified('password')) {
              this['password'] = await hash(this['password'], 10);
            }

            next();
          });

          schema.methods.validatePassword = async function (password: string) {
            return await compare(password, this['password']);
          };

          schema.methods.toJSON = function () {
            const user = this.toObject();

            delete user['password'];

            return user;
          };

          return schema;
        },
      },
    ]),
  ],
  exports: [MongooseModule, UsersService],
  providers: [UsersService],
})
export class UsersModule {}
