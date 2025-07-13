let currentScreen = 0;
let currentClient = null;

function searchClientById(clientID) {
    for (let i = 0; i < clients.length; i++) {
        if (clients[i].id === clientID) {
            console.log(i + 1);
            return i;
        }
    }
}

window.searchClientById = searchClientById;

function searchSavingBankByClientID(clientID) {
    const client = clients.find(c => c.id === clientID);
    return client ? client.savingsBanks : null;
}

function searchDebitCardsByClientID(clientID) {
    const client = clients.find(c => c.id === clientID);
    if (!client) return null;

    let allCards = [];
    for (let sb of client.savingsBanks) {
        allCards.push(...sb.debitCards);
    }
    return allCards;
}

function searchDebitCardsByCardID(debitCardID) {
    for (let client of clients) {
        for (let sb of client.savingsBanks) {
            for (let card of sb.debitCards) {
                if (card.id === debitCardID) {
                    console.log("la tarjeta:", card, "es de", client);
                    return client;
                }
            }
        }
    }
}

function searchCreditCardsByClientID(clientID) {
    const client = clients.find(c => c.id === clientID);
    return client ? client.creditCards : null;
}

function searchCreditCardsByCardID(creditCardID) {
    for (let client of clients) {
        for (let card of client.creditCards) {
            if (card.id === creditCardID) {
                return card;
            }
        }
    }
}

function searchMovementsBySavingBankID(savingBankID) {
    const bank = savingBanks.find(sb => sb.id === savingBankID);
    return bank ? bank.movements : null;
}

function searchMovementsByDebitCardID(debitCardID) {
    for (let client of clients) {
        for (let sb of client.savingsBanks) {
            for (let card of sb.debitCards) {
                if (card.id === debitCardID) {
                    return card.movements || [];
                }
            }
        }
    }
    return [];
}

function searchMovementsByCreditCardID(creditCardID) {
    const card = creditCards.find(cc => cc.id === creditCardID);
    return card ? card.consumptions : null;
}

function moneyTransfer(amount, idOrigin, idDestination) {
    if (!amount || !idOrigin || !idDestination) {
        console.log("Faltan datos para la transferencia");
        return false;
    }

    const originAccount = savingBanks.find(sb => sb.id === idOrigin);
    const destinationAccount = savingBanks.find(sb => sb.id === idDestination);

    if (!originAccount || !destinationAccount) {
        console.log("Cuenta origen o destino no encontrada");
        return false;
    }

    originAccount.withdrawMoneyFromAccount(amount);
    destinationAccount.depositMoneyIntoSavingBank(amount);
    return true;
}

function changeScreen() {
    let paginaUsuario = ui.getpaginaUsuario();
    let inicioSesionUsuario = ui.getinicioSesionUsuario();
    let menuHamburguesa = document.getElementById("menuHamburguesa");

    if (!paginaUsuario || !inicioSesionUsuario || !menuHamburguesa) {
        console.error("No se encontraron elementos necesarios para cambiar de pantalla");
        return;
    }

    if (currentScreen === 0) {
        paginaUsuario.style.display = "none";
        inicioSesionUsuario.style.display = "block";
        menuHamburguesa.style.display = "none";
    } if (currentScreen === 1) {
        formularios.style.display = "none";
        paginaUsuario.style.display = "block";
        menuHamburguesa.style.display = "block";
    }
}



// 24)
function login() {
    let dni = ui.getDNI();
    let password = ui.getPassword();

    const client = clients.find(c => c.dni === dni && c.password === password);

    if (client) {
        alert("Has ingresado correctamente");
        currentScreen = 1;
        currentClient = client;
        changeScreen();
        ui.selectPaymentMethods();
        ui.showAccountsOrigin();
        ui.showAccountsDestiny();
        ui.showDollarAccounts();
        ui.showPesosAccounts();
        ui.showDebitCardInfo();
        ui.showCreditCards();
        ui.selectCreditCards();
        ui.selectSavingsBank();
        ui.investmentAccountSelect();
        ui.showAccounts();

    } else {
        alert("Ha ocurrido un error. Verifique que los datos estén correctamente ingresados");
    }
}


window.addEventListener("DOMContentLoaded", () => {
    changeScreen();

    const loginForm = document.getElementById("loginForm");
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        login();
    });
});

//25) 
function registrarse() {
    let dni = ui.getRegisterDNI();
    let name = ui.getRegisterName();
    let email = ui.getRegisterEmail();
    let lastName = ui.getRegisterLastName();
    let password = ui.getRegisterPassword();

    if (dni && name && email && lastName && password) {
        new Client(dni, password, name, lastName, email)
        alert("Te has registrado correctamente!");

        currentScreen = 1;
        changeScreen();
        ui.selectPaymentMethods();
        ui.showAccountsOrigin();
        ui.showAccountsDestiny();
        ui.showDollarAccounts();
        ui.showPesosAccounts();
        ui.showDebitCardInfo();
        ui.showCreditCards();
        ui.selectCreditCards();
        ui.selectSavingsBank();
        ui.investmentAccountSelect();
        ui.showAccounts();


    } else {
        alert("Por favor, complete todos los campos");
    }
}

document.getElementById("registerForm").addEventListener("submit", function (e) {
    e.preventDefault();
    registrarse();
});

// 26)
function logout() {
    currentScreen = 0;
    changeScreen();
    ui.clearLoginForm();
    ui.clearRegisterForm();
    const offcanvas = bootstrap.Offcanvas.getInstance(document.getElementById("offcanvasMenu"));
    if (offcanvas) {
        offcanvas.hide();
    }
}

function verMovimientos(accountId) {
    const movements = searchMovementsBySavingBankID(accountId);
    const modalTitle = document.getElementById("modalTitle");
    const modalBody = document.getElementById("modalBody");

    modalTitle.textContent = "Movimientos de la cuenta";
    modalBody.innerHTML = "";

    if (!movements || movements.length === 0) {
        modalBody.innerHTML = "<p>No hay movimientos para esta cuenta.</p>";
    } else {
        movements.forEach(mov => {
            modalBody.innerHTML += `
                <div class="mb-2">
                    <p><strong>Nombre del tercero:</strong> ${mov.thirdPartyName}</p>
                    <p><strong>Monto:</strong> ${mov.amount}</p>
                    <p><strong>Cuotas:</strong> ${mov.coutes}</p>
                    <hr>
                </div>
            `;
        });
    }

    const modal = new bootstrap.Modal(document.getElementById("modal"));
    modal.show();
}



window.searchSavingBankByClientID = searchSavingBankByClientID;
window.searchDebitCardsByClientID = searchDebitCardsByClientID;
window.searchDebitCardsByCardID = searchDebitCardsByCardID;
window.searchCreditCardsByClientID = searchCreditCardsByClientID;
window.searchCreditCardsByCardID = searchCreditCardsByCardID;
window.searchMovementsBySavingBankID = searchMovementsBySavingBankID;
window.searchMovementsByDebitCardID = searchMovementsByDebitCardID;
window.searchMovementsByCreditCardID = searchMovementsByCreditCardID;
window.moneyTransfer = moneyTransfer;
window.changeScreen = changeScreen;
window.login = login;
window.registrarse = registrarse;
window.logout = logout;
