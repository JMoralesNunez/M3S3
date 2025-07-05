const API_URL = "http://localhost:3000/users"


const dataTable = document.getElementById("dataTable");

//Show
async function loadTable() {
    try {
        const res = await fetch(API_URL);
        const users = await res.json();
        users.map((item)=>{
            const tableRow = document.createElement("tr")
            const tableData = `
            <td>${item.id}</td>
            <td>${item.names}</td>
            <td>${item.email}</td>
            <td>${item.rol}</td>
            <td>${item.phone}</td>
            <td>${item.address}</td>
            <td>${item.activo}</td>
            <td>${item.age}</td>
            <td>
                <div class="d-flex g-2">
                    <button class="btn btn-warning" onclick="userModal('${item.id}')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                            <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
                        </svg>
                    </button>
                    <button class="btn btn-danger" type="button" onclick="deleteUser('${item.id}')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                        </svg>
                    </button>
                </div>
            </td>`

            tableRow.innerHTML = tableData

            dataTable.append(tableRow)
        })
    } catch (error) {
        console.log(error);
    }
}


//Add
async function addUSer(event) {
    event.preventDefault()
    const name = document.getElementById("inputName").value;
    const email = document.getElementById("inputEmail").value;
    const address = document.getElementById("inputAddress").value;
    const phone = document.getElementById("inputPhone").value;
    const rol = document.getElementById("inputRol").value;
    const state = document.getElementById("inputState").value;
    const age = document.getElementById("inputAge").value;
    try {
        const res = await fetch(API_URL, {
            "method": "POST",
            "headers" : {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify({
                "names" : `${name}`,
                "email" : `${email}`,
                "rol" : `${rol}`,
                "phone" : `${phone}`,
                "address" : `${address}`,
                "activo" : `${state}`,
                "age" : `${age}`
            })
        });
        await res.json();
        await loadTable()
    } catch (error) {
        console.log(error);
    }
    
}
document.getElementById("addUser").addEventListener("click", addUSer)

//Delete

async function deleteUser(id) {
    try {
        await fetch(API_URL+`/${id}`,{
            "method" : "DELETE"
        });
    } catch (error) {
        console.log(error)
    }
    
}

//show edit modal
let currentEditUserId = NaN;

async function userModal(id) {
    const editModal = document.getElementById("editUserDialog");
    editModal.showModal();
    currentEditUserId = id
    try {
        const res = await fetch(API_URL+`/${id}`);
        const user = await res.json();

        document.getElementById("editName").value = user.names;
        document.getElementById("editEmail").value = user.email;
        document.getElementById("editAddress").value = user.address;
        document.getElementById("editPhone").value = user.phone;
        document.getElementById("editRol").value = user.rol;
        document.getElementById("editState").value = user.activo;
        document.getElementById("editAge").value = user.age;
    } catch (error) {
        console.log(error);
    }
    };

//Edit

async function editUser() {

    const name = document.getElementById("editName").value;
    const email = document.getElementById("editEmail").value;
    const address = document.getElementById("editAddress").value;
    const phone = document.getElementById("editPhone").value;
    const rol = document.getElementById("editRol").value;
    const state = document.getElementById("editState").value;
    const age = document.getElementById("editAge").value;

    try {
        await fetch(`${API_URL}/${currentEditUserId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "names": name,
                "email": email,
                "rol": rol,
                "phone": phone,
                "address": address,
                "activo": state,
                "age": age
            })
        });

        document.getElementById("editUserDialog").close(); 
        await loadTable(); 
    } catch (error) {
        console.error("Error actualizando usuario:", error);
    }
}



loadTable()


