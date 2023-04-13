var crcRes: number[] = [];

let checKCrc = function (res: number): any {
  if (crcRes.indexOf(res) > -1) {
    res++;
    return checKCrc(res);
  } else {
    return res;
  }
};

let thisAdd = function (value: number) {
  crcRes.push(value);
};

export default {
  check: checKCrc,
  add: thisAdd,
};
