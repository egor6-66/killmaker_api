import { Field, Int, ObjectType } from '@nestjs/graphql';
import GameMap from 'game-maps/game-maps.model';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import User from 'users/users.model';

@Entity({ name: 'game-server' })
@ObjectType()
class GameServer {
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id: number;

    @Column()
    @Field()
    name: string;

    @Column({ select: false })
    password: string;

    @Column({ nullable: true })
    @Field({ nullable: true })
    private: boolean;

    @Column({ nullable: true })
    @Field({ nullable: true })
    usersCount: number;

    @ManyToOne(() => User, (user) => user.ownedServers)
    @JoinColumn({ name: 'owner' })
    @Field(() => User)
    owner: User;

    @ManyToOne(() => GameMap, (gameMap) => gameMap.servers)
    @JoinColumn({ name: 'map' })
    @Field(() => GameMap)
    map: GameMap;

    @OneToMany(() => User, (user) => user.activeServer, { cascade: true, nullable: true })
    @Field(() => [User])
    users: User[];
}

export default GameServer;
