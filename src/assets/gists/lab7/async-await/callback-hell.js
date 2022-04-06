function getUser() {
  return Promise.resolve({
    firstName: "John",
    lastName: "Doe",
    favoriteSchoolSubjectId: 3
  });
}

function getSchoolSubject(id) {
  return Promise.resolve({
    id: id,
    name: "Tehnici web",
    teacherId: 2
  });
}

function getTeacher(id) {
  return Promise.resolve({
    name: "D. Popa"
  });
}

function handleError(err) {
  // pass
}

// Obținerea datelor
getUser()
  .then(user => {
    getSchoolSubject(user.favoriteSchoolSubjectId)
      .then(subject => {
        getTeacher(subject.teacherId)
          .then(teacher => {
            console.log(teacher.name);
          })
          .catch(handleError);
      })
      .catch(handleError);
  })
  .catch(handleError);