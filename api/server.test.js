const db = require("../data/db-config");
const server = require("./server");
const request = require("supertest");

const baseURL = "/api/pets";

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db.seed.run();
});

describe("[0] SANITY TEST", () => {
  test("[a] test suite works", () => {
    expect(1).toBe(1);
  });
  test("[b] environment is 'testing'", () => {
    expect(process.env.NODE_ENV).toBe("testing");
  });
});

describe("[GET] /", () => {
  test("[a] endpoint gets all pets", async () => {
    const res = await request(server).get(`${baseURL}`);
    expect(res.body).toHaveLength(3);
  });
});
