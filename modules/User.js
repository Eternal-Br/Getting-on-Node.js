function User(id, name, age){
    this.id = id;
    this.name = name;
    this.age = age;
    this.comeon = function(res){
        res.write(this.name + '来上课了');
    }
    this.enter = function(){
        console.log(this.name + "进入图书馆");
    }
}
module.exports = User;