const ApiResponse = require("./ApiResponse");
const Meta = require("./Meta");
const HttpStatus = require("./HttpStatus");

class ResponseBuilder {

    // ✅ Success
    static ok(message = "Success", data = null) {
        return ResponseBuilder.build(HttpStatus.OK, message, data);
    }

    static created(message = "Created", data = null) {
        return ResponseBuilder.build(HttpStatus.CREATED, message, data);
    }

    // ❌ Error
    static error(message = "Error", status = HttpStatus.INTERNAL_SERVER_ERROR, errors = null) {
        const response = new ApiResponse();
        response.success = false;
        response.status = status;
        response.message = message;
        response.data = null;
        response.errors = errors || [{ message }];

        return response;
    }

    static badRequest(message = "Bad Request", errors = null) {
        return ResponseBuilder.error(message, HttpStatus.BAD_REQUEST, errors);
    }

    static notFound(message = "Not Found") {
        return ResponseBuilder.error(message, HttpStatus.NOT_FOUND);
    }

    static validation(errors = [], message = "Validation failed") {
        const response = new ApiResponse();
        response.success = false;
        response.status = HttpStatus.UNPROCESSABLE_ENTITY;
        response.message = message;
        response.errors = errors;

        return response;
    }

    // 🔥 Pagination Helper (IMPORTANT)
    static paginate({ items, total, page = 1, limit = 10 }) {
        return {
            items,
            total,
            totalPages: Math.ceil(total / limit),
            page,
            limit
        };
    }

    static build(status, message, data) {
        const response = new ApiResponse();
        response.status = status;
        response.success = status >= 200 && status < 300;
        response.message = message;

        if (ResponseBuilder.isPaginated(data)) {
            response.data = data.items || [];
            response.meta = new Meta(
                data.total || 0,
                data.totalPages || 1,
                data.page || 1,
                data.limit || 10
            );
        } else {
            response.data = data;
        }

        return response;
    }

    static isPaginated(data) {
        return data &&
            typeof data === "object" &&
            ("items" in data && "total" in data);
    }

    // Express helper
    static send(res, status, message, data) {
        return res.status(status).json(
            ResponseBuilder.build(status, message, data)
        );
    }
}

module.exports = ResponseBuilder;