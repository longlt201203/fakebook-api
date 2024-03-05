import { LocalFile } from '@entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class LocalFilesService {
    constructor(
        @InjectRepository(LocalFile)
        private readonly localFileRepo: Repository<LocalFile>
    ) {}

    createLocalFile(filename: string, path: string) {
        const localFile = this.localFileRepo.create({
            diskPath: path,
            fileName: filename
        });
        return this.localFileRepo.save(localFile);
    }

    getLocalFileInfo(id: string) {
        return this.localFileRepo.findOne({ where: { id: id } });
    }
}
