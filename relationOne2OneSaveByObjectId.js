/**
 * Created by lijianxun on 2017/1/3.
 */
const Parse = require('./parseInit').Parse;

let School = Parse.Object.extend('School');
let school = new School();
//如果关联已有的school表可以直接这样关联
school.id="FcDZEqAAMI";

let teacher = new Parse.Object("Teacher");
teacher.set("name", "tom1");
teacher.set("age", 11);
teacher.set("email", "tom1@163.com");
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
以上输出为：
 { name: 'tom1',
 age: 11,
 email: 'tom1@163.com',
 workAt:
 { __type: 'Pointer',
 className: 'School',
 objectId: 'FcDZEqAAMI' },
 createdAt: '2017-01-03T15:13:17.752Z',
 updatedAt: '2017-01-03T15:13:17.752Z',
 objectId: 'F4kaL6oD1c' }
如果这样写的话，他不会在school表中增加一条school记录，而是直接与ObjectId为FcDZEqAAMI的school关联，
可以看出关联的type为Pointer。

 在teacher表中会增加一条teacher记录， 如下
 {
 "_id" : "F2kVGLEb2M",
 "name" : "tom",
 "age" : 10,
 "email" : "tom@163.com",
 "_p_workAt" : "School$FcDZEqAAMI",
 "_created_at" : ISODate("2017-01-03T15:03:12.109Z"),
 "_updated_at" : ISODate("2017-01-03T15:03:12.109Z")
 }
 其中_p_workAt为关联字段，关联school表，和relationSave.js创建的school记录的格式一样

 */