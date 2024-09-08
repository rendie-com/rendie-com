export const self_process = {
  a01: async function (obj) {
    let nObj = null
    switch (obj.fun) {
      case "cwd": nObj = process.cwd(); break;
    }
    return nObj;
  },
};