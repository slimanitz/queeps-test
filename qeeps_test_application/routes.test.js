/* eslint-disable no-underscore-dangle */
const request = require('supertest');
const app = require('./config/server');
const connect = require('./config/database');
const { mongoUrl } = require('./config/vars');

describe('Agency API', () => {
  let server;

  beforeAll(() => {
    server = app.listen(8080, async () => {
      await connect();
      console.log('====================================');
      console.log(mongoUrl);
      console.log('====================================');
      console.log('Express server started on port 8080');
    });
  });

  afterAll((done) => {
    server.close(done);
  });
  let agency = {
    name: 'orpi',
    address: 'une address',
    city: 'Paris',
    postalCode: '75003',
    website: 'https://www.orpi.com',
  };
  afterEach(() => {
    agency = {
      _id: agency._id,
      name: 'orpi',
      address: 'une address',
      city: 'Paris',
      postalCode: '75003',
      website: 'https://www.orpi.com',
    };
  });

  describe('POST /api/agencies', () => {
    it('should create a agency', async () => {
      const res = await request(app).post('/api/agencies').send(agency);
      agency._id = res.body._id;
      expect(res.status).toEqual(200);
      expect(res.body.name).toEqual(agency.name);
    });
  });

  describe('GET /api/agencies', () => {
    it('should return all agencies', async () => {
      const res = await request(app).get('/api/agencies');
      expect(res.status).toEqual(200);
      expect(res.body).toContainEqual(agency);
    });
  });

  describe('GET /api/agencies/:id', () => {
    it('should return a single agency by id', async () => {
      const res = await request(app).get(`/api/agencies/${agency._id}`);
      expect(res.status).toEqual(200);
      expect(res.body.name).toEqual(agency.name);
    });

    it('should return 404 if todo is not found', async () => {
      const res = await request(app).get('/api/agencies/99');
      expect(res.status).toEqual(404);
    });
  });

  describe('PATCH /api/agencies/:id', () => {
    it('should update an existing todo', async () => {
      const updatedTodo = {
        name: 'La foret',
        address: 'une address',
        city: 'Paris',
        postalCode: '75003',
        website: 'https://www.orpi.com',
      };
      const res = await request(app)
        .patch(`/api/agencies/${agency._id}`)
        .send(updatedTodo);
      expect(res.status).toEqual(200);
      expect(res.body).toEqual({ ...updatedTodo, _id: agency._id });
    });

    it('should return 404 if agency is not found', async () => {
      const res = await request(app).put('/api/agencies/99').send({ name: 'La foret' });
      expect(res.status).toEqual(404);
    });
  });

  describe('DELETE /api/agencies/:id', () => {
    it('should delete an existing agency', async () => {
      const res = await request(app).delete(`/api/agencies/${agency._id}`);
      expect(res.status).toEqual(200);
    });

    it('should return 404 if agency is not found', async () => {
      const res = await request(app).delete('/api/agencies/99');
      expect(res.status).toEqual(404);
    });
  });
});

// describe('User API', () => {
//   let todos = [
//     { id: 1, task: 'Finish Express API tutorial', completed: false },
//     { id: 2, task: 'Buy groceries', completed: true },

//   ];

//   afterEach(() => {
//     todos = [
//       { id: 1, task: 'Finish Express API tutorial', completed: false },
//       { id: 2, task: 'Buy groceries', completed: true },
//       { id: 3, task: 'Walk the dog', completed: false },
//     ];
//   });

//   describe('GET /todos', () => {
//     it('should return all todos', async () => {
//       const res = await request(app).get('/todos');
//       expect(res.status).toEqual(200);
//       expect(res.body).toEqual(todos);
//     });
//   });

//   describe('GET /todos/:id', () => {
//     it('should return a single todo by id', async () => {
//       const res = await request(app).get('/todos/2');
//       expect(res.status).toEqual(200);
//       expect(res.body).toEqual(todos[1]);
//     });

//     it('should return 404 if todo is not found', async () => {
//       const res = await request(app).get('/todos/99');
//       expect(res.status).toEqual(404);
//     });
//   });

//   describe('POST /todos', () => {
//     it('should create a new todo', async () => {
//       const newTodo = { task: 'Clean the house', completed: false };
//       const res = await request(app).post('/todos').send(newTodo);
//       expect(res.status).toEqual(200);
//       expect(res.body.task).toEqual(newTodo.task);
//       expect(res.body.completed).toEqual(newTodo.completed);
//       expect(todos).toContainEqual(res.body);
//     });
//   });

//   describe('PUT /todos/:id', () => {
//     it('should update an existing todo', async () => {
//       const todoToUpdate = todos[1];
//       const updatedTodo = { ...todoToUpdate, task: 'Buy new shoes' };
//       const res = await request(app)
//         .put(`/todos/${todoToUpdate.id}`)
//         .send(updatedTodo);
//       expect(res.status).toEqual(200);
//       expect(res.body).toEqual(updatedTodo);
//       expect(todos).toContainEqual(updatedTodo);
//       expect(todos).not.toContainEqual(todoToUpdate);
//     });

//     it('should return 404 if todo is not found', async () => {
//       const res = await request(app).put('/todos/99').send({ task: 'New task' });
//       expect(res.status).toEqual(404);
//     });
//   });

//   describe('DELETE /todos/:id', () => {
//     it('should delete an existing todo', async () => {
//       const todoToDelete = todos[1];
//       const res = await request(app).delete(`/todos/${todoToDelete.id}`);
//       expect(res.status).toEqual(204);
//       expect(todos).not.toContainEqual(todoToDelete);
//     });

//     it('should return 404 if todo is not found', async () => {
//       const res = await request(app).delete('/todos/99');
//       expect(res.status).toEqual(404);
//     });
//   });
// });
