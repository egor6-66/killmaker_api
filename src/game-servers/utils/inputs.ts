import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateServer {
    @Field()
    @IsString()
    readonly name: string;

    @Field()
    @IsString()
    @IsOptional()
    readonly password?: string;

    @Field(() => Int)
    @IsNumber()
    readonly mapId: number;
}

@InputType()
export class SDP {
    @Field(() => Int)
    @IsNumber()
    readonly peerId: number;

    @Field(() => Int)
    @IsNumber()
    readonly initiator: number;

    @Field(() => Int)
    @IsNumber()
    readonly serverId: number;

    @Field()
    @IsString()
    readonly sdp: string;
}

@InputType()
export class IceCandidate {
    @Field(() => Int)
    @IsNumber()
    readonly peerId: number;

    @Field(() => Int)
    @IsNumber()
    readonly initiator: number;

    @Field(() => Int)
    @IsNumber()
    readonly serverId: number;

    @Field()
    @IsString()
    readonly iceCandidate: string;
}
