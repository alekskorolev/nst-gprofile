import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy, RmqRecordBuilder } from "@nestjs/microservices";
import { PassportStrategy } from "@nestjs/passport";
import { length } from "class-validator";
import { Request } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { Strategy } from 'passport-http-bearer';
import { ParsedQs } from "qs";
import { lastValueFrom } from "rxjs";
import { StorageService } from "src/storage/storage.service";

@Injectable()
export class JwtRemoteStrategy extends PassportStrategy(Strategy) {
  @Inject(StorageService)
  private storage: StorageService;
  constructor(@Inject('AUTH_SERVICE') private client: ClientProxy) {
    super({ passReqToCallback: false })
  }

  authenticate(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, options?: Object): void {
    const result = super.authenticate(req, options)
    return result
  }
  async validate(token, verify) {
    let user = await this.storage.getUser(token)
    if (user) {
      return verify(null, user)
    }
    const msg = new RmqRecordBuilder({ token }).build()
    user = await lastValueFrom(this.client.send('parse-token', msg))
    await this.storage.setUser(token, user)
    verify(null, user)
  }
  
}