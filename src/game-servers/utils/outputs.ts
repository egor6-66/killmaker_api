import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsArray, IsBoolean, IsString } from 'class-validator';

@ObjectType()
export class NewPeer {
    @Field(() => [Int], { nullable: true })
    @IsArray()
    readonly peers: number[];

    @Field()
    @IsBoolean()
    readonly createOffer: boolean;
}

@ObjectType()
export class NewSDP {
    @Field(() => Int)
    @IsArray()
    readonly peerId: number;

    @Field()
    @IsString()
    readonly sdp: string;
}

@ObjectType()
export class NewIceCandidate {
    @Field(() => Int)
    @IsArray()
    readonly peerId: number;

    @Field()
    @IsString()
    readonly iceCandidate: string;
}
