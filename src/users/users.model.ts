import { Field, Int, ObjectType } from '@nestjs/graphql';
import process from 'process';
import { AfterLoad, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import ClientApp from '../client-app/client-app.model';
import GameServer from '../game-servers/game-servers.model';

@Entity({ name: 'user' })
@ObjectType()
class User {
    @PrimaryGeneratedColumn()
    @Field(() => Int, { nullable: true })
    id: number;

    @Column({ nullable: true })
    @Field({ nullable: true })
    first_name: string;

    @Column({ nullable: true })
    @Field({ nullable: true })
    last_name: string;

    @Column({ nullable: true })
    @Field({ nullable: true })
    avatar: string;

    @Column({ unique: true })
    @Field({ nullable: true })
    nickname: string;

    @Column()
    password: string;

    @Column({ default: false })
    @Field({ nullable: true })
    isOnline: boolean;

    @OneToOne(() => ClientApp, (ClientApp) => ClientApp, { cascade: true })
    @JoinColumn()
    @Field({ nullable: true })
    clientApp: ClientApp;

    @OneToMany(() => GameServer, (gameServer) => gameServer.owner, { cascade: true })
    @Field(() => [GameServer])
    ownedServers: GameServer[];

    @ManyToOne(() => GameServer, (gameServer) => gameServer.users, { nullable: true })
    @Field(() => GameServer)
    activeServer: GameServer;

    @AfterLoad()
    updateCounters() {
        if (this.avatar === null) this.avatar = `${process.env.STORAGE_URL}/assets/default_avatar.jpg`;
    }
}

export default User;
