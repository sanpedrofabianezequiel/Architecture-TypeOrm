export const checksum = (msg: any) => {
  let chk: any = 0x00

  let len = msg.length - 2
  for (let i = 1; i < len; i++) {
    chk ^= msg[i] as any;
  }

  return chk
};
