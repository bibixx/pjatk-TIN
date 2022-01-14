import { SafeUserTable } from "../auth";

export interface LoginRequestDTO {
  username: string
  password: string
}

export interface LoginResponseDTO {
  user: SafeUserTable
}

export interface RegisterRequestDTO {
  username: string
  password: string
}

export interface RegisterResponseDTO {
  user: SafeUserTable
}
