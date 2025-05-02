import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { dbConstants, entity, UserType } from './../constant';
import { BaseEntity} from './date.entity';

@Entity(entity.PLAYERS_ARBITERS, { schema: dbConstants.SCHEMA_NAME })
export class PlayersAndArbiters extends BaseEntity {
    @Column({ nullable: false, unique: true })
    @PrimaryGeneratedColumn('uuid', { name: 'player_arbiter_id' })
    playerArbiterId?: string;

    @Column({
        name: 'first_name',
        nullable: false,
    })
    firstName: string;

    @Column({
        name: 'last_name',
        nullable: false,
    })
    lastName: string;

    @Column({
        name: 'password',
        nullable: false,
    })
    password: string;

    @Column({ 
        name: 'email',
        nullable: false 
    })
    email: string;

    @Column({
        name: 'phone',
        nullable: false,
    })
    phone?: string;

    @Column({
        name: 'parent_name',
        nullable: false,
    })
    parentName?: string;

    @Column({
        name: 'relation_ship',
        nullable: false,
    })
    relationShip?: string;

    @Column({
        name: 'is_active',
        nullable: false,
        default: true,
    })
    isActive?: boolean;

    @Column({
        name: 'gender',
        nullable: false,
    })
    gender: string;

    @Column({
        nullable: false,
        type: 'timestamp',
        name: 'date_of_brith',
    })
    dateOfBrith: Date;

    @Column({
        name: 'address',
        nullable: false,
    })
    address: string;

    @Column({
        name: 'city',
        nullable: false,
    })
    city: string;

    @Column({
        name: 'state',
        nullable: false,
    })
    state: string;

    @Column({
        name: 'pincode',
        nullable: false,
    })
    pincode: string;

    @Column({
        name: 'mother_tounge',
        nullable: true,
    })
    motherTounge?: string;

    @Column({
        name: 'fide_id',
        nullable: true,
    })
    fideId?: string;

    @Column({
        name: 'aicf_id',
        nullable: true,
    })
    aicfId?: string;

    @Column({
        name: 'tnsca_id',
        nullable: true,
    })
    tnscaId?: string;

    @Column({
        type: 'enum',
        enum: UserType,
        nullable: false,
      })
      type: UserType;

    @Column({ nullable: true, name: 'photo', type: 'text' })
    photo?: string;

    // @Column({ nullable: true, name: 'certificate', type: 'text' })
    // certificate?: string;
}
