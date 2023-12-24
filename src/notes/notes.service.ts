import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Note } from './notes.schema';
import { CreateNoteDto, UpdateNoteDto } from './notes.dto';

@Injectable()
export class NotesService {
  constructor(@InjectModel(Note.name) private noteModel: Model<Note>) {}

  create(userId: string, createNoteDto: CreateNoteDto) {
    const note = new this.noteModel({ ...createNoteDto, user: userId });
    return note.save();
  }

  findAll(userId?: string) {
    if (userId) {
      return this.noteModel.find({ user: userId });
    }

    return this.noteModel.find();
  }

  findOne(id: string) {
    return this.noteModel.findById(id);
  }

  update(id: string, updateNoteDto: UpdateNoteDto) {
    return this.noteModel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $set: updateNoteDto,
      },
      {
        new: true,
      },
    );
  }

  remove(id: string) {
    return this.noteModel.findByIdAndDelete(id);
  }
}
