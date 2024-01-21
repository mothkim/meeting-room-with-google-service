function meetingRoomBooking() {
    var mySpreadSheet = SpreadsheetApp.openById("<ใส่ SpreadSheet ID>").getSheetByName("<ใส่ Sheet Name");
    var lastRow = mySpreadSheet.getLastRow();
    var lastColumn = mySpreadSheet.getLastColumn();
  
    //Set data for Google Calendar//
    var name = mySpreadSheet.getRange(lastRow, 2).getValue();
    var phoneNumber = mySpreadSheet.getRange(lastRow, 3).getValue();
    var roomNumber = mySpreadSheet.getRange(lastRow, 4).getValue();
    var startDate = new Date(mySpreadSheet.getRange(lastRow, 5).getValue());
    var endDate = new Date(mySpreadSheet.getRange(lastRow, 6).getValue());
  
    // Test Debug //
    // Logger.log("name:" + name);
    // Logger.log("Phone Number:" + phoneNumber);
    // Logger.log("Room :" + roomNumber);
    // Logger.log("Start Date:" + startDate);
    // Logger.log("End Date:" + endDate);
  
    //Creates a calendar event using the submitted data
    var calendar = CalendarApp.getCalendarById("<ใส่ Calendar ID>");
    var titles = ('Room' + roomNumber + name + ' ' + 'Tel.' + phoneNumber);
    var descriptions = roomNumber;
  
    let events = calendar.getEvents( startDate, endDate, { search: roomNumber} );
    if( events.length === 0 ) {
      calendar.createEvent(titles, startDate, endDate, {description: descriptions});
      console.log("Created Event");
    } else {
      
      // Line Notify // 
      var token = "<ใส่ Line Token>";
      var lintNotifytoken = [token];
  
      // ข้อความสามารถปรับแต่งเองได้ //
      var params = {
                "method": "post",
                "payload": "message=" + 'คุณ' + ' ' + name + ' ' + 'ไม่สามารถจอง' + ' ' + roomNumber + '  '  + 'ได้' + '  ' + 'เนื่องจากมีผู้จองช่วงเวลานี้ไปแล้ว',
                "headers": {
                            "Authorization": "Bearer " + lintNotifytoken
                            }
              };
      //------------------------------------------------------------
      UrlFetchApp.fetch("https://notify-api.line.me/api/notify", params);
      //-------------------------------------------------------------
      
      // Email Notify //
      
      MailApp.sendEmail({
      to: "e-mail-1@gmail.com, e-mail-2@gmail.com",
      subject: "จองห้องประชุมไม่สำเร็จ",
      htmlBody: "คุณ" + name + "ไม่สามารถจอง" + roomNumber + "ได้ เนื่องจากมีผู้จองช่วงเวลานี้ไปแล้ว <br>" +
                "กรุณาจองห้องประชุมใหม่อีกครั้ง"
      });
      
      console.log("Duplicate Event")
    }
  }