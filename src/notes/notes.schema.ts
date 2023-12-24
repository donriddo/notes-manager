import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/users/users.schema';

export type NoteDocument = HydratedDocument<Note>;

@Schema({ timestamps: true })
export class Note {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  content: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: string | User;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
