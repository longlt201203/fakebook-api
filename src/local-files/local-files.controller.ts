import { Controller, Get, Param, Post, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { LocalFilesService } from './local-files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { UploadFileDto } from './dto/upload-file.dto';
import { Response } from 'express';
import { Request } from '@utils';

@Controller('local-files')
@ApiTags("local-files")
export class LocalFilesController {
  constructor(private readonly localFilesService: LocalFilesService) {}

  @Post()
  @ApiConsumes("multipart/form-data")
  @ApiBody({ type: UploadFileDto })
  @UseInterceptors(FileInterceptor("file"))
  async create(@UploadedFile() file: Express.Multer.File, @Req() req: Request) {
    const info = await this.localFilesService.createLocalFile(file.filename, file.path);
    let url = `${req.protocol}://${req.headers.host}/local-files/${info.id}`;  
    return { url };
  }

  @Get(":id")
  async retrieve(@Param("id") id: string, @Res() res: Response) {
    const info = await this.localFilesService.getLocalFileInfo(id);
    return res.sendFile(info.diskPath, { root: "." });
  }
}
