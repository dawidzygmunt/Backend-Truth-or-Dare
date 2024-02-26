# Backend do Gry "Prawda czy Wyzwanie"

## Opis projektu
Backend do gry "Prawda czy Wyzwanie" napisany w języku JavaScript przy użyciu środowiska Node.js i frameworka Express. Aplikacja obsługuje logikę gry, zarządzanie graczami, pytania oraz wyzwania.

## Live
Zobacz Demo: https://dawidzygmuntdev.pl/cards

## Wymagania
Aby uruchomić aplikację, potrzebujesz zainstalowanego środowiska Node.js. Następnie, wykonaj poniższe polecenia w terminalu:

```bash
npm install
npm start
```

## Struktura Projektu
```
.
├── src
│   ├── controllers        # Kontrolery obsługujące logikę gry
│   ├── models             # Modele danych (np. gracze, pytania, wyzwania)
│   ├── routes             # Trasy API
│   ├── services           # Dodatkowe usługi (np. obsługa bazy danych)
│   ├── app.js             # Plik główny aplikacji Express
├── config.js              # Plik konfiguracyjny
├── package.json           # Informacje o projekcie oraz zależności
├── README.md              # Ten plik
```

## Rozwój projektu

1. Dodawanie nowych funkcji:

- Rozwijaj funkcjonalności w odpowiednich folderach (controllers, models, services).
- Dodawaj nowe trasy API w folderze routes.
2. Testowanie:
- Używaj narzędzi do testowania, takich jak Mocha, Chai, itp., aby utrzymać stabilność kodu.
3. Contributing:
- Chętnie przyjmujemy zgłoszenia poprawek, nowych funkcji, bądź zgłaszanie błędów.

## Kontakt

Jeśli masz pytania lub chcesz się skonsultować, napisz do nas pod adresem: dawid.zygmunt86@gmail.com

## Licencja
Ten projekt jest objęty licencją MIT. Zobacz plik LICENSE.md, aby uzyskać więcej informacji.
