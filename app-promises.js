const users = [{
  id:1,
  name:'Deepak',
  schoolId:101
},
  {
    id:2,
    name:'Abhishek',
    schoolId:999
  }
];


const grades = [{
  id: 1,
  schoolId: 101,
  grade: 86
}, {
  id: 2,
  schoolId: 999,
  grade: 100
}, {
  id: 3,
  schoolId: 101,
  grade: 80
}];

const getUser = (id)=>{
  return  new Promise((resolve,reject)=>{
    var user =  users.find((user)=>user.id ===id )

    if (user) {
      resolve(user);
    }else{
      reject('Error occured');
    }

  })
}

const getGrades = (schoolId) => {
  return new Promise((resolve,reject) => {
    resolve(grades.filter((grade) => grade.schoolId === schoolId ))
    })
}

const getStatus = ((id)=>{
    let user;
    return getUser(id).then((tempuser)=>{
      user = tempuser;
      return getGrades(user.schoolId);
    }).then((grades)=>{
      let average = 0;
      if (grades.length>0) {
        average = grades.map((grade)=>grade.grade).reduce((a,b) => a+b )/grades.length;
      }
      return `${user.name} has ${average}% in the class `
    })

  })


const getStatusAlt = async (userId)=>{

  const user = await getUser(userId);
  const grades = await getGrades(user.schoolId);

  let average = 0;
  if (grades.length>0) {
    average = grades.map((grade)=>grade.grade).reduce((a,b) => a+b )/grades.length;
  }
  return `${user.name} has ${average}% in the class` 
}

getStatusAlt(1).then((result)=>{
  console.log(result);
}).catch((err)=>[
  console.error(err)
])


// getUser(1).then((result)=>{
//   console.log(result);
// },(error)=>{
//   console.log(error);
// })
//
//
// getGrades(101).then((result)=>{
//   console.log(result);
// },(err)=>{
//   console.error(err);
// })
//
//
// getStatus(1).then((result)=>{
//   console.log(result);
// },(err)=>{
//   console.error(err);
// })
