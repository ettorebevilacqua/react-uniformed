import { renderHook, act } from 'react-hooks-testing-library'
import { useFields } from '../src';

describe("useFields", () => {
  it('can set values', () => {
    const { result } = renderHook(() => useFields());

    act(() => result.current.setValue("email", "required"));
    expect(result.current.values.email).toEqual("required");
    act(() => result.current.setValues({ "timothy-mic": "happyfeet" }));
    expect(result.current.values).toMatchObject({ "timothy-mic": "happyfeet" });
  });
  it('can reset values', () => {
    const { result } = renderHook(() => useFields());

    act(() => {
      result.current.setValue("cream", "cream is required");
      result.current.setValue("soda", "please pick a soda");
      result.current.setValue("age", 25);
      result.current.setValue("agree", true);
      result.current.setValue("list", [45, "daf"]);
      result.current.setValue("object", { john: "" });
    });
    expect(result.current.values).toEqual({
      cream: "cream is required",
      soda: "please pick a soda",
      age: 25,
      agree: true,
      list: [45, "daf"],
      object: { john: "" },
    });

    act(() => {
      result.current.resetValues();
    });
    expect(result.current.values).toEqual({
      cream: "",
      soda: "",
      age: 0,
      agree: false,
      list: [],
      object: undefined,
    });
  });
  it('can determine if there are values', () => {
    const { result } = renderHook(() => useFields());

    act(() => result.current.setValue("email", "required"));
    expect(result.current.hasValue).toEqual(true);
    act(() => result.current.resetValues());
    expect(result.current.hasValue).toEqual(false);
  });
  it("supports initial values", () => {
    const initialValue = {
      name: "john",
      email: "email@example.com",
    };
    const { result } = renderHook(() => useFields(initialValue));

    act(() => {
      result.current.setValue("name", "cream is required");
      result.current.setValue("email", "please pick a soda");
      result.current.setValue("unknown", "didn't set a value");
    });
    expect(result.current.values).not.toEqual({});
    expect(result.current.values).toEqual({
      name: "cream is required",
      email: "please pick a soda",
      unknown: "didn't set a value",
    });

    act(() => {
      result.current.resetValues();
    });
    expect(result.current.values).toEqual({
      ...initialValue,
      unknown: "",
    });
  });
  it("supports normalizers", () => {
  });
});