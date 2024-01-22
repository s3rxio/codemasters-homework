import { Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  readonly extendedClient: PrismaClient = this.extendClient();

  constructor() {
    super();

    new Proxy(this, {
      get: (target, property) =>
        Reflect.get(
          property in this.extendedClient ? this.extendedClient : target,
          property
        )
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  private extendClient() {
    this.$extends({
      result: {
        user: {
          code: {
            compute: () => null
          },
          asd: {
            compute: () => "asd"
          }
        }
      }
    });

    return this;
  }
}
