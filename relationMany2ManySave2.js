/**
 * Created by lijianxun on 2017/1/3.
 * 对relationMany2ManySave的深入测试，其他写法
 */
const Parse = require('./parseInit').Parse;

let Like = Parse.Object.extend('Like');
let football = new Like();
football.id="ZJPVW3t1Oq";
let basketball = new Like();
basketball.id="jOoZH2MoFk";

let teacher = new Parse.Object("Teacher");
teacher.set("name", "tom22");
teacher.set("age", 18);
teacher.set("email", "tom22@163.com");

teacher
	.save()
	.then((object) => {
		console.log("obj-1-", object.toJSON());
		let relation = new Parse.Relation(object,'likes');
		//let relation = object.relation("likes");等同于上面的
		relation.add(football);
		relation.add(basketball);
		return object.save()
	})
	.then(
		(object) => {
			console.log("obj-2-", object.toJSON());
		},
		(err) => {
			console.log("err--", err);
		});
/*
对以上的解释：
被关联的和要添加关联的对象，必须得是已经存在数据库中的记录，不会自动被创建和one2one不一样
 */
