# Student HUB — HvA

Webapplicatie voor nieuwe HvA-studenten om digitale tools te vinden en hun onboarding te doorlopen.

## Installatie

```bash
# Clone de repository
git clone <repository-url>
cd "PB3-Team B103 2"

# Maak een virtual environment aan
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Installeer dependencies
pip install -r requirements.txt

# Kopieer de environment variabelen
cp .env.example .env
# Pas de waarden in .env aan
```

## Applicatie starten

```bash
flask run
```

Of via het wsgi entry point:

```bash
python wsgi.py
```

De applicatie draait op `http://localhost:5000`.

## Tests draaien

```bash
pytest
```

## Projectstructuur

```
app/
  __init__.py       # App factory (create_app)
  config.py         # Configuratie (dev/test/prod)
  db.py             # Database connectie
  main/             # Hoofdpagina
  tools/            # Tools overzicht
  journey/          # Student journey
  help/             # Hulp pagina
  api/              # REST API endpoints
  templates/        # HTML templates
  static/           # CSS, afbeeldingen
tests/              # Unit tests
wsgi.py             # WSGI entry point
```

## Docker

```bash
docker-compose up --build
```
