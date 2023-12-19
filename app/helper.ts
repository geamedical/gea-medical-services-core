import Application from "@ioc:Adonis/Core/Application";
import Drive from "@ioc:Adonis/Core/Drive";
import axios from "axios";
import moment from "moment";
import Env from "@ioc:Adonis/Core/Env";
import User from "./Models/User";
import Hash from "@ioc:Adonis/Core/Hash";
const fs = require("fs").promises;

export async function UploadFile(
  file: {
    move: (arg0: string, arg1: { name: string; overwrite: boolean }) => any;
    extname: any;
  },
  namefile: string,
  pathtarget: string
) {
  return await file.move(Application.tmpPath(pathtarget), {
    name: `${namefile}.${file.extname}`,
    overwrite: true,
  });
}
export async function UnlinkFile(namefile: string, pathtarget: string) {
  const filePath = Application.tmpPath(`${pathtarget}/${namefile}`);
  return await Drive.delete(filePath);
}
export function DateTimeFormated(
  format: string | undefined,
  date: moment.MomentInput
) {
  return moment(date).format(format);
}
export function uniqueString(length: number) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
export function uniqueDatime(xDate: {
  getFullYear: () => {
    (): any;
    new (): any;
    toString: { (arg0: number): string; new (): any };
  };
  getMonth: () => number;
  getDate: () => {
    (): any;
    new (): any;
    toString: { (arg0: number): string; new (): any };
  };
  getHours: () => {
    (): any;
    new (): any;
    toString: { (arg0: number): string; new (): any };
  };
  getMinutes: () => {
    (): any;
    new (): any;
    toString: { (arg0: number): string; new (): any };
  };
  getSeconds: () => {
    (): any;
    new (): any;
    toString: { (arg0: number): string; new (): any };
  };
}) {
  return (
    xDate.getFullYear().toString(10).substring(2) +
    (xDate.getMonth() + 1).toString(10).padStart(2, "0") +
    xDate.getDate().toString(10).padStart(2, "0") +
    xDate.getHours().toString(10).padStart(2, "0") +
    xDate.getMinutes().toString(10).padStart(2, "0") +
    xDate.getSeconds().toString(10).padStart(2, "0")
  );
}
export function getRandomNumbers(max: number) {
  const q = Math.floor(Math.random() * max).toFixed(2);
  return parseFloat(q);
}
export function arrayUnique(array) {
  var a = array.concat();
  for (var i = 0; i < a.length; ++i) {
    for (var j = i + 1; j < a.length; ++j) {
      if (a[i] === a[j]) a.splice(j--, 1);
    }
  }
  return a;
}

export function response(code: number, msg: any) {
  switch (code) {
    case 200:
      return {
        res: { status: true, data: msg, msg: "success" },
        statCode: code,
      };
    case 400:
      return {
        res: { status: false, data: msg, msg: "error" },
        statCode: code,
      };
    case 401:
      return {
        res: { status: false, data: msg, msg: "error" },
        statCode: code,
      };
    case 422:
      return {
        res: { status: false, data: msg, msg: "error" },
        statCode: code,
      };
    case 404:
      return {
        res: { status: false, data: msg, msg: "error" },
        statCode: code,
      };
  }
}
export function responseErrors(err: any) {
  switch (err.code) {
    case "E_INVALID_AUTH_PASSWORD":
      return response(404, err.responseText);
    case "E_ROW_NOT_FOUND":
      return response(404, err);
    case "E_VALIDATION_FAILURE":
      return response(422, err.messages);
    default:
      return response(400, err);
  }
}
export function ParamsGeaApiServices() {
  return {
    id: "Alan",
    key: "5FgbITVgBo8hH5HAOPgBSLLiHGHcAZHWJsDQ3kxPppEzKr",
  };
}
export function HeaderGeaApiServices() {
  return {
    headers: {
      "Content-Type": "application/json",
    },
  };
}
export function ParamsGeaApiServicesLogin(username, pin) {
  return { username: username, pin: pin };
}
export function HeaderGeaApiServicesLogin(token) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
}
export function sendWA(msg: string, phone: string) {
  var $sendWA = {
    phone_no: phone,
    key: Env.get("WA_KEY"),
    message: msg,
  };
  let $headers = {
    "Content-Type": "application/json",
  };
  setTimeout(() => {
    return axios.post(Env.get("WA_URL_API"), $sendWA, {
      headers: $headers,
    });
  }, 10000);
}

export async function FindUserAuthLocalDb(username: string, password: string) {
  try {
    const findUser = await User.query()
      .where(async (query) => {
        query.where("username", username).andWhere("activation", "valid");
      })
      .first();
    const isSame = await Hash.verify(findUser!.password, password);
    if (isSame) {
      const update = await User.findOrFail(findUser?.id);
      update.islogin = "y";
      await update.save();
      return response(200, {
        username: findUser!.username,
        password: password,
      });
    } else {
      return response(401, { username: findUser!.username, password: null });
    }
  } catch (error) {
    return responseErrors(error);
  }
}

export async function ReadDirectory(path) {
  try {
    const files = await fs.readdir(path);
    const jsonResponse = { files };
    return response(200, { readir: jsonResponse['files'] });
  } catch (error) {
    return responseErrors(error);
  }
}
