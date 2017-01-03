/**
 * Created by lijianxun on 2017/1/3.
 */
const Parse = require('./parseInit').Parse;

let Like = Parse.Object.extend('Like');
let football = new Like();
football.set("price",50);
let basketball = new Like();
basketball.set("price",100);

let teacher = new Parse.Object("Teacher");
teacher.set("name", "tom");
teacher.set("age", 10);
teacher.set("email", "tom@163.com");
let relation = new Parse.Relation(teacher,'likes');
relation.add(football);
relation.add(basketball);
//首先此段代码是跑不通的，必须先添加teacher才能添加relation关联
teacher
	.save()
	.then(
		(object) => {
			console.log("obj--", object.toJSON());
		},
		(err) => {
			console.log("err--", err);
		});

