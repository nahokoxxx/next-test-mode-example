import { test, expect } from "next/experimental/testmode/playwright";

test("home", async ({ page, next }) => {
  next.onFetch((request) => {
    if (request.url === "http://my-db/check") {
      return new Response(JSON.stringify({ result: "ok" }), {
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    return "abort";
  });

  await page.goto("http://localhost:3000/");

  await expect(page.locator("body")).toHaveText(/Success/);
});
