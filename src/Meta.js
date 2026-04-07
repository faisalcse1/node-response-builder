class Meta {
    constructor(totalRecords, totalPages, page, limit) {
        this.totalRecords = totalRecords;
        this.totalPages = totalPages;
        this.page = page;
        this.limit = limit;
    }
}

module.exports = Meta;