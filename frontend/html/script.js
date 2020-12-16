let formElem = document.getElementById("formElem");
let deleteBtn = document.getElementById("delete");
let refreshBtn = document.getElementById("refresh");


const removeChilds = (parent) => {
    while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
    }
};

const addNotification = (text) => {
    let repl = document.getElementById("resposne");
    removeChilds(repl);
    repl.appendChild(document.createTextNode(text));
};

async function update_user_list(){
    let user_list = document.getElementById("users");
    let get_res = await fetch('/api/getall');
    let result = await get_res.json();
    result_list = result.message.split(',');
    removeChilds(user_list);
    result_list.forEach(elem => {
        let p = document.createElement('p');
        p.appendChild(document.createTextNode(elem));
        user_list.appendChild(p);
    });
}

formElem.onsubmit = async (e) => {
    e.preventDefault();

    let response = await fetch('/api/addUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({[formElem.elements.name.name]: formElem.elements.name.value})
    });
  
    let result = await response.json();
    addNotification(result.message);
    update_user_list();
};

deleteBtn.onclick = async (e) => {
    let resposne = await fetch('/api/deleteAll', {
        method: 'PUT'
    });
    let result = await resposne.json();
    addNotification(result.message);
    update_user_list();
};

refreshBtn.onclick = async (e) => {
    addNotification('List refreshed');
    update_user_list();
};







