import { Body, Controller, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthGuard, CurrentUser, ForRoles, Role, RoleGuard } from '@auth';
import { Account } from '@entities';
import { PostFilterDto } from './dto/post-filter.dto';
import { PaginationDto } from '@utils';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
@ApiTags("posts")
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  // @ForRoles([Role.USER])
  // @UseGuards(RoleGuard)
  async create(@Body() dto: CreatePostDto, @CurrentUser() account: Account) {
    await this.postsService.createPost(dto, account.id);
    return { message: "Create post successfully!" };
  }

  @Get()
  async fetchPosts(@Query() filter: PostFilterDto) {
    const [posts, count] = await this.postsService.findAll(filter);
    return PaginationDto.from(posts, filter, count);
  }

  @Put(":id")
  @ApiParam({ name: "id", type: Number })
  async update(@Param("id") id: number, @CurrentUser() account: Account, @Body() dto: UpdatePostDto) {
    await this.postsService.updatePost(id, account.id, dto);
    return { message: "Update post successfully!" };
  }
}
