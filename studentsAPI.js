const dbPath = './db.json';
const fs = require('fs');

let writeToFile = (Path, fileData, callback) => {
  fs.writeFile(Path, fileData, (err) => {
    if(err) {
      callback(err);
    } else {
      callback(null);
    }
  });
};

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
      writeToFile(dbPath, fileData, callback);
      // fs.writeFile(dbPath, fileData, (err) => {
      //   if(err) {
      //     callback(err);
      //   } else {
      //     callback(null);
      //   }
      // })
    }
  })
};

exports.edit = (student, callback) => {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if(err) {
      callback(err);
    } else {
      let students = JSON.parse(data).students;
      let targetStudent = students.find((item) => {
        return item.id === parseInt(student.id);  //传进来的是字符串
      })
      for(let key in student) {
        targetStudent[key] = student[key];
      }
      let fileData = JSON.stringify({ students: students });
      writeToFile(dbPath, fileData, callback);
      // fs.writeFile(dbPath, fileData, (err) => {
      //   if(err) {
      //     callback(err);
      //   } else {
      //     callback(null);
      //   }
      // })
    }
  })
};

exports.deleteById = (id, callback) => {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if(err) {
      callback(err);
    } else {
      let students = JSON.parse(data).students;
      let targetId = students.findIndex((item) => {
        return item.id === id;
      });
      students.splice(targetId, 1);
      let fileData = JSON.stringify({ students: students });
      writeToFile(dbPath, fileData, callback);
      // fs.writeFile(dbPath, fileData, (err) => {
      //   if(err) {
      //     callback(err);
      //   } else {
      //     callback(null);
      //   }
      // })
    }
  })
}
