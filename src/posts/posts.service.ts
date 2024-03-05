import { Post } from '@entities';
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsRelations, Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { PostFilterDto } from './dto/post-filter.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post)
        private readonly postRepo: Repository<Post>
    ) {}

    createPost(dto: CreatePostDto, accountId: string) {
        const post = this.postRepo.create({
            ...dto,
            author: {
                id: accountId
            }
        });
        return this.postRepo.save(post);
    }

    findAll(dto: PostFilterDto) {
        return this.postRepo.findAndCount({ relations: { author: { detail: true } }, take: dto.take, skip: dto.take*(dto.page-1) }); 
    }

    findByAccountId(accountId: string, dto: PostFilterDto) {
        return this.postRepo.findAndCount({ where: {
            author: {
                id: accountId
            }
        }, relations: { author: { detail: true } }, take: dto.take, skip: dto.take*(dto.page-1) });
    }

    async findOne(id: number, relations?: FindOptionsRelations<Post>) {
        const post = await this.postRepo.findOne({ where: { id: id }, relations: relations });
        if (!post) {
            throw new NotFoundException("Post not found!");
        }
        return post;
    }

    async updatePost(id: number, accountId: string, dto: UpdatePostDto) {
        const post = await this.findOne(id, { author: true });
        if (!post.author || accountId != post.author.id) {
            throw new ForbiddenException();
        }
        post.content = dto.content;
        return await this.postRepo.save(post);
    }
}
