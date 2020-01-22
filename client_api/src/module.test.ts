import { expect } from "chai";
import { Error, Contact } from "./module";

describe("Error", function() {
  it("check", function() {
    let es = new Error();
    expect(es.check()).equal(false);
    es.error = -1;
    expect(es.check()).equal(false);
    es.error = 0;
    es.error_text = "sadasdasd";
    expect(es.check()).equal(true);
  });
});

describe("Contact", function() {
  it("regex", function() {
    let es = new Contact();
    expect(es.check()).equal(false);
    es.phone = "+86 54156454154";
    es.email = "asadas@asdasd.com";
    expect(es.check()).equal(true);

    es.phone = "+8654156454154";
    es.email = "asadas@asdasd.com";
    expect(es.check()).equal(false);
  });
});

describe("Contact", function() {
  it("regex", function() {
    let es = new Contact();
    expect(es.check()).equal(false);
    es.phone = "+86 54156454154";
    es.email = "asadas@asdasd.com";
    expect(es.check()).equal(true);

    es.phone = "+8654156454154";
    es.email = "asadas@asdasd.com";
    expect(es.check()).equal(false);
  });
});
