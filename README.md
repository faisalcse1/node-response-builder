# responsebuilder

[![npm version](https://img.shields.io/npm/v/responsebuilder)](https://www.npmjs.com/package/responsebuilder)
[![License](https://img.shields.io/npm/l/responsebuilder)](https://opensource.org/licenses/MIT)
[![Downloads](https://img.shields.io/npm/dt/responsebuilder)](https://www.npmjs.com/package/responsebuilder)

---

## Overview

**responsebuilder** is a lightweight and flexible Node.js package designed to standardize API responses across applications. It provides a consistent response format with built-in support for HTTP status handling, validation, and pagination.

This package helps developers maintain clean and predictable API responses by eliminating repetitive code and enforcing a unified response structure across all endpoints.

---

## Features

- ✅ Standard API response format (`success`, `status`, `message`, `data`, `meta`, `errors`)
- ✅ Built-in HTTP status enum for better readability
- ✅ Pagination support (`items`, `total`, `totalPages`, `page`, `limit`)
- ✅ Validation utilities for required fields and schema-based validation
- ✅ Express-friendly helper methods for seamless integration
- ✅ Lightweight, reusable, and framework-independent

---

## Installation

```bash
npm install api-response-builder
```

---

## Quick Start

```javascript
const { ResponseBuilder, HttpStatus, validateRequired } = require("api-response-builder");
```

---

## Usage

### 1. Success Responses

**OK Response (200)**

```javascript
app.get('/users', (req, res) => {
    const users = [{ id: 1, name: 'John' }];
    ResponseBuilder.ok(res, 'Users fetched successfully', users);
});
```

**Created Response (201)**

```javascript
app.post('/users', (req, res) => {
    const newUser = { id: 1, name: 'John' };
    ResponseBuilder.ok(res, 'User created successfully', newUser);
});
```

### 2. Error Responses

**Error with Custom Status**

```javascript
app.get('/user/:id', (req, res) => {
    const error = ResponseBuilder.error('User not found', HttpStatus.NOT_FOUND);
    res.status(HttpStatus.NOT_FOUND).json(error);
});
```

**Bad Request (400)**

```javascript
app.post('/login', (req, res) => {
    const error = ResponseBuilder.badRequest('Invalid credentials');
    res.status(400).json(error);
});
```

**Not Found (404)**

```javascript
app.get('/product/:id', (req, res) => {
    const error = ResponseBuilder.notFound('Product not found');
    res.status(404).json(error);
});
```

### 3. Validation Errors (422)

```javascript
app.post('/register', (req, res) => {
    const errors = validateRequired(req.body, ['email', 'password']);
    
    if (errors.length > 0) {
        const response = ResponseBuilder.validation(errors);
        return res.status(422).json(response);
    }
    // Continue with registration...
});
```

### 4. Pagination

```javascript
app.get('/products', (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const products = getProducts(page, limit);
    const total = getTotalCount();
    
    const paginatedData = ResponseBuilder.paginate({
        items: products,
        total,
        page: parseInt(page),
        limit: parseInt(limit)
    });
    
    ResponseBuilder.ok(res, 'Products fetched', paginatedData);
});
```

**Pagination Response Format:**

```json
{
  "success": true,
  "status": 200,
  "message": "Products fetched",
  "data": [],
  "meta": {
    "totalRecords": 50,
    "totalPages": 5,
    "page": 1,
    "limit": 10
  }
}
```

### 5. Validation Utilities

**validateRequired - Check for missing fields**

```javascript
const { validateRequired } = require('api-response-builder/validator');

const errors = validateRequired(req.body, ['name', 'email', 'password']);
// Returns: [{ field: 'name', message: 'name is required' }, ...]
```

**validateSchema - Advanced validation**

```javascript
const { validateSchema } = require('api-response-builder/validator');

const errors = validateSchema(req.body, {
    email: {
        required: true,
        email: true,
        message: 'Valid email is required'
    },
    password: {
        required: true,
        min: 6
    },
    age: {
        type: 'number',
        min: 18
    }
});
```

---

## API Reference

### ResponseBuilder Methods

| Method | Status Code | Description |
|--------|-------------|-------------|
| `ok(res, message, data)` | 200 | Send success response with data |
| `created(res, message, data)` | 201 | Send created response |
| `error(message, status, errors)` | Custom | Send error with custom status |
| `badRequest(message, errors)` | 400 | Send bad request error |
| `notFound(message)` | 404 | Send not found error |
| `validation(errors, message)` | 422 | Send validation error |
| `paginate({ items, total, page, limit })` | - | Create pagination object |
| `build(status, message, data)` | - | Build response object |
| `send(res, status, message, data)` | Custom | Send custom response |

### HttpStatus Codes

```javascript
const HttpStatus = require('api-response-builder/HttpStatus');

// 2xx
HttpStatus.OK              // 200
HttpStatus.CREATED         // 201
HttpStatus.ACCEPTED        // 202
HttpStatus.NO_CONTENT      // 204

// 4xx
HttpStatus.BAD_REQUEST            // 400
HttpStatus.UNAUTHORIZED           // 401
HttpStatus.FORBIDDEN              // 403
HttpStatus.NOT_FOUND              // 404
HttpStatus.CONFLICT               // 409
HttpStatus.UNPROCESSABLE_ENTITY   // 422
HttpStatus.TOO_MANY_REQUESTS       // 429

// 5xx
HttpStatus.INTERNAL_SERVER_ERROR  // 500
HttpStatus.BAD_GATEWAY            // 502
HttpStatus.SERVICE_UNAVAILABLE    // 503
```

---

## Response Format

All responses follow this structure:

```json
{
  "success": true,
  "status": 200,
  "message": "Operation successful",
  "data": { ... },
  "meta": null,
  "errors": null
}
```

---

## License

MIT