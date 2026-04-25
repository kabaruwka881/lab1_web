const correspond = {
    "Название": "structure",
    "Тип": "category",
    "Страна": "country",
    "Город": "city",
    "Год": ["yearFrom", "yearTo"],
    "Высота": ["heightFrom", "heightTo"]
}

const dataFilter = (dataForm) => {
    let dictFilter = {};

    for (const item of dataForm.elements) {
        let valInput = item.value;

        if (item.type === "text") {
            valInput = valInput.toLowerCase();
        }

        if (item.type === "number") {
            if (item.id.includes("From")) {
                valInput = valInput ? Number(valInput) : -Infinity;
            } else if (item.id.includes("To")) {
                valInput = valInput ? Number(valInput) : Infinity;
            } else {
                valInput = valInput ? Number(valInput) : null;
            }
        }

        dictFilter[item.id] = valInput;
    }

    return dictFilter;
}

const filterTable = (data, idTable, dataForm) => {
    const datafilter = dataFilter(dataForm);

    let tableFilter = data.filter(item => {
        let result = true;

        Object.entries(item).forEach(([key, val]) => {
            if (typeof val === 'string') {
                result &&= val.toLowerCase().includes(datafilter[correspond[key]]);
            }

            if (typeof val === 'number') {
                if (Array.isArray(correspond[key])) {
                    if (correspond[key].includes("yearFrom") || correspond[key].includes("yearTo")) {
                        const yearFrom = datafilter['yearFrom'];
                        const yearTo = datafilter['yearTo'];
                        result &&= val >= yearFrom && val <= yearTo;
                    }
                    if (correspond[key].includes("heightFrom") || correspond[key].includes("heightTo")) {
                        const heightFrom = datafilter['heightFrom'];
                        const heightTo = datafilter['heightTo'];
                        result &&= val >= heightFrom && val <= heightTo;
                    }
                }
            }
        });

        return result;
    });

    clearTable(idTable);

    if (tableFilter.length === 0) {
        const table = document.getElementById(idTable);
        const body = table.createTBody();
        const headerRow = createHeaderRow(Object.keys(correspond));
        body.append(headerRow);
    } else {
        createTable(tableFilter, idTable);
    }
}

const clearFilter = (idTable, data, dataForm) => {
    const table = document.getElementById(idTable);
    createTable(data, idTable);
    for (const item of dataForm.elements) {
        if (item.type === "text" || item.type === "number") {
            item.value = '';
        }
    }
}
