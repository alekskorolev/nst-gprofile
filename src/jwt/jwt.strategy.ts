import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy, RmqRecordBuilder } from "@nestjs/microservices";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { Strategy } from 'passport-http-bearer';
import { ParsedQs } from "qs";
import { lastValueFrom } from "rxjs";

@Injectable()
export class JwtRemoteStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject('AUTH_SERVICE') private client: ClientProxy) {
    super({ passReqToCallback: false })
  }

  authenticate(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, options?: Object): void {
    const result = super.authenticate(req, options)
    console.log(result)
    return result
  }
  async validate(token, verify) {
    const msg = new RmqRecordBuilder({ token }).build()
    const val = await lastValueFrom(this.client.send('parse-token', msg))
    console.log(val)
    verify(null, val)
  }
  
}