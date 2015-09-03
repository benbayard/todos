var r = require('rethinkdb');

var connection = null;

function getAllTodos(connection) {
  r.table('todos').run(connection,function(err, cursor) {
    cursor.toArray(function(err, result) {
      console.log(result.map(function(todo) {return todo.text}));
    });
  });
};

r.connect( {host: 'localhost', port: 28015}, function(err, conn) {
    if (err) throw err;
    connection = conn;
    r.db('test')
    .table('todos')
    .run(connection, function(err, result) {
      if (err) throw err;
      r.table('todos').count().run(connection, function(err, result) {
        if (result === 0) {
          r.table('todos').insert([
            { text: 'This is my First Todo' },
            { text: 'This is my Second Todo' }
          ]).run(connection, function(err, result) {
            console.log('Values did not exist')
            getAllTodos(connection);
          })
        } else {
          console.log('values did exist');
          getAllTodos(connection);
        }
      });
  });
});
