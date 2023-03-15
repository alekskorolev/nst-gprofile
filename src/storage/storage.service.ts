import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class StorageService {
  @Inject(ConfigService)
  private config: ConfigService
  private client: RedisClientType
  private userExpiration: string;
  
  public async onModuleInit(): Promise<void> {
    this.client = createClient({
      url: this.config.get('REDIS_URL'),
      password: this.config.get('REDIS_PASSWORD')
    })
    this.userExpiration = this.config.get('USER_EXPIRATION', '600')
    this.client.on('error', err => console.log('Redis Client Error', err));
    await this.client.connect()
  }

  public async onModuleDestroy(): Promise<void> {
    await this.client.disconnect()
  }

  public async set(key: string, value: string) {
    return await this.client.set(key, value)
  }

  public async get(key: string) {
    return await this.client.get(key)
  }

  public async setUser(token: string, user: any): Promise<void> {
    return await this.client.sendCommand([
      'SET', `user:${token}`, JSON.stringify(user),
      'EX', this.userExpiration
    ])
  }

  public async getUser(token: string) {
    return JSON.parse(await this.client.get(`user:${token}`))
  }
}