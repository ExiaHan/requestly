const checkIfRecordMatchesWithSearchText = (record, searchText) => {
  return record.name.toLowerCase().includes(searchText.toLowerCase());
};

export const getSearchedRules = (searchText, tableData) => {
  return searchText && tableData.length > 0
    ? tableData
        .reduce(
          (results, record) =>
            record.objectType === "group"
              ? [
                  ...results,
                  {
                    ...record,
                    expanded: true,
                    children: record.children.filter((rule) =>
                      checkIfRecordMatchesWithSearchText(rule, searchText)
                    ),
                  },
                ]
              : checkIfRecordMatchesWithSearchText(record, searchText)
              ? [...results, { ...record }]
              : results,
          []
        )
        .filter(
          (record) =>
            record.objectType === "rule" ||
            (record.objectType === "group" && record.children.length > 0)
        )
    : tableData;
};
