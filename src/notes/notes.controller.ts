import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { Request } from 'express';
import { AuthUser } from '@/auth/auth.interface';
import { CreateNoteDto, UpdateNoteDto } from './notes.dto';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  create(@Req() req: Request, @Body() createNoteDto: CreateNoteDto) {
    const loggedInUser = <AuthUser>req.user;
    return this.notesService.create(loggedInUser.id, createNoteDto);
  }

  @Get()
  findAll(@Req() req: Request) {
    const loggedInUser = <AuthUser>req.user;
    return this.notesService.findAll(loggedInUser.id);
  }

  @Get(':id')
  async findOne(@Req() req: Request, @Param('id') id: string) {
    const loggedInUser = <AuthUser>req.user;
    const note = await this.getUserNote(loggedInUser.id, id);

    return note;
  }

  @Patch(':id')
  async update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() updateNoteDto: UpdateNoteDto,
  ) {
    const loggedInUser = <AuthUser>req.user;
    await this.getUserNote(loggedInUser.id, id);

    return this.notesService.update(id, updateNoteDto);
  }

  @Delete(':id')
  async remove(@Req() req: Request, @Param('id') id: string) {
    const loggedInUser = <AuthUser>req.user;
    await this.getUserNote(loggedInUser.id, id);

    return this.notesService.remove(id);
  }

  private async getUserNote(userId: string, noteId: string) {
    const note = await this.notesService.findOne(noteId);

    if (!note) {
      throw new NotFoundException('Note with the given id does not exist');
    }

    if (note.user != userId) {
      throw new ForbiddenException(
        'You are not authorised to access this resource',
      );
    }

    return note;
  }
}
