// background.js

var level = 1;

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ level });
  console.log('Default background color set to %cgreen', `color: ${color}`);
});