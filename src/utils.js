export const formatDate = (dateObj) => {
  var month = String(dateObj.month).padStart(2, "0");
  var day = String(dateObj.day).padStart(2, "0");

  var formattedDate = dateObj.year + "-" + month + "-" + day;

  return formattedDate;
};