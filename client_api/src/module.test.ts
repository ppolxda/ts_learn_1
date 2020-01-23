import { expect } from "chai";
import {
  ErrorInfo,
  Contact,
  Users,
  CreateUserReqIdCardEnumCardType
} from "./module";
import moment from "moment";

interface Data {
  a?: string;
  b?: string;
}

describe("moment", function() {
  it("test", function() {
    let data = moment("12-25-1995", "MM-DD-YYYY");
    expect(moment.isMoment(data)).equal(true);

    let c: Data = { a: "asdasd" };
    // let xh = Object.getOwnPropertyNames(c);
    let xs = Object.getOwnPropertyDescriptor(c, "a");
    if (xs) {
      expect(xs.value).equal("asdasd");
    }
  });
});

describe("Error", function() {
  it("check", function() {
    let es = new ErrorInfo();
    let err = es.check();
    expect(err).instanceOf(Error);
    es.error = -1;
    err = es.check();
    expect(err).instanceOf(Error);
    es.error = 0;
    es.error_text = "sadasdasd";
    err = es.check();
    expect(err).equal(null);
  });
  it("new_by_interface", function() {
    let es = new ErrorInfo({ error: 1, error_text: "eeee" });
    let err = es.check();
    expect(err).equal(null);
    expect(es.error).equal(1);
    expect(es.error_text).equal("eeee");
  });
});

describe("Contact", function() {
  it("regex", function() {
    let es = new Contact();
    expect(es.check()).instanceOf(Error);
    es.phone = "+86 54156454154";
    es.email = "asadas@asdasd.com";
    expect(es.check()).equal(null);

    es.phone = "+8654156454154";
    es.email = "asadas@asdasd.com";
    expect(es.check()).instanceOf(Error);
  });
});

describe("Contact", function() {
  it("regex", function() {
    let es = new Contact();
    expect(es.check()).instanceOf(Error);
    es.phone = "+86 54156454154";
    es.email = "asadas@asdasd.com";
    expect(es.check()).equal(null);

    es.phone = "+8654156454154";
    es.email = "asadas@asdasd.com";
    expect(es.check()).instanceOf(Error);
  });
});

describe("Users", function() {
  it("date", function() {
    let es = new Users();
    expect(es.check()).instanceOf(Error);
    es.userid = 20;
    es.username = "asdasdasd";
    es.age = 58;
    es.contact.phone = "+86 54156454154";
    es.contact.email = "asadas@asdasd.com";
    es.card.cardno = "asadas@asdasd.com";
    es.card.cardtype = CreateUserReqIdCardEnumCardType.IDCARD;
    es.create_time = moment("1900-01-02");
    es.birthday = moment("1900-01-02");
    expect(es.check()).equal(null);
    let tjson = es.toJsonString();
    expect(es.check()).equal(null);
  });
});
