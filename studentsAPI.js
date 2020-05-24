const dbPath = './db.json';
const fs = require('fs');

exports.find = (callback) => {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if(err) {
      callback(err);
    } else {
      callback(null, JSON.parse(data).students);
    }
  })
};

exports.findById = (id, callback) => {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if(err) {
      callback(err);
    } else {
      let students = JSON.parse(data).students;
      let targetStudent = students.find((item) => {
        return item.id === id;
      })
      callback(null, targetStudent);
    }
  })
}

exports.save = (student, callback) => {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if(err) {
      callback(err);
    } else {
      let students = JSON.parse(data).students;
      student.id = students[students.length - 1].id + 1;
      students.push(student);
      let fileData = JSON.stringify({students: students});
      fs.writeFile(dbPath, fileData, (err) => {
        if(err) {
          callback(err);
        } else {
          callback(null);
        }
      })
    }
  })
};

exports.edit = (student, callback) => {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if(err) {
      callback(err);
    } else {
      var students = JSON.parse(data).students;
      var targetStudent = students.find((item) => {
        return item.id === parseInt(student.id);  //传进来的是字符串
      })
      for(var key in student) {
        targetStudent[key] = student[key];
      }
      var fileData = JSON.stringify({ students: students });
      fs.writeFile(dbPath, fileData, (err) => {
        if(err) {
          callback(err);
        } else {
          callback(null);
        }
      })
    }
  })
}
