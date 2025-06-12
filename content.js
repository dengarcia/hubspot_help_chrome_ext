function addButtonToDealsTable() {
  console.log('HubSpot Extension: Looking for deals table...');
  
  // Use the correct HubSpot table selector
  const dealsTable = document.querySelector('table[data-test-id="framework-data-table"]');
  if (!dealsTable) {
    console.log('HubSpot Extension: Framework data table not found, retrying in 1 second');
    setTimeout(addButtonToDealsTable, 1000);
    return;
  }
  console.log('HubSpot Extension: Framework data table found:', dealsTable);

  const headerRow = dealsTable.querySelector('thead tr');
  console.log('HubSpot Extension: Header row found:', headerRow);
  if (headerRow && !headerRow.querySelector('.hinomi-button-header')) {
    console.log('HubSpot Extension: Adding header cell');
    const headerCell = document.createElement('th');
    headerCell.className = 'sc-AxjAm kWuZwF sc-fzplWN hZkuPt hinomi-button-header';
    headerCell.setAttribute('data-test-width', '150');
    headerCell.setAttribute('data-table-external-id', 'header-actions');
    headerCell.setAttribute('data-test-id', 'header-actions');
    headerCell.setAttribute('role', 'columnheader');
    headerCell.setAttribute('tabindex', '0');
    headerCell.style.cssText = 'width: 150px; min-width: 150px; max-width: 150px;';
    
    const headerContent = document.createElement('div');
    headerContent.style.cssText = 'display: flex; align-items: center; justify-content: center; padding: 8px 16px; min-height: 40px; width: 100%;';
    
    const headerText = document.createElement('span');
    headerText.textContent = 'Actions';
    headerText.style.cssText = 'font-weight: 600; font-size: 14px; color: #33475b;';
    
    headerContent.appendChild(headerText);
    headerCell.appendChild(headerContent);
    headerRow.appendChild(headerCell);
  }

  const bodyRows = dealsTable.querySelectorAll('tbody tr[data-test-id^="row-"]');
  console.log('HubSpot Extension: Found', bodyRows.length, 'deal rows');
  bodyRows.forEach((row, index) => {
    if (row.querySelector('.hinomi-button-cell')) return;

    // Extract deal ID from data-test-id attribute
    const dataTestId = row.getAttribute('data-test-id');
    const dealId = dataTestId ? dataTestId.replace('row-', '') : null;
    console.log(`HubSpot Extension: Row ${index} - Deal ID:`, dealId);
    
    if (!dealId) return;
    
    const buttonCell = document.createElement('td');
    buttonCell.className = 'hinomi-button-cell';
    buttonCell.style.cssText = 'width: 150px; min-width: 150px; max-width: 150px;';
    
    const button = document.createElement('button');
    button.className = 'hinomi-deal-button';
    button.textContent = 'Create Invoice';
    button.onclick = () => {
      console.log('HubSpot Extension: Button clicked for deal ID:', dealId);
      window.open(`https://hook.eu2.make.com/of2xi2g4otdxhpj68knkcca6cfn8jq4y?deal_id=${dealId}`, '_blank');
    };
    
    buttonCell.appendChild(button);
    row.appendChild(buttonCell);
    console.log(`HubSpot Extension: Button added to row ${index}`);
  });
}

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === 'childList') {
      console.log('HubSpot Extension: DOM changed, checking for table updates');
      addButtonToDealsTable();
    }
  });
});

console.log('HubSpot Extension: Current URL:', window.location.href);
if (window.location.href.includes('/objects/0-3/')) {
  console.log('HubSpot Extension: On deals page, initializing...');
  addButtonToDealsTable();
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
} else {
  console.log('HubSpot Extension: Not on deals page');
}