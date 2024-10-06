import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'clientApp' })
@ObjectType()
class ClientApp {
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id: number;

    @Column({ default: 'eng' })
    @Field({ nullable: true, defaultValue: 'eng' })
    lang: string;

    @Column({ default: 'dark' })
    @Field({ nullable: true, defaultValue: 'dark' })
    theme: string;
}

export default ClientApp;
