# FastAPI Backend

A basic FastAPI backend with example CRUD endpoints for managing items.

## Setup

1. Create a virtual environment (recommended):
```bash
python -m venv venv
source venv/bin/activate  # On Windows, use: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

## Running the Application

Run the application using:
```bash
python main.py
```

The server will start at `http://localhost:8000`

## API Documentation

Once the server is running, you can access:
- Interactive API docs (Swagger UI): `http://localhost:8000/docs`
- Alternative API docs (ReDoc): `http://localhost:8000/redoc`

## Available Endpoints

- `GET /`: Welcome message
- `GET /items`: List all items
- `GET /items/{item_id}`: Get a specific item
- `POST /items`: Create a new item
- `PUT /items/{item_id}`: Update an existing item
- `DELETE /items/{item_id}`: Delete an item

## Example Item JSON Structure

```json
{
    "name": "Example Item",
    "description": "This is an example item",
    "price": 29.99
}
``` 