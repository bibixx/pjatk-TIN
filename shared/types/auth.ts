interface SharedUser {
  id: number
  username: string
  password: string
  userType: string
}

export interface ParticipantUser extends SharedUser {
  type: 'participant'
  idparticipant: number
}

export interface AdminUser extends SharedUser {
  type: 'admin'
  idparticipant: null
}

export type UserTable = ParticipantUser | AdminUser
export type SafeUserTable = Omit<ParticipantUser | AdminUser, 'password'>
