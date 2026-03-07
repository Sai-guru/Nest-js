# Auth & OAuth Workflow


┌──────────────┐     GET /auth/google       ┌────────────────────┐      Redirect       ┌──────────────┐
│   Browser    │ ────────────────────────▶ │    NestJS Auth     │ ─────────────────▶ │    Google    │
│              │                            │ (AuthController +  │                     │    Login     │
└──────────────┘                            │  GoogleStrategy)   │                     └──────────────┘
                                            └────────────────────┘
                                                     ▲
                                                     │ Google redirects with code
                                                     │   /auth/google/callback
                                                     │
                                                     ▼
                                           ┌────────────────────┐      find/create     ┌──────────────┐
                                           │   GoogleStrategy   │ ───────────────────▶│   Users DB   │
                                           │ validate(profile)  │      user row        │ (user table) │
                                           └────────────────────┘                      └──────────────┘
                                                    │
                                                    |
                                                    │ user entity
                                                    ▼
                                           ┌────────────────────┐      
                                           |                    |     sign JWT
                                           │   AuthController   │ ───────────────────▶ set httpOnly access_token cookie
                                           │    + AuthService   │ 
                                           │    + AuthService   │
                                           └────────────────────┘


  (later, calling posts)

┌──────────────┐   GET /posts (cookie auto-sent)    ┌────────────────────┐      checks JWT       ┌──────────────┐
│   Browser    │ ─────────────────────────────▶    │  PostsController   │ ◀──────────────────▶│  JwtStrategy │
│ / REST client│                                    │  @UseGuards(JWT)   │     JwtAuthGuard      └──────────────┘
└──────────────┘                                    └────────────────────┘
                                                             │
                                                             ▼
                                                      ┌────────────────────┐
                                                      │   Posts Service    │
                                                      │    + Posts DB      │
                                                      └────────────────────┘