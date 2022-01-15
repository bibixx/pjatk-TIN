import { Infer } from "typed";
import { registerValidator } from "../..";
import { SafeUserTable } from "../auth";

export interface LoginRequestDTO {
  username: string
  password: string
}

export interface LoginResponseDTO {
  user: SafeUserTable
}

export type RegisterRequestDTO = Infer<typeof registerValidator>

export interface RegisterResponseDTO {
  user: SafeUserTable
}
