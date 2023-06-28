const person = {
    id: 2,
    gender: 'mail'
  };
  
  const student = {
    name: "ravi",
    email: "ravi11@yopmail.com"
  };
  
  const combinedObject = {
    ...person,
    ...student
  };
  combinedObject.email = "Naveen.run17@gmail.com"
  combinedObject.name = "Sunkara Venkata Naveen"
  combinedObject.gender = "Male"
  combinedObject.id = 1
  console.log(combinedObject);
  