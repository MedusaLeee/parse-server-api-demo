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

football
	.save()
	.then(()=>{
		return basketball.save();
	})
	.then(()=>{
		return teacher.save();
	})
	.then((object) => {
		console.log("obj-1-", object.toJSON());
		//let relation = new Parse.Relation(teacher,'likes');
		let relation = object.relation("likes");
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

/*
底层实现：
多对多其实就是他另外创建了一个关联表，类似mysql中多对多的实现
表明：_Join:likes:Teacher
 {
 "_id" : ObjectId("586bc7e9c090d4377091a468"),
 "owningId" : "5lLsSllCu3",
 "relatedId" : "ZJPVW3t1Oq"
 }

{
	"_id" : ObjectId("586bc7e9c090d4377091a469"),
	"owningId" : "5lLsSllCu3",
	"relatedId" : "jOoZH2MoFk"
}
以上两个的owningId一样，说明是一个teacher关联的两个like
 */

/*
以下这种写法是错误的(You cannot add or remove an unsaved Parse Object from a relation)，
parse不允许未被创建的记录被关联，这和one2one不一样，one2one中如果被关联的不存在会被创建，many2many确不行
teacher
	.save()
	.then((object) => {
		console.log("obj-1-", object.toJSON());
		//let relation = new Parse.Relation(teacher,'likes');
		let relation = object.relation("likes");
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
		});*/

