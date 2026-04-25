const createTable = (data, idTable) => {
  if (!data || data.length === 0) {
    return;
  }
  const table = document.getElementById(idTable);
  const header = Object.keys(data[0]);

  const headerRow = createHeaderRow(header);
  table.append(headerRow);

  const bodyRows = createBodyRows(data);
  table.append(bodyRows);
};


const createHeaderRow = (headers) => {
  const tr = document.createElement('tr');
  headers.forEach(header => {
    const th = document.createElement('th');
    th.innerHTML = header;
    tr.append(th);
  });
  return tr;
};


const createBodyRows = (data) => {
  const tbody = document.createElement('tbody');
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    const tr = document.createElement('tr');
    const values = Object.values(item);
    for (let j = 0; j < values.length; j++) {
      const value = values[j];
      const td = document.createElement('td');
      td.innerHTML = value;
      tr.append(td);
    }
    tbody.append(tr);
  }
  return tbody;
};

const clearTable = (idTable) => {
  const table = document.getElementById(idTable);
  const rows = table.querySelectorAll('tr');
  rows.forEach(row => row.remove());
}
