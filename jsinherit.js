
var Character = function (option) {
    var _name = '';
    var _health = 0;
    var _exp = 0;
    
    this.setName = function (name) {
        if (true) { //валидация
            _name = name;
        }
    }
    this.addExp = function (exp = 0) {
        if (exp >= 0) {
            _exp += exp;
        }
    }
    this.setHealth = function (health = 0) {
        if (true) {//валидация
            _health = health;
        }
    }
    this.getHealth = function(){
        return _health;
    }

    this.toString = function () {
        return '' + 
            '\n\tname: ' + _name + 
            '\n\thelth: ' + _health + 
            '\n\texp: ' + _exp;
    }
    this.setName(option.name);
    this.setHealth(option.health);
    this.addExp(option.exp);
}

var bot = new Character({ name: 'Bot', health: 100, exp: 100 });
console.log(bot.toString());
console.dir(bot);

var CharacterConfig = {
    MAX_AGE:150,
    MAX_LVL:100,
    MAX_HEALTH:15000
}
CharacterConfig = Object.freeze(CharacterConfig);

var Human = function(option) {
    Character.apply(this, arguments); //унаследование полей
    var _age = 0;
    this.setAge = function(age = 0){
        if(age <= CharacterConfig.MAX_AGE && age >= 0){
            _age = age;
        }
    }
    this.getAge = function(){
        return _age;
    }
    Human.prototype = Object.create(Character.prototype); //унаследование методов
}
var tom = new Human({ age:50, name: 'Tom', health: 500, exp: 5050 });
console.log(tom.toString());
tom.setAge(70);
console.log(tom.getAge());
console.log(tom.getHealth());