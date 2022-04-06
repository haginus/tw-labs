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
async function getData() {
  try {
    const user = await getUser();
    const subject = await getSchoolSubject(user.favoriteSchoolSubjectId);
    const teacher = await getTeacher(subject.teacherId);
    console.log(teacher.name);
  } catch(err) {
    handleError(err);
  }
}

getData();

