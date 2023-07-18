class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    let copyOfQueryStr = { ...this.queryStr };
    // Filtering for category
    const excludedFields = ["page", "keyword", "limit"];
    //   Removing unwanted fields
    excludedFields.forEach((item) => delete copyOfQueryStr[item]);
    // console.log(copyOfQueryStr);

    //   Filtering for price
    copyOfQueryStr = JSON.stringify(copyOfQueryStr);
    copyOfQueryStr = copyOfQueryStr.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (key) => `$${key}`
    );
    copyOfQueryStr = JSON.parse(copyOfQueryStr);
    // console.log(copyOfQueryStr);

    this.query = this.query.find(copyOfQueryStr);
    return this;
  }

  paginate(resultPerPage) {
    const currentPage = this.queryStr.page || 1;
    const skip = resultPerPage * (currentPage - 1);
    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }
}

module.exports = ApiFeatures;
