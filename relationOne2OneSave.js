/**
 * Created by lijianxun on 2017/1/3.
 */
const Parse = require('./parseInit').Parse;

let School = Parse.Object.extend('School');
let school = new School();
school.set("name","High School");
school.set("address", "北京");

//相当于：let Teacher = Parse.Object.extend('Teacher'); let teacher = new Teacher();
let teacher = new Parse.Object("Teacher");
teacher.set("name", "tom");
teacher.set("age", 10);
teacher.set("email", "tom@163.com");
teacher.set("workAt", school);

teacher
	.save()
	.then(
		(object) => {
			console.log("obj--", object.toJSON());
		},
		(err) => {
			console.log("err--", err);
		});

/*
如果这样写的话，他会在school表中增加一条school记录，如下:
 {
 "_id" : "FcDZEqAAMI",
 "name" : "High School",
 "address" : "北京",
 "_created_at" : ISODate("2017-01-03T15:03:12.085Z"),
 "_updated_at" : ISODate("2017-01-03T15:03:12.085Z")
 }
 并在teacher表中增加一条teacher记录， 如下
 {
 "_id" : "F2kVGLEb2M",
 "name" : "tom",
 "age" : 10,
 "email" : "tom@163.com",
 "_p_workAt" : "School$FcDZEqAAMI",
 "_created_at" : ISODate("2017-01-03T15:03:12.109Z"),
 "_updated_at" : ISODate("2017-01-03T15:03:12.109Z")
 }
 其中_p_workAt为关联字段，关联school表

 */