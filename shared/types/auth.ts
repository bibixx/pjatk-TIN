export type UserType = 'participant' | 'admin'

interface SharedUser {
  id: number
  username: string
  password: string
}

export interface ParticipantUser extends SharedUser {
  userType: 'participant'
  idparticipant: number
}

export interface AdminUser extends SharedUser {
  userType: 'admin'
  idparticipant: null
}

export type UserTable = ParticipantUser | AdminUser
export type SafeUserTable = Omit<ParticipantUser | AdminUser, 'password'>
