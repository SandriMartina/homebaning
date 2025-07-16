let clientsId = 1;

class Client {
    constructor(dni, password, name, lastName, email) {
        this.id = clientsId;
        clientsId++;
        this.dni = dni;
        this.email=email;
        this.password = password;
        this.name = name;
        this.lastName = lastName;
        this.creditCards = [];
        this.savingsBanks = [];
    }

    // 20)
    buyingSellingDolars(amountInPesos, idOrigin, idDestination) {
        const DOLLAR_QUOTE = 1100;
        if (!amountInPesos || !idOrigin || !idDestination) {
            console.log("Datos inválidos para la operación de compra/venta de dólares");
            return false;
        }

        const originAccount = this.savingsBanks.find(sb => sb.id === idOrigin);
        const destinationAccount = this.savingsBanks.find(sb => sb.id === idDestination && sb.currency === "USD");

        if (!originAccount || !destinationAccount) {
            console.log("Cuenta origen o destino no encontrada o no válida");
            return false;
        }

        originAccount.withdrawMoneyFromAccount(amountInPesos);
        const dollars = amountInPesos / DOLLAR_QUOTE;
        destinationAccount.depositMoneyIntoSavingBank(dollars);
        return true;
    }
}

const clients = [
    new Client("12345678", "clave123", "Juan", "Pérez"),
    new Client("87654321", "pass456", "Ana", "García"),
    new Client("11223344", "abc789", "Carlos", "López"),
    new Client("44332211", "segura321", "Laura", "Martínez"),
    new Client("55667788", "hola1234", "María", "Gómez")
];

const cuenta1 = new SavingsBank("ARS", "juan.cuenta.ars", 100000);
cuenta1.balance = 120000;
cuenta1.limit = 5000;
cuenta1.overdraft = 2000;
savingBanks.push(cuenta1)

const cuenta2 = new SavingsBank("USD", "juan.cuenta.usd", 0);
cuenta2.balance = 200;

const cuenta3 = new SavingsBank("ARS", "ana.cuenta.pesos", 150000);
cuenta3.balance = 80000;
cuenta3.limit = 10000;


clients[0].savingsBanks.push(cuenta1, cuenta2); 
clients[1].savingsBanks.push(cuenta3); 

const tarjeta1 = new DebitCard("Visa", "2023-02-10", "111", "Visa Débito Juan");
const tarjeta2 = new DebitCard("MasterCard", "2023-03-01", "222", "Master Débito Juan");

cuenta1.debitCards.push(tarjeta1);
cuenta2.debitCards.push(tarjeta2); 
const tarjetaAna = new DebitCard("Maestro", "2022-05-15", "333", "Débito Ana");
cuenta3.debitCards.push(tarjetaAna);

const cuenta4 = new SavingsBank("USD", "carlos.ahorro.dolares", 0);
cuenta4.balance = 500;

const tarjetaCarlos = new DebitCard("Naranja", "2023-06-10", "444", "Débito Carlos");
cuenta4.debitCards.push(tarjetaCarlos);

clients[2].savingsBanks.push(cuenta4);
savingBanks.push(cuenta4);

const cuenta5 = new SavingsBank("ARS", "laura.cuenta.pesos", 80000);
cuenta5.balance = 60000;
cuenta5.limit = 20000;
cuenta5.overdraft = 5000;

const tarjetaLaura = new DebitCard("Cabal", "2022-08-20", "555", "Débito Laura");
cuenta5.debitCards.push(tarjetaLaura);

clients[3].savingsBanks.push(cuenta5);
savingBanks.push(cuenta5);

const cuenta6 = new SavingsBank("USD", "maria.savings.usd", 0);
cuenta6.balance = 1000;

const tarjetaMaria = new DebitCard("Visa", "2023-09-01", "666", "Débito María");
cuenta6.debitCards.push(tarjetaMaria);

clients[4].savingsBanks.push(cuenta6);
savingBanks.push(cuenta6);

const tarjetaCredito1 = new CreditCard("Visa", "2023-01-15", "123", "Visa Oro", "2023-02-10", "2025-01-15");
const tarjetaCredito2 = new CreditCard("MasterCard", "2022-05-20", "456", "Master Platinum", "2022-06-15", "2024-05-20");
const tarjetaCredito3 = new CreditCard("Amex", "2024-03-10", "789", "Amex Blue", "2024-04-05", "2026-03-10");
const tarjetaCredito4 = new CreditCard("Naranja", "2021-11-01", "321", "Naranja Clásica", "2021-12-01", "2023-11-01");
const tarjetaCredito5 = new CreditCard("Visa", "2023-07-30", "654", "Visa Crédito", "2023-08-20", "2025-07-30");
const tarjetaCredito6 = new CreditCard("Visa", "2023-07-30", "654", "Visa Crédito", "2023-08-20", "2025-07-30");

clients[0].creditCards.push(tarjetaCredito1); 
clients[1].creditCards.push(tarjetaCredito2); 
clients[2].creditCards.push(tarjetaCredito3); 
clients[3].creditCards.push(tarjetaCredito4); 
clients[4].creditCards.push(tarjetaCredito5); 
clients[0].creditCards.push(tarjetaCredito6); 

creditCards.push(tarjetaCredito1, tarjetaCredito2, tarjetaCredito3, tarjetaCredito4, tarjetaCredito5,tarjetaCredito6);

window.Client = Client;
window.clients = clients;

const movimiento1 = new Movement("COTO", 12000);
const movimiento2 = new Movement("COTO", 17000);
const movimiento3 = new Movement("Pollajería Jacinto", 8000);
const movimiento4 = new Movement("OnlyFans", 300000, 6);
const movimiento5 = new Movement("Aerolineas Argentinas", 400000, 3);
const movimiento6 = new Movement("Pedrito Kiosco", 1000);

clients[0].savingsBanks[0].push(movimiento1); 
clients[0].savingsBanks[0].push(movimiento2); 
clients[0].savingsBanks[1].push(movimiento3); 
clients[0].savingsBanks[1].push(movimiento4); 
clients[1].savingsBanks[0].push(movimiento5); 
clients[1].savingsBanks[0].push(movimiento6); 