function findDealIdFromElement(element) {
  let current = element;
  
  while (current && current !== document.body) {
    const dataTestId = current.getAttribute('data-test-id');
    
    if (dataTestId && dataTestId.startsWith('row-')) {
      return dataTestId.replace('row-', '');
    }
    
    if (dataTestId && dataTestId.startsWith('cell-0-3-') && dataTestId.includes('-')) {
      const parts = dataTestId.split('-');
      if (parts.length >= 4) {
        return parts[parts.length - 1];
      }
    }
    
    current = current.parentElement;
  }
  
  return null;
}

document.addEventListener('contextmenu', (event) => {
  if (!window.location.href.includes('/objects/0-3/')) {
    return;
  }
  
  const dealId = findDealIdFromElement(event.target);
  
  const hubId = window.location.pathname.split('/')[2];
  const dealUrl = `${window.location.origin}/contacts/${hubId}/record/0-3/${dealId}`;
  
  chrome.runtime.sendMessage({
    action: "setDealId",
    dealId: dealId,
    dealUrl: dealUrl
  });
});
