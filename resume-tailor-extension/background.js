chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "createResume") {
    const highlightedText = info.selectionText;
    if (!highlightedText) return;

    // Replace YOUR_PERSONAL_ACCESS_TOKEN with a GitHub PAT with repo + workflow permissions
    fetch("https://api.github.com/repos/AshwinJ127/resume-tailor/actions/workflows/tailor-resume.yml/dispatches", {
      method: "POST",
      headers: {
        "Accept": "application/vnd.github+json",
        "Authorization": "token YOUR_PERSONAL_ACCESS_TOKEN",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ref: "main",
        inputs: {
          job_description: highlightedText
        }
      })
    }).then(response => {
      if (response.ok) {
        console.log("Workflow dispatched successfully!");
      } else {
        console.error("Failed to dispatch workflow", response.status);
      }
    });
  }
});
