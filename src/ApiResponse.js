class ApiResponse {
    constructor() {
        this.success = true;
        this.status = 200;
        this.message = null;
        this.data = null;
        this.meta = null;
        this.errors = null;
    }
}

module.exports = ApiResponse;