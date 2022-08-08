# CookBook App

## General info
The CookBook App is an application that helps you manage your cooking recipes.

## Technologies
-  Backend
    - C#
    - .Net 6 Minimal API
    - EntityFrameworkCore
    - Swagger
    - SQLite

- Frontend
    - React
    - TypeScript
    - Chakra UI
    - Axios
    
## Usage

### Backend
In _API_ directory run following commands:
```console
> dotnet run
```
to run application at _https://localhost:7247_ and _http://localhost:5122_

### Frontend
In _client-app_ directory run following commands:
```console
> npm install
```
to install dependences 
```console
> npm start
```
to run application at _http://localhost:3000/_
 
### Database
Repository contains database with populated data, to use empty database run following commands in _API_ directory:
```console
> dotnet ef database drop -f
> dotnet ef database update
```