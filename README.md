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
npm install responsebuilder
