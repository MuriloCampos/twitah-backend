import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tweets')
class Tweet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  message: string;

  @Column('time with time zone')
  date: Date;

  @Column()
  user_id: string;
}

export default Tweet;
