/**
 * Modulus Technologies - Field Operations Survey
 * Google Apps Script Backend
 */

function doPost(e) {
  try {
    var data;
    
    // Parse the incoming JSON payload.
    // The front-end sends the payload as 'text/plain' to avoid CORS preflight issues.
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else {
      // Fallback if data is sent via URL encoded form data
      data = e.parameter;
    }
    
    // Get the active spreadsheet and its first sheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Prepare the row data by mapping the JSON payload keys
    // Arrays (like checkboxes) are converted to comma-separated strings
    var rowData = [
      new Date(), // 1. Timestamp
      data.primaryRole || "", // 2. Primary Role
      data.dailyResponsibilities || "", // 3. Main daily responsibilities
      Array.isArray(data.receiveTasks) ? data.receiveTasks.join(", ") : (data.receiveTasks || ""), // 4. How you receive tasks
      data.stepByStepProcess || "", // 5. Step-by-step process
      data.reportCompletion || "", // 6. How you report task completion
      Array.isArray(data.challengesPhotos) ? data.challengesPhotos.join(", ") : (data.challengesPhotos || ""), // 7. Challenges with site photos/measurements
      data.averagePhotos || "", // 8. Average number of photos
      data.safetyProtocols || "", // 9. Safety/PPE protocols manually logged
      data.clientApproval || "", // 10. Process for client approval/sign-off
      data.logTools || "", // 11. How you log tools/consumables taken to site
      data.emergencyRequests || "", // 12. Handling requests for emergency fuel/parts
      data.poorInternetFrequency || "", // 13. Frequency of zero/poor internet on-site
      Array.isArray(data.externalApps) ? data.externalApps.join(", ") : (data.externalApps || ""), // 14. Most used external apps
      data.bankingActions || "", // 15. Specific actions for Banking/Payment apps
      data.sosProtocol || "", // 16. Current SOS/urgent assistance protocol
      data.toolWishlist || "", // 17. Top tool integration wishlist
      data.majorHeadache || "" // 18. One major headache this EWMS app should solve
    ];
    
    // Append the assembled row to the active sheet
    sheet.appendRow(rowData);
    
    // Return a JSON success response
    // ContentService automatically handles CORS when responding to fetch
    return ContentService.createTextOutput(JSON.stringify({
      "status": "success", 
      "message": "Survey data recorded successfully"
    })).setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return a JSON error response
    return ContentService.createTextOutput(JSON.stringify({
      "status": "error", 
      "message": error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle OPTIONS request for CORS preflight
 * (Google Apps Script handles most of this inherently, but it's good practice)
 */
function doOptions(e) {
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT);
}
