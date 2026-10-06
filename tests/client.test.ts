import { normalizeProperties } from "../src/gsc/client";

test("normalizes, deduplicates and sorts Search Console properties", () => {
  expect(
    normalizeProperties([
      { siteUrl: "https://z.example/" },
      { siteUrl: " sc-domain:example.com ", permissionLevel: "siteOwner" },
      { siteUrl: "https://z.example/", permissionLevel: "siteFullUser" },
      { siteUrl: "" },
    ]),
  ).toEqual([
    {
      siteUrl: "sc-domain:example.com",
      permissionLevel: "siteOwner",
    },
    { siteUrl: "https://z.example/" },
  ]);
});
