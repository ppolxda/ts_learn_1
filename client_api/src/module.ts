export function _(val: string): string {
  return val;
}

// ----------------------------------------------
//        enum define
// ----------------------------------------------

// EnumSexType
export enum EnumSexType {
  NONE = 0, // unknow
  MALE = 1, // male
  FEMALE = 2 // female
}

// EnumSexType
export const FEMALETranslate = {
  0: "unknow",
  1: "male",
  2: "female"
};

//
export enum CreateUserReqIdCardEnumCardType {
  IDCARD = 0 //
}

//
export const IDCardTranslate = {
  0: ""
};

// ----------------------------------------------
//        FieldChecker define
// ----------------------------------------------

class FieldOptions {
  public type: string = "";
  public array: boolean = false;
  public maxlen: number | null = null;
  public minlen: number | null = null;
  public maxval: number | null = null;
  public minval: number | null = null;
  // TODO - regex compatible
  public regex: RegExp | null = null;

  constructor(
    type: string,
    array: boolean,
    maxlen: number | null = null,
    minlen: number | null = null,
    maxval: number | null = null,
    minval: number | null = null,
    regex: RegExp | null = null
  ) {
    this.type = type;
    this.array = array;
    this.maxlen = maxlen;
    this.minlen = minlen;
    this.maxval = maxval;
    this.minval = minval;
    this.regex = regex;
  }

  static check_enum(opt: FieldOptions, val: number): boolean {
    // TODO - enum range check
    // if (val == null) {
    //   return true;
    // }

    if (typeof val !== "number") {
      return false;
    }
    return true;
  }

  static check_boolean(opt: FieldOptions, val: boolean): boolean {
    // if (val == null) {
    //   return true;
    // }

    if (typeof val !== "boolean") {
      return false;
    }
    return true;
  }

  static check_number(opt: FieldOptions, val: number): boolean {
    // if (val == null) {
    //   return true;
    // }

    if (typeof val !== "number") {
      return false;
    }

    if (opt.maxval !== null && val > opt.maxval) {
      return false;
    }

    if (opt.minval !== null && val < opt.minval) {
      return false;
    }
    return true;
  }

  static check_string(opt: FieldOptions, val: string): boolean {
    // if (val == null) {
    //   return true;
    // }

    if (typeof val !== "string") {
      return false;
    }

    if (opt.maxlen !== null && val.length > opt.maxlen) {
      return false;
    }

    if (opt.minlen !== null && val.length < opt.minlen) {
      return false;
    }

    // TODO - regex compatible
    if (opt.regex !== null) {
      if (!opt.regex.test(val)) {
        return false;
      }
    }
    return true;
  }

  public check(val: any, ignore_array: boolean = false): boolean {
    if (this.array) {
      if (!(val instanceof Array)) {
        return false;
      }

      let error = false;

      for (let el of val) {
        if (!this.check(el, true)) {
          error = true;
          break;
        }
      }

      if (error) {
        return false;
      }
    } else if (this.type == "enum" && !FieldOptions.check_enum(this, val)) {
      return false;
    } else if (this.type == "string" && !FieldOptions.check_string(this, val)) {
      return false;
    } else if (this.type == "number" && !FieldOptions.check_number(this, val)) {
      return false;
    } else if (
      this.type == "boolean" &&
      !FieldOptions.check_boolean(this, val)
    ) {
      return false;
    } else if (this.type == "message" && !val.check()) {
      return false;
    }
    return true;
  }
}

type FieldData = { [key: string]: any };
type FieldOptionType = { [key: string]: FieldOptions };

// ----------------------------------------------
//        module define
// ----------------------------------------------

export class NullReq {
  public options = {};

  public field_keys: string[] = [];

  public check(): boolean {
    let opt: FieldOptions | null = null;
    return true;
  }
}
export class Error {
  public error: number = 0; // error code
  public error_text: string = ""; // error text
  public options = {
    error: new FieldOptions("number", false, null, null, null, 0.0, null),
    error_text: new FieldOptions("string", false, null, 1, null, null, null)
  };

  public field_keys: string[] = ["error", "error_text"];

  public check(): boolean {
    let opt: FieldOptions | null = null;
    opt = this.options["error"];
    if (!opt.check(this.error)) {
      return false;
    }
    opt = this.options["error_text"];
    if (!opt.check(this.error_text)) {
      return false;
    }
    return true;
  }
}
export class NullRsp {
  public error: Error = new Error(); //
  public options = {
    error: new FieldOptions("message", false, null, null, null, null, null)
  };

  public field_keys: string[] = ["error"];

  public check(): boolean {
    let opt: FieldOptions | null = null;
    opt = this.options["error"];
    if (!opt.check(this.error)) {
      return false;
    }
    return true;
  }
}
export class NullQuery {
  public options = {};

  public field_keys: string[] = [];

  public check(): boolean {
    let opt: FieldOptions | null = null;
    return true;
  }
}
export class NullHeader {
  public options = {};

  public field_keys: string[] = [];

  public check(): boolean {
    let opt: FieldOptions | null = null;
    return true;
  }
}
export class DefaultQuery {
  public where: string = ""; // sql where
  public sort: string = ""; // sql sort
  public csv: string = ""; // csv config
  public show: string = ""; // show config
  public options = {
    where: new FieldOptions("string", false, 1024, 0, null, null, null),
    sort: new FieldOptions("string", false, 1024, 0, null, null, null),
    csv: new FieldOptions("string", false, 1024, 0, null, null, null),
    show: new FieldOptions("string", false, 1024, 0, null, null, null)
  };

  public field_keys: string[] = ["where", "sort", "csv", "show"];

  public check(): boolean {
    let opt: FieldOptions | null = null;
    opt = this.options["where"];
    if (!opt.check(this.where)) {
      return false;
    }
    opt = this.options["sort"];
    if (!opt.check(this.sort)) {
      return false;
    }
    opt = this.options["csv"];
    if (!opt.check(this.csv)) {
      return false;
    }
    opt = this.options["show"];
    if (!opt.check(this.show)) {
      return false;
    }
    return true;
  }
}
export class DefaultHeader {
  public token: string = ""; //
  public options = {
    token: new FieldOptions("string", false, null, null, null, null, null)
  };

  public field_keys: string[] = ["token"];

  public check(): boolean {
    let opt: FieldOptions | null = null;
    opt = this.options["token"];
    if (!opt.check(this.token)) {
      return false;
    }
    return true;
  }
}
export class Contact {
  public phone: string = ""; // phone
  public email: string = ""; // email
  public options = {
    phone: new FieldOptions(
      "string",
      false,
      50,
      1,
      null,
      null,
      /^\+([0-9]{1,}) ([0-9]{6,})$/g
    ),
    email: new FieldOptions(
      "string",
      false,
      200,
      1,
      null,
      null,
      /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/g
    )
  };

  public field_keys: string[] = ["phone", "email"];

  public check(): boolean {
    let opt: FieldOptions | null = null;
    opt = this.options["phone"];
    if (!opt.check(this.phone)) {
      return false;
    }
    opt = this.options["email"];
    if (!opt.check(this.email)) {
      return false;
    }
    return true;
  }
}
export class CreateUserReqIdCard {
  public cardno: string = ""; //
  public cardtype: CreateUserReqIdCardEnumCardType =
    CreateUserReqIdCardEnumCardType.IDCARD; //
  public options = {
    cardno: new FieldOptions("string", false, 50, 1, null, null, null),
    cardtype: new FieldOptions("enum", false, null, null, null, null, null)
  };

  public field_keys: string[] = ["cardno", "cardtype"];

  public check(): boolean {
    let opt: FieldOptions | null = null;
    opt = this.options["cardno"];
    if (!opt.check(this.cardno)) {
      return false;
    }
    opt = this.options["cardtype"];
    if (!opt.check(this.cardtype)) {
      return false;
    }
    return true;
  }
}
export class CreateUserReq {
  public username: string = ""; //
  public age: number = 0; //
  public sex: EnumSexType = EnumSexType.NONE; //
  public contact: Contact = new Contact(); //
  public card: CreateUserReqIdCard = new CreateUserReqIdCard(); //
  public birthday: Date = new Date("1900-01-01"); //
  public options = {
    username: new FieldOptions("string", false, 50, 1, null, null, null),
    age: new FieldOptions("number", false, null, null, 200.0, 1.0, null),
    sex: new FieldOptions("enum", false, null, null, null, null, null),
    contact: new FieldOptions("message", false, null, null, null, null, null),
    card: new FieldOptions("message", false, null, null, null, null, null),
    birthday: new FieldOptions("datetime", false, null, null, null, null, null)
  };

  public field_keys: string[] = [
    "username",
    "age",
    "sex",
    "contact",
    "card",
    "birthday"
  ];

  public check(): boolean {
    let opt: FieldOptions | null = null;
    opt = this.options["username"];
    if (!opt.check(this.username)) {
      return false;
    }
    opt = this.options["age"];
    if (!opt.check(this.age)) {
      return false;
    }
    opt = this.options["sex"];
    if (!opt.check(this.sex)) {
      return false;
    }
    opt = this.options["contact"];
    if (!opt.check(this.contact)) {
      return false;
    }
    opt = this.options["card"];
    if (!opt.check(this.card)) {
      return false;
    }
    opt = this.options["birthday"];
    if (!opt.check(this.birthday)) {
      return false;
    }
    return true;
  }
}
export class CreateUserQuery {
  public is_debug: boolean = false; //
  public rnd: number = 0; //
  public options = {
    is_debug: new FieldOptions("boolean", false, null, null, null, null, null),
    rnd: new FieldOptions("number", false, null, null, null, null, null)
  };

  public field_keys: string[] = ["is_debug", "rnd"];

  public check(): boolean {
    let opt: FieldOptions | null = null;
    opt = this.options["is_debug"];
    if (!opt.check(this.is_debug)) {
      return false;
    }
    opt = this.options["rnd"];
    if (!opt.check(this.rnd)) {
      return false;
    }
    return true;
  }
}
export class Users {
  public userid: number = 0; //
  public create_time: Date = new Date("1900-01-01"); //
  public username: string = ""; //
  public age: number = 0; //
  public sex: EnumSexType = EnumSexType.NONE; //
  public contact: Contact = new Contact(); //
  public card: CreateUserReqIdCard = new CreateUserReqIdCard(); //
  public birthday: Date = new Date("1900-01-01"); //
  public options = {
    userid: new FieldOptions("number", false, null, null, null, 1.0, null),
    create_time: new FieldOptions(
      "datetime",
      false,
      null,
      null,
      null,
      1.0,
      null
    ),
    username: new FieldOptions("string", false, 50, 1, null, null, null),
    age: new FieldOptions("number", false, null, null, 200.0, 1.0, null),
    sex: new FieldOptions("enum", false, null, null, null, null, null),
    contact: new FieldOptions("message", false, null, null, null, null, null),
    card: new FieldOptions("message", false, null, null, null, null, null),
    birthday: new FieldOptions("datetime", false, null, null, null, null, null)
  };

  public field_keys: string[] = [
    "userid",
    "create_time",
    "username",
    "age",
    "sex",
    "contact",
    "card",
    "birthday"
  ];

  public check(): boolean {
    let opt: FieldOptions | null = null;
    opt = this.options["userid"];
    if (!opt.check(this.userid)) {
      return false;
    }
    opt = this.options["create_time"];
    if (!opt.check(this.create_time)) {
      return false;
    }
    opt = this.options["username"];
    if (!opt.check(this.username)) {
      return false;
    }
    opt = this.options["age"];
    if (!opt.check(this.age)) {
      return false;
    }
    opt = this.options["sex"];
    if (!opt.check(this.sex)) {
      return false;
    }
    opt = this.options["contact"];
    if (!opt.check(this.contact)) {
      return false;
    }
    opt = this.options["card"];
    if (!opt.check(this.card)) {
      return false;
    }
    opt = this.options["birthday"];
    if (!opt.check(this.birthday)) {
      return false;
    }
    return true;
  }
}
export class GetUsersRsp {
  public error: Error = new Error(); //
  public datas: Users[] = []; //
  public options = {
    error: new FieldOptions("message", false, null, null, null, null, null),
    datas: new FieldOptions("message", true, null, null, null, null, null)
  };

  public field_keys: string[] = ["error", "datas"];

  public check(): boolean {
    let opt: FieldOptions | null = null;
    opt = this.options["error"];
    if (!opt.check(this.error)) {
      return false;
    }
    opt = this.options["datas"];
    if (!opt.check(this.datas)) {
      return false;
    }
    return true;
  }
}
