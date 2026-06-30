import request from "supertest";
import { app } from "./app.js";
import { connectDatabase, disconnectDatabase } from "./config/database.js";

describe("Backend POST endpoints", () => {
  beforeAll(async () => {
    await connectDatabase();
  });

  afterAll(async () => {
    await disconnectDatabase();
  });

  it("creates a new user", async () => {
    const response = await request(app).post("/api/users").send({
      name: "Test User",
      email: "test.user@example.com",
      team: "Blue Sharks",
    });

    expect([200, 201]).toContain(response.status);
    expect(response.body).toHaveProperty("user");
    expect(response.body.user).toHaveProperty("email", "test.user@example.com");
  });

  it("creates a new activity", async () => {
    const users = await request(app).get("/api/users");
    const userId = users.body.users?.[0]?._id;
    expect(userId).toBeDefined();

    const response = await request(app).post("/api/activities").send({
      userId,
      type: "run",
      durationMinutes: 20,
      distanceKm: 3.2,
      points: 40,
      date: new Date().toISOString(),
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("activity");
    expect(response.body.activity).toHaveProperty("type", "run");
  });
});
