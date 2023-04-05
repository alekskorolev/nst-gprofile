import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    Index,
  } from 'typeorm';
  
  @Entity()
  export class Profile {
    @PrimaryGeneratedColumn('uuid')
    public id!: string;
  
    @Column({ type: 'varchar', length: 120, nullable: false })
    public username!: string;
  
    @Column({ type: 'int', nullable: true })
    public age: number;
  
    @Column({ type: 'boolean', default: false })
    public isBanned: boolean;

    @Index('IDX_uid')
    @Column({ type: 'uuid'})
    public uid!: string;

    @Column({ type: 'varchar', length: 140})
    public avatar: string;

    /*0
     * Create and Update Date Columns
     */
  
    @CreateDateColumn({ type: 'timestamp' })
    public createdAt!: Date;
  
    @UpdateDateColumn({ type: 'timestamp' })
    public updatedAt!: Date;
  }
  