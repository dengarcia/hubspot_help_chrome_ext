let currentDealId = null;

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "createInvoice",
    title: "Create Invoice",
    contexts: ["all"],
    documentUrlPatterns: [
      "https://app.hubspot.com/*/objects/0-3/*",
      "https://app-eu1.hubspot.com/*/objects/0-3/*"
    ]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "createInvoice" && currentDealId) {
    const url = `https://hook.eu2.make.com/of2xi2g4otdxhpj68knkcca6cfn8jq4y?deal_id=${currentDealId}`;
    chrome.tabs.create({ url: url });
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "setDealId") {
    currentDealId = request.dealId;
  }
});