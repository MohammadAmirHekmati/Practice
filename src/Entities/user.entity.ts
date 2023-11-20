import { AuditableEntity } from "src/Common"
import { Column, Entity, Index } from "typeorm"

@Entity({ schema: 'User', name: "user" })
export class UserEntity extends AuditableEntity {
    @Index({ unique: true })
    @Column()
    username: string
    
    @Column()
    fullName: string
    
    @Column()
    password: string
}