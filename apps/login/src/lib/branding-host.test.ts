import { afterEach, describe, expect, it } from "vitest";
import { brandingOrgForHost } from "./zitadel";

describe("brandingOrgForHost (Craftama fork)", () => {
  afterEach(() => {
    delete process.env.BRANDING_HOST_ORGS;
  });

  it("returns undefined without the env variable or host", () => {
    expect(brandingOrgForHost("auth.brickshock.com")).toBeUndefined();
    process.env.BRANDING_HOST_ORGS = "auth.brickshock.com=1";
    expect(brandingOrgForHost(undefined)).toBeUndefined();
  });

  it("maps a host to its organization, ignoring case, port and protocol", () => {
    process.env.BRANDING_HOST_ORGS = "auth.brickshock.com=340286078416060420, other.example = 42";
    expect(brandingOrgForHost("auth.brickshock.com")).toBe("340286078416060420");
    expect(brandingOrgForHost("https://Auth.Brickshock.com:443")).toBe("340286078416060420");
    expect(brandingOrgForHost("other.example")).toBe("42");
  });

  it("leaves other hosts alone", () => {
    process.env.BRANDING_HOST_ORGS = "auth.brickshock.com=340286078416060420";
    expect(brandingOrgForHost("auth.craftama.eu")).toBeUndefined();
  });
});
