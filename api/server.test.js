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
  test("[b] responds with status 200 OK", async () => {
    const res = await request(server).get(`${baseURL}`);
    expect(res.status).toBe(200);
  });
});

describe("[GET] /:id", () => {
  test("[a] endpoint gets a single pet of the given id", async () => {
    const res = await request(server).get(`${baseURL}/1`);
    expect(res.body).toMatchObject({ pet_name: "fido", pet_age: 5 });
  });
  test("[b] responds with status 200 OK", async () => {
    const res = await request(server).get(`${baseURL}/1`);
    expect(res.status).toBe(200);
  });
  test("[c] responds with status 404 if pet_id not found", async () => {
    const res = await request(server).get(`${baseURL}/4`);
    expect(res.status).toBe(404);
  });
  test("[d] responds with appropriate error message if pet_id not found", async () => {
    const res = await request(server).get(`${baseURL}/4`);
    expect(res.body.message).toBe("Pet not found");
  });
});

describe("[POST] /", () => {
  const newPet = { pet_name: "leroy", pet_age: 9 };
  test("[a] inserts a new pet into pets table", async () => {
    await request(server).post(`${baseURL}`).send(newPet);
    expect(await db("pets")).toHaveLength(4);
  });
  test("[b] responds with status 201 Created", async () => {
    const res = await request(server).post(`${baseURL}`).send(newPet);
    expect(res.status).toBe(201);
  });
});

describe("[PUT] /:id", () => {
  const updatedPet = { pet_name: "fido", pet_age: 12 };
  test("[a] successfully updates the appropriate pet in the table", async () => {
    const res = await request(server).put(`${baseURL}/1`).send(updatedPet);
    expect(res.status).toBe(204);
  });
});

describe("[DELETE] /:id", () => {
  test("[a] successfully deletes the appropriate pet in the table", async () => {
    await request(server).delete(`${baseURL}/1`);
    const pets = await db("pets");
    expect(pets).toHaveLength(2);
  });
});
