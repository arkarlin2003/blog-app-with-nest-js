import { Meta } from 'src/metas/entities/metas.entity';
import { Tag } from 'src/tags/entities/tags.entity';
import { User } from 'src/users/entities/users.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  title: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  slug: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  content: string;

  @Column({
    type: 'timestamp', // 'datetime' in mysql
    nullable: true,
  })
  publishOn?: Date;

  @OneToOne(() => Meta, (meta) => meta.post, {
    cascade: true,
    eager: true,
  })
  meta?: Meta;

  @ManyToOne(() => User, (user) => user.posts, {
    // eager:true
    onDelete: 'CASCADE',
  })
  user: User;

  @ManyToMany(()=>Tag,(tag)=>tag.posts)
  @JoinTable()
  tags?:Tag[]
}
