import request from "supertest";
import { app } from "./app.js";
import { connectDatabase, disconnectDatabase } from "./config/database.js";

describe("Backend API", () => {
  beforeAll(async () => {
    await connectDatabase();
  });

  afterAll(async () => {
    await disconnectDatabase();
  });

  it("returns runtime config", async () => {
    const response = await request(app).get("/config");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("apiBaseUrl");
  });

  it("returns users list", async () => {
    const response = await request(app).get("/api/users");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("count");
    expect(response.body).toHaveProperty("users");
  });

  it("returns activities list", async () => {
    const response = await request(app).get("/api/activities");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("count");
    expect(response.body).toHaveProperty("activities");
  });
});
