import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { AuthDto } from "./dto";
import * as bcrypt from "bcrypt";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async signup(dto: AuthDto) {
    const { email, password: _password, username, roleId } = dto;
    const password = await bcrypt.hash(_password, 10);
    try {
      return await this.prisma.user.create({
        data: {
          email,
          password,
          username,
          roleId,
        },
      });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === "P2002") {
          throw new ForbiddenException("User already exists");
        }
      }
      throw new Error(e);
    }
  }

  async signin(dto: AuthDto) {
    const { email, password, username } = dto;

    const userByName = await this.prisma.user.findUnique({
      where: {
        username,
      },
    });

    const userByEmail = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    const user = userByName || userByEmail;

    if (!user) {
      throw new ForbiddenException("User doesn't exist");
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new ForbiddenException("Invalid credentials");
    }
    return user;
  }
}
