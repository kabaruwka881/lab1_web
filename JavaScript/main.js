document.addEventListener("DOMContentLoaded", () => {
    createTable(buildings, 'list');

    const findButton = document.getElementById("findButton");
    const filterForm = document.getElementById('filter');
    const clearButton = document.getElementById('clearButton');
    const sortForm = document.getElementById('sort');
    const fieldsList = document.getElementById('fieldsFirst');
    const fieldsSecond = document.getElementById('fieldsSecond');
    const sortButton = document.getElementById('sortButton');
    const resetSortButton = document.getElementById('resetSortButton');

    setSortSelects(buildings, sortForm);
    
    findButton.addEventListener("click", () => {
        setSortSelects(buildings, sortForm);
        filterTable(buildings, 'list', filterForm);
    });

    clearButton.addEventListener("click", () => {
        setSortSelects(buildings, sortForm);
        clearFilter('list', buildings, filterForm);
    });

    fieldsList.addEventListener('change', function() {
        changeNextSelect(this, 'fieldsSecond');
    });

    
    fieldsSecond.addEventListener('change', function() {
        changeNextSelect(this, 'fieldsThird');
    });

    sortButton.addEventListener("click", () => {
        sortTable('list', sortForm);
    });

    if (resetSortButton) {
        resetSortButton.addEventListener('click', () => {
            setSortSelects(buildings, sortForm);
            if (typeof restoreTableBeforeSort === 'function') {
                restoreTableBeforeSort('list');
            } else {
                const table = document.getElementById('list');
                if (table) {
                    table.innerHTML = '';
                    createTable(buildings, 'list');
                }
            }
        });
    }
});

const createOption = (str, val) => {
    let item = document.createElement('option');
    item.text = str;
    item.value = val;
    return item;
}

const setSortSelect = (arr, sortSelect) => {
    sortSelect.innerHTML = '';
    sortSelect.append(createOption('Нет', 0));
    arr.forEach((item, index) => {
        sortSelect.append(createOption(item, index + 1));
    });
}

const setSortSelects = (data, dataForm) => {
    const head = Array.isArray(data) && data.length ? Object.keys(data[0]) : Object.keys(data);
    const allSelect = dataForm.getElementsByTagName('select');
    for (let i = 0; i < allSelect.length; i++) {
        setSortSelect(head, allSelect[i]);
        if (i > 0) {
            allSelect[i].disabled = true;
        }
    }
}

const changeNextSelect = (curSelect, nextSelectId) => {
    let nextSelect = document.getElementById(nextSelectId);
    if (curSelect.value != 0) {
        nextSelect.disabled = false;
        nextSelect.innerHTML = curSelect.innerHTML;
        nextSelect.remove(curSelect.selectedIndex);
    } else {
        nextSelect.disabled = true;
        nextSelect.value = 0;
        if (nextSelectId === 'fieldsSecond') {
            const fieldsThird = document.getElementById('fieldsThird');
            fieldsThird.disabled = true;
            fieldsThird.value = 0;
        }
    }
}
