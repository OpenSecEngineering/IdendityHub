# Identity Hub
## Architecture

```text
identity-hub/
│
├── src/
│   │
│   ├── main.ts
│   ├── app.module.ts
│   │
│   ├── config/
│   │   ├── config.ts
│   │   ├── env.schema.ts
│   │   ├── database.config.ts
│   │   ├── auth.config.ts
│   │   └── security.config.ts
│   │
│   ├── common/
│   │   ├── decorators/
│   │   ├── guards/
│   │   ├── interceptors/
│   │   ├── filters/
│   │   ├── pipes/
│   │   ├── middleware/
│   │   ├── exceptions/
│   │   ├── constants/
│   │   └── types/
│   │
│   ├── database/
│   │   ├── prisma.service.ts
│   │   └── prisma.module.ts
│   │
│   ├── modules/
│   │   │
│   │   ├── auth/
│   │   │   ├── auth.module.ts
│   │   │   ├── controllers/
│   │   │   ├── services/
│   │   │   ├── dto/
│   │   │   ├── guards/
│   │   │   ├── strategies/
│   │   │   └── types/
│   │   │
│   │   ├── users/
│   │   │   ├── users.module.ts
│   │   │   ├── controllers/
│   │   │   ├── services/
│   │   │   ├── dto/
│   │   │   └── types/
│   │   │
│   │   ├── roles/
│   │   │   ├── roles.module.ts
│   │   │   ├── controllers/
│   │   │   ├── services/
│   │   │   └── dto/
│   │   │
│   │   ├── permissions/
│   │   │   ├── permissions.module.ts
│   │   │   ├── controllers/
│   │   │   ├── services/
│   │   │   └── dto/
│   │   │
│   │   ├── sessions/
│   │   │   ├── sessions.module.ts
│   │   │   ├── controllers/
│   │   │   └── services/
│   │   │
│   │   ├── mfa/
│   │   │   ├── mfa.module.ts
│   │   │   ├── controllers/
│   │   │   ├── services/
│   │   │   └── dto/
│   │   │
│   │   ├── audit/
│   │   │   ├── audit.module.ts
│   │   │   ├── controllers/
│   │   │   └── services/
│   │   │
│   │   └── health/
│   │       ├── health.module.ts
│   │       └── health.controller.ts
│   │
│   └── infrastructure/
│       ├── crypto/
│       ├── email/
│       ├── cache/
│       ├── tokens/
│       └── logging/
│
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.t
```
