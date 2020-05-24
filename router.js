const express = require('express');
const Student = require('./studentsAPI');

const router = express.Router();

router.get('/students', (req, res) => {

  // //uf8的作用是把从文件中读取出来的二进制字符串转换为我们可以认识的字符串。从文件中读取出来的内容默认为二进制字符串
  // fs.readFile('./db.json', 'utf8', (err, data) => {
  //   if(err) {
  //     res.status(500).send('Server Error');
  //   } else {
  //     res.render('index.html', {   //默认从views文件夹下找index.html  不能写./views/index.html
  //       students: JSON.parse(data).students
  //     });
  //   }
  // });

  Student.find((err, students) => {
    if(err) {
      res.status(500).send('Server Error');
    } else {
      res.render('index.html', {   //默认从views文件夹下找index.html  不能写./views/index.html
        students: students
      });
    }
  })
});

router.get('/students/new', (req, res) => {
  res.render('addStudents.html');
});

router.post('/students/new', (req, res) => {
  console.log(req.body);
  Student.save(req.body, (err) => {
    if(err) {
      res.status(500).send('Server Error');
    } else {
      res.redirect('/students');
    }
  })
});

router.get('/students/edit', (req, res) => {
  Student.findById((parseInt(req.query.id)), (err, student) => {
    if(err) {
      res.status(500).send('Server Error');
    } else {
      res.render('editStudent.html', {
        student: student
      })
    }
  })
});

router.post('/students/edit', (req, res) => {
  Student.edit(req.body, (err) => {
    if(err) {
      res.status(500).send('Server Error');
    } else {
      res.redirect('/students');
    }
  })
});

router.get('/students/delete', (req, res) => {
  Student.deleteById(parseInt(req.query.id), (err) => {
    if(err) {
      res.status(500).send('Server Error');
    } else {
      res.redirect('/students');
    }
  });
})



module.exports = router;