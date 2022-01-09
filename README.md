<h1 align="center">TIN Mini Projekt #2</h1>

## Uruchomienie projektu
### Docker (Rekomendowane)
#### Wymagania
| Zależność      | Wymagana Wersja |
|----------------|-----------------|
| Docker Engine  | 1.13.1+         |

#### Uruchomienie aplikacji
1. Zainstaluj zależności, oraz uruchom aplikację za pomocą następującej komendy
```bash
docker-compose up
```

#### SQL
##### Tworzenie schematu bazy danych
```
docker-compose exec backend npm run sql:create
```

##### Zasilanie bazy danych przykładowymi danymi
```
docker-compose exec backend npm run sql:seed
```

#### Development
##### Uruchomienie aplikacji
1. Zainstaluj zależności, oraz uruchom aplikację w trybie developerskim za pomocą następującej komendy
```bash
docker-compose -f docker-compose.development.yml up
```

2. Aby włączyć budowanie oraz nasłuchiwanie na zmiany skryptów frontendowych należy wykonać następującą komendę w oddzielnym oknie terminala
```
docker-compose -f docker-compose.development.yml exec backend npm run dev:frontend
```

### Uruchomienie bezpośrednio na urządzeniu
#### Wymagania
| Zależność      | Wymagana Wersja |
|----------------|-----------------|
| Node           | 10.0.0+         |

#### Uruchomienie aplikacji
1. Zainstaluj zależności przy użyciu npm
```bash
npm install
```

2. Zdefiniuj zmienne środowiskowe przy użyciu pliku `.env` (przykładowa zawartość znajduje się w pliku `.env.example`)

3. Uruchom aplikację za pomocą następującej komendy
```bash
npm run start
```

#### SQL
##### Tworzenie schematu bazy danych
```
npm run sql:create
```

##### Zasilanie bazy danych przykładowymi danymi
```
npm run sql:seed
```

#### Development
##### Uruchomienie aplikacji
1. Zainstaluj zależności przy użyciu npm
```bash
npm install
```

1. Uruchom aplikację w trybie developerskim za pomocą następującej komendy
```bash
npm run dev
```

2. Aby włączyć budowanie oraz nasłuchiwanie na zmiany skryptów frontendowych należy wykonać następującą komendę w oddzielnym oknie terminala
```
npm run dev:frontend
```
