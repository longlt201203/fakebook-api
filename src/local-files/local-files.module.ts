import { Module } from '@nestjs/common';
import { LocalFilesService } from './local-files.service';
import { LocalFilesController } from './local-files.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocalFile } from '@entities';
import { MulterModule } from '@nestjs/platform-express';
import * as fs from "fs";
import * as multer from 'multer';

const uploadsFolder = "uploads";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(uploadsFolder)) {
      fs.mkdirSync(uploadsFolder);
    }
    cb(null, uploadsFolder);
  },
  filename: (req, file, cb) => {
    const fileInfo = file.originalname.split(".");
    let filename = file.originalname;
    let filepath = `${uploadsFolder}/${filename}`;
    let i = 1;
    while (fs.existsSync(filepath)) {
      filename = fileInfo[0] + ` (${i})` + (fileInfo.length > 1 ? "." + fileInfo[1] : "");
      filepath = `${uploadsFolder}/${filename}`;
      i++;
    }
    cb(null, filename);
  }
});

@Module({
  imports: [MulterModule.register({ storage }), TypeOrmModule.forFeature([LocalFile])],
  controllers: [LocalFilesController],
  providers: [LocalFilesService],
})
export class LocalFilesModule {}
