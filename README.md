# Sports Betting Admin System

A modern web-based admin system for sports betting management, built with Next.js and TypeScript.

## Features

- **Account Management**
  - Admin account creation and management
  - Role-based access control
  - IP address whitelisting

- **Security Policy**
  - Password policy configuration
  - Login attempt restrictions
  - Session management
  - Two-factor authentication

- **Access Control**
  - IP-based access restrictions
  - Time-based access control
  - Multiple IP address support per admin

- **Notification System**
  - Email notifications
  - SMS notifications
  - Telegram notifications
  - Customizable notification rules

- **Audit Logging**
  - Comprehensive activity logging
  - Configurable log retention
  - Multiple log levels
  - Action-based logging

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Shadcn UI Components
- Sonner (Toast notifications)

## Getting Started

1. Clone the repository:
```bash
git clone git@github.com:ugpapa/sportsbet.git
cd sportsbet
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── admin/
│   │   └── settings/
│   │       ├── components/
│   │       ├── types/
│   │       └── page.tsx
│   └── layout.tsx
├── components/
│   └── ui/
└── lib/
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
