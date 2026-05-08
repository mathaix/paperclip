import { describe, expect, it } from "vitest";
import { resolveDatabaseUrl } from "../config.js";

describe("resolveDatabaseUrl", () => {
  it("overrides the database name while preserving connection parameters", () => {
    expect(
      resolveDatabaseUrl(
        "postgres://user:pass@db.example.test/neondb?sslmode=require",
        "paperclip",
      ),
    ).toBe("postgres://user:pass@db.example.test/paperclip?sslmode=require");
  });

  it("leaves the URL unchanged when no Paperclip database name is configured", () => {
    expect(resolveDatabaseUrl("postgres://user:pass@db.example.test/neondb", "")).toBe(
      "postgres://user:pass@db.example.test/neondb",
    );
  });

  it("rejects unsafe database names", () => {
    expect(() => resolveDatabaseUrl("postgres://user:pass@db.example.test/neondb", "paperclip;drop")).toThrow(
      "PAPERCLIP_DATABASE_NAME",
    );
  });
});
