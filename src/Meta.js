class Meta {
    constructor(totalRecords, totalPages, page, limit) {
        this.total_records = totalRecords;
        this.total_page = totalPages;
        this.page = page;
        this.limit = limit;
    }
}

module.exports = Meta;