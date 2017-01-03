/**
 * Created by lijianxun on 2017/1/3.
 */
const Parse = require('./parseInit').Parse;

let Person = Parse.Object.extend('Person');

let person = new Person();

person.set("name", "tom");
person.set("age", 10);
person.set("email", "tom@163.com");

person
	.save()
	.then(
		(object) => {
			console.log("obj--", object.toJSON());
		},
		(err) => {
			console.log("err--", err);
		});