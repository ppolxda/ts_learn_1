// import "./src/emums";
class MyClass {
  private readonly prop1 = "prop1";
  private readonly prop2: string = "33333";

  constructor(prop2 = "defaultProp2", private readonly prop3 = "defaultProp3") {
    this.prop2 = prop2;
  }
}
