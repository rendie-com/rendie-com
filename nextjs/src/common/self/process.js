export const self_process = {
  a01: async function (obj) {
    let nObj = null
    switch (obj.fun) {
      case "cwd": nObj = process.cwd(); break;
      case "env": nObj = this.env(obj.name); break;
    }
    return nObj;
  },
  env: function (name) {
    if (name) {
      return process.env[name];
    }
    else {
      return process.env;
    }
  },
};