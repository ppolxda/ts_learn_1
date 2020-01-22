// EnumSexType
export enum EnumSexType {
  NONE = 0, // unknow
  MALE = 1, // male
  FEMALE = 2 // female
}

// EnumSexType
export const EnumSexTypeTranslate = {
  0: "unknow",
  1: "male",
  2: "female"
};

//
export enum EnumCardType {
  IDCARD = 0 //
}

//
export const EnumCardTypeTranslate = {
  0: ""
};

export class Actions {
  public IdCard: EnumCardType = EnumCardType.IDCARD;
  public IdCardF: string = "";
}
