import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User> & {
  validatePassword: (password: string) => Promise<boolean>;
};

@Schema({ timestamps: true })
export class User {
  @Prop({
    required: true,
    validate: {
      validator: async function (email: string) {
        const user = await this.constructor.findOne({ email });

        if (user && this.id !== user.id) {
          return false;
        }

        return true;
      },
      message: () => 'There is already a user with this email',
    },
  })
  email: string;

  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
