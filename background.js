let currentDealId = null;
let currentDealUrl = null;

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "createInvoice",
    title: "Create Invoice in Xero",
    contexts: ["all"],
    documentUrlPatterns: [
      "https://app.hubspot.com/*/objects/0-3/*",
      "https://app-eu1.hubspot.com/*/objects/0-3/*"
    ]
  });
  
  chrome.contextMenus.create({
    id: "goToDeal",
    title: "Go to HubSpot Deal",
    contexts: ["all"],
    documentUrlPatterns: [
      "https://go.xero.com/*"
    ]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "createInvoice" && currentDealId) {
    const encodedDealUrl = encodeURIComponent(currentDealUrl || '');
    const url = `https://hook.eu2.make.com/of2xi2g4otdxhpj68knkcca6cfn8jq4y?deal_id=${currentDealId}&deal_url=${encodedDealUrl}`;
    chrome.tabs.create({ url: url });
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "setDealId") {
    currentDealId = request.dealId;
    currentDealUrl = request.dealUrl;
  }
});