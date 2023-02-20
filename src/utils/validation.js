function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

//https://blogpack.tistory.com/600
function fillZero(width, str) {
  return str.length >= width
    ? str
    : new Array(width - str.length + 1).join('0') + str; // 남는 길이 만큼 0으로 채움
}

export { validateEmail, fillZero };
