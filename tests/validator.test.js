import { FormValidator } from "./contact-validator.js";

describe("FormValidator", () => {
  test("validates RFC 5322 compliant emails", () => {
    expect(FormValidator.validateEmail("test@example.com")).toBe(true);
    expect(FormValidator.validateEmail("user.name+tag@domain.co.uk")).toBe(true);
    expect(FormValidator.validateEmail("invalid-email")).toBe(false);
    expect(FormValidator.validateEmail("@missing-user.com")).toBe(false);
    expect(FormValidator.validateEmail("")).toBe(false);
  });

  test("sanitizes dangerous HTML characters", () => {
    const raw = "<script>alert('xss');</script>";
    const sanitized = FormValidator.sanitizeString(raw);
    expect(sanitized).not.toContain("<script>");
    expect(sanitized).toBe("&lt;script&gt;alert(&#x27;xss&#x27;);&lt;/script&gt;");
  });

  test("validates message bounds", () => {
    expect(FormValidator.validateMessage("Short")).toBe(false);
    expect(FormValidator.validateMessage("This is a valid inquiry message.")).toBe(true);
  });
});
