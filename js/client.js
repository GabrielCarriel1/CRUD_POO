class Client {
    constructor(firstname='Consumidor', lastname='Final', ced='9999999999'){
        this.firstname = firstname
        this.lastname = lastname
        this._ced = ced
    }
    get ced(){
        return this._ced
    }
    set ced(value){
        var suma = 0
        for (var i = 0; i < 9; i++) {
            var digito = parseInt(value.charAt(i))
            suma += (i % 2 === 0) ? ((digito * 2) > 9 ? (digito * 2 - 9) : (digito * 2)) : digito
        }
        if (parseInt(value.charAt(9)) === (suma % 10)) {
            this._ced = value
        } else {
            this._ced = '9999999999'
        }
    }
    fullName(){
        return `${this.firstname} ${this.lastname}`
    }
}

class RegularClient extends Client{
    constructor(firstname='Cliente', lastname='Final', ced='9999999999', card=false){
        super(firstname, lastname, ced)
        this.card = card
        this._discount = this.card ? 0.10 : 0
    }

    get discount(){
        return this._discount
    }
}

class VipClient extends Client{
    constructor(firstname='Cliente', lastname='Final', ced='9999999999', limit=1000){
        super(firstname, lastname, ced)
        this.limit = limit
    }
}

export {RegularClient, VipClient}