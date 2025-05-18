# Library Management App

A library management application built with Angular and Firebase.

## Environment Setup

1. Clone the repository
```bash
git clone https://github.com/seu-usuario/biblioteca-app.git
cd biblioteca-app
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
   - Copy the `.env.example` file to `.env`
   ```bash
   cp .env.example .env
   ```
   - Edit the `.env` file and add your Firebase credentials

4. Start the development server
```bash
ng serve
```

## Firebase Configuration

1. Create a project in [Firebase Console](https://console.firebase.google.com)
2. Enable Firestore Database
3. Get your project credentials from Project Settings > General
4. Add the credentials to the `.env` file

## Project Structure

- `src/app/components/` - Application components
- `src/app/services/` - Services and business logic
- `src/app/models/` - Interfaces and types
- `src/app/app.config.ts` - Firebase configuration

## Features

- Add new books
- Edit existing books
- Delete books
- View book list
- Manage book availability

## Technologies Used

- Angular 19
- Firebase/Firestore
- Bootstrap 5
- TypeScript
- Bootstrap Icons
- ngx-toastr for notifications

## Development

The project uses the following main dependencies:
- @angular/fire: ^19.1.0
- firebase: ^11.7.3
- bootstrap: ^5.3.2
- bootstrap-icons: ^1.11.3
- ngx-toastr: ^18.0.0

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
