/* eslint-disable class-methods-use-this */
const sqlite3 = require('sqlite3').verbose()
const path = require('path')
const dbPath = path.resolve(__dirname, 'todo.db')


const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.log(err)
  }
  console.log('Connected to todo database');
});

// db.serialize(() => {
//   db.run(`CREATE TABLE IF NOT EXISTS todo (
//     "todoId"  INTEGER PRIMARY KEY,
//     "title" TEXT NOT NULL,
//     "description" TEXT NOT NULL);`)
//     .run(`INSERT INTO todo VALUES (null, "Breakfast", "Eat some delicious pancakes");`)
//     .run(`INSERT INTO todo VALUES (null, "Morning Tea", "Apples are ok, but warm muffins are better");`)
//     .run(`INSERT INTO todo VALUES (null, "Elevensies", "A little snack, maybe a pint of beer");`)
//     .run(`INSERT INTO todo VALUES(null, "Luncheon", "Delicious panini, oh, or nice salted pork");`)
//     .run(`INSERT INTO todo VALUES(null, "Afternoon Tea", "Tea and biscuits, or nice tasty roasted fish");`)
//     .run(`INSERT INTO todo VALUES(null, "Dinner", "Full course! Roasted potatoes, bacon, pork, warm fresh bread");`)
//     .run(`INSERT INTO todo VALUES(null, "Supper", "A little after dinner potatoes and tomatoes roasted with butter");`)
//     .run(`INSERT INTO todo VALUES(null, "Dessert", "Warm delicious cheesecake");`)
// })
class TodosController {


  getAllTodos(req, res) {
    const sqlString = `SELECT * FROM todo`
    db.all(sqlString, [], (err, rows) => {
      if (err) {
        console.log(err)
      }
      return res.status(200).send({
        todos: rows
      })
    })
  }

  getTodo(req, res) {
    const id = parseInt(req.params.id, 10);
    const sqlString = `SELECT todoId,
    title
  description
  FROM todo
  WHERE todoId = ${ id} `
    db.get(sqlString, (err, row) => {
      if (err) {
        return res.status(404).send({
          success: 'false',
          message: err,
        })
      }
      return res.status(200).send({
        todo: row
      })
    })
  }

  createTodo(req, res) {
    console.log(req.body)
    if (!req.body.title) {
      return res.status(400).send({
        success: 'false',
        message: 'title is required',
      });
    } else if (!req.body.description) {
      return res.status(400).send({
        success: 'false',
        message: 'description is required',
      });
    }
    const todo = {
      title: req.body.title,
      description: req.body.description,
    };
    const sqlString =
      `INSERT INTO todo ( title, description ) 
        VALUES ("${ req.body.title}", "${req.body.description}")`
    db.run(sqlString);
    return res.json({
      todo
    });
  }
  // come back to this one, need to get delete working first
  updateTodo(req, res) {
    const id = parseInt(req.params.id, 10);
    let todoFound;
    let itemIndex;
    db.map((todo, index) => {
      if (todo.id === id) {
        todoFound = todo;
        itemIndex = index;
      }
    });

    if (!todoFound) {
      return res.status(404).send({
        success: 'false',
        message: 'todo not found',
      });
    }

    if (!req.body.title) {
      return res.status(400).send({
        success: 'false',
        message: 'title is required',
      });
    } else if (!req.body.description) {
      return res.status(400).send({
        success: 'false',
        message: 'description is required',
      });
    }

    const newTodo = {
      id: todoFound.id,
      title: req.body.title || todoFound.title,
      description: req.body.description || todoFound.description,
    };

    db.splice(itemIndex, 1, newTodo);

    return res.status(201).send({
      success: 'true',
      message: 'todo added successfully',
      newTodo,
    });
  }

  deleteTodo(req, res) {
    const id = parseInt(req.params.id, 10);
    const sqlString = `DELETE FROM todo WHERE todoId = ${id} `
    db.run(sqlString, (err) => {
      if (err) {
        console.log(err)
      }
    })
    return res.status(200).send({
      success: 'true',
      message: 'Todo deleted successfuly',
    });
  }
}

const todoController = new TodosController();
export default todoController;