const createSortArr = (data) => {
	let sortArr = [];

	const sortSelects = data.getElementsByTagName('select');
	for (const item of sortSelects) {
		const keySort = item.value;
		if (keySort == 0) {
			break;
		}
		const desc = document.getElementById(item.id + 'Desc').checked;
		
		sortArr.push({ column: keySort - 1, direction: desc });
	}
	return sortArr;
};

let lastTableHTML = null;

const sortTable = (idTable, formData) => {

	const sortArr = createSortArr(formData);

	let table = document.getElementById(idTable);
	if (!table) return false;

	if (!lastTableHTML) lastTableHTML = table.innerHTML;

	if (sortArr.length === 0) {
		if (lastTableHTML) {
			table.innerHTML = lastTableHTML;
			lastTableHTML = null;
			return true;
		}
		return false;
	}

	let rowData = Array.from(table.rows);

	const headerRow = rowData.shift();

	rowData.sort((first, second) => {
		for (let { column, direction } of sortArr) {
			const firstCell = first.cells[column].innerHTML.trim();
			const secondCell = second.cells[column].innerHTML.trim();

			const headerName = headerRow.cells[column].innerHTML.trim();
			let comparison = 0;

			if (headerName === 'Год' || headerName === 'Высота') {
				const a = parseFloat(firstCell.replace(',', '.'));
				const b = parseFloat(secondCell.replace(',', '.'));
				if (!isNaN(a) && !isNaN(b)) {
					comparison = a - b;
				} else {
					comparison = firstCell.localeCompare(secondCell);
				}
			} else {
				comparison = firstCell.localeCompare(secondCell, undefined, { numeric: false });
			}

			if (comparison !== 0) {
				return direction ? -comparison : comparison;
			}
		}
		return 0;
	});

	table.append(headerRow);

	let tbody = document.createElement('tbody');
	rowData.forEach(item => {
		tbody.append(item);
	});
	table.append(tbody);
}

const restoreTableBeforeSort = (idTable) => {
	const table = document.getElementById(idTable);
	if (!table) return;
	if (lastTableHTML) {
		table.innerHTML = lastTableHTML;
		lastTableHTML = null;
		return;
	}
	table.innerHTML = '';
	if (typeof createTable === 'function' && typeof buildings !== 'undefined') {
		createTable(buildings, idTable);
	}
};
