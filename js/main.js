// Тех. задание
// Общее описание проекта: Проект представляет из себя имитацию соц. сети с возможностью регистрации, авторизации и отправки сообщений другим пользователям

// Детальное описание проекта: Весь проект можно разделить на 2 большие подзадачи:

let users = [
    {
        name: 'Jil', //имя пользователя
        password: 'jil123', //пароль от аккаунта
        age: '35', //возраст пользователя
        isLogin: false, //авторизован/неавторизован
        getMessages: [], //полученные сообщения(которые будут отправлять пользователю)
        sendMessages: [] //отправленные сообщения(которые будет отправлять сам пользователь)
    },
    {
        name: 'Musi', 
        password: 'musi123', 
        age: '17', 
        isLogin: false, 
        getMessages: [], 
        sendMessages: [] 
    },
    {
        name: 'Jan', 
        password: 'jan123', 
        age: '15', 
        isLogin: false, 
        getMessages: [], 
        sendMessages: [] 
    },
    {
        name: 'Elmar', 
        password: 'elmar123', 
        age: '20', 
        isLogin: false, 
        getMessages: [], 
        sendMessages: []
    }
]

// 1. Логика регистрации и авторизации
// Детальное описание подзадачи: Пользователь должен иметь возможность регистрироваться на сайте(имя пользователя всегда должно быть уникальным), также должна быть возможность авторизоваться на сайте(все последующие операции возможны только если пользователь авторизован), должна быть возможность удалить свой профиль, для этого пользователь должен быть авторизован и при удалении необходимо запросить пароль для подтверждения, после подтверждения аккаунт нужно удалить

// Примерный вид объекта пользователя(ваш вариант может отличаться):
// {
// name: '', //имя пользователя
// password: '', //пароль от аккаунта
// age: '', //возраст пользователя
// isLogin: false, //авторизован/неавторизован
// getMessages: [], //полученные сообщения(которые будут отправлять пользователю)
// sendMessages: [] //отправленные сообщения(которые будет отправлять сам пользователь)
// }

//  7 keep user login
let inSystem = '';
function changeInSystemUser(userName = '') {
    inSystem = userName;
    let h3 = document.querySelector('h3');
    inSystem ? h3.innerText = `User: ${userName} in system` : h3.innerText = 'No user in system';
}

// step 2 check username in system
function checkUserName(newUserName) {
    return users.some(item =>item.name === newUserName)
}
// step 3 check passowrd 
function checkPassword(password, confirmPassword) {
    return password === confirmPassword;
}

// 1 step registration 
function newUser() {
    let newUserName = prompt('Enter user name')
    if(checkUserName(newUserName)) {
    alert('user already exists!');
    return;
    }
    let password = prompt('Enter the password');
    let confirmPassword = prompt('Re-enter the password')
    if(!checkPassword(password,confirmPassword)) {
        alert('Passwords are not matching');
        return
    }
    let age = prompt('Enter your age')
    let userObj= {
        name: newUserName,
        password: password,
        age: age,
        isLogin: false,
        getMessages: [], 
        sendMessages: []
    }
    users.push(userObj)
    console.log(users);
}

// 5 find user name 
function getUserObj(userName) {
    return users.find(item => item.name === userName)
}

// 6 check existing user password 
function checkUserPassword(userName, pass) {
    let user = getUserObj(userName);
    return user.password === pass;
}
// 4 login
function loginUser() {
    let userName = prompt('Enter User name');
    if (!checkUserName(userName)) {
        alert('User Not Found');
        return;
    }
    let pass = prompt('Enter the password')
    if(!checkUserPassword(userName, pass)) {
        alert('Password do not match');
        return;
    }
    let user = getUserObj(userName);
    user.isLogin = true;
    changeInSystemUser(userName);
    console.log(users);

};

// 8 logout
function logoutUser() {
    if(!inSystem){
        alert('Only authorized user can log out');
        return;
    }
    let user = getUserObj(inSystem);
    user.isLogin = false;
    changeInSystemUser();
}


//  9 delete user
// 2. Removing an object from an array:
// let myArray = [
//   {name: 'John', age: 30},
//   {name: 'Jane', age: 28}
// ];
// // Find the index of the object you want to remove
// let indexToRemove = myArray.findIndex(obj => obj.name === 'Jane');
// // Remove the object using the splice method
// if (indexToRemove .== -1) {
//   myArray.splice(indexToRemove, 1);
// }
// console.log(myArray); // Output: [{name: 'John', age: 30}]

function deleteUser() {
    if(!inSystem){
        alert('Only authorized user can log out');
        return;
    }
    let user = getUserObj(inSystem);
    let pass = prompt('Enter the password ')
    let indexToRemove = users.findIndex(item => item.name === user.name );
    if(indexToRemove !== -1)  {
        if (user.password !== pass) {
        alert('Password is incorrect');
        return
        }
        users.splice(indexToRemove, 1)
    }
    console.log(users)
    changeInSystemUser();
}

// 2. Логика отправки/удаления сообщений
// Детальное описание подзадачи: Каждый юзер должен иметь возможность отправлять сообщения, у каждого пользователя есть 2 ключа, в одном хранятся сообщения, которые отправил пользователь, в другом, сообщения, которые отправили пользователю, для отправки сообщения юзер должен быть авторизован

// Cам объект сообщений может выглядеть след. образом(ваш вариант может отличаться):
// {
// id: Number, //уникальный номер сообщения
// content: '', //содержимое сообщения
// from: User 1 //пользователь, который отправил сообщение
// }
// Когда пользователь 1 отправляет сообщение пользователю 2, необходимо ззапросить имя того пользователя, которому нужно отправить сообщение, у первого сообщение сохраняется в отправленных, а у второго в принятых, сообщения можно удалять, их может удалить либо пользователь которому отправили сообщения, либо тот кто отправил сообщение

function sendMessages() {
    if(!inSystem){
        alert('Only authorized user can create post');
        return;
    };
    let user = getUserObj(inSystem)
    let toUser = prompt('Enter user to who to send')
    let indexToAdd = users.findIndex(item => item.name === toUser)
    let postTitle = prompt('Enter the text');
    let msgObj = {
        id: Date.now(), //уникальный номер сообщения
        content: '', //содержимое сообщения
        to: toUser//пользователь, который отправил сообщение
    }
    user[sendMessages].push(msgObj);
    };
   
    
// После завершения таска отправить код в гитхаб и в классрум прикрепить ссылку на репозиторий

// Будет плюсом:
// Добавить минимальный интерфейс(кнопки в HTML и вывод юзернейма авторизованного пользователя), подключить github Pages, ссылку также прикрепить в гитхаб