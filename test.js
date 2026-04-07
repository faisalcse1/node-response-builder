// test.js
const express = require("express");
const { ResponseBuilder, HttpStatus, validateRequired } = require("./index");

const app = express();
app.use(express.json());

// Simple GET test
app.get("/status", (req, res) => {
    res.json(ResponseBuilder.ok("API is running"));
});

// Pagination test
app.get("/users", (req, res) => {
    const items = [{ id: 1 }, { id: 2 }];
    const total = 50;
    const paginated = ResponseBuilder.paginate({ items, total, page: 1, limit: 10 });
    res.json(ResponseBuilder.ok("Users fetched", paginated));
});

// Validation test
app.post("/register", (req, res) => {
    const errors = validateRequired(req.body, ["email", "password"]);
    if (errors.length) return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json(ResponseBuilder.validation(errors));

    res.json(ResponseBuilder.ok(HttpStatus.CREATED,"User created", req.body));
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Test server running on http://localhost:${PORT}`);
});