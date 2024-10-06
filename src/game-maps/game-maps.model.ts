import { Field, Int, ObjectType } from '@nestjs/graphql';
import GameServer from 'game-servers/game-servers.model';
import process from 'process';
import { AfterLoad, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'game-map' })
@ObjectType()
class GameMap {
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id: number;

    @Column()
    @Field()
    readonly author: string;

    @Column()
    @Field()
    preview: string;

    @Column({ nullable: true })
    @Field({ nullable: true })
    model: string;

    @Column()
    @Field()
    readonly name: string;

    @Column()
    @Field()
    readonly textureSize: string;

    @OneToMany(() => GameServer, (gameServer) => gameServer.map, { cascade: true, nullable: true })
    @Field(() => [GameServer])
    servers: GameServer[];

    @AfterLoad()
    updateCounters() {
        this.preview = `${process.env.STORAGE_URL}/${this.preview}`;
    }
}

export default GameMap;
