import { Post } from 'src/posts/entities/posts.entity';
import {
  Column,
  Entity,
  ManyToMany,
  PrimaryColumnCannotBeNullableError,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  @Column()
  slug: string;

  @ManyToMany(()=>Post,(post)=>post.tags)
  posts:Post[]
}
