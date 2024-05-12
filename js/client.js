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

    getJson(){
        return {"cedula": this.ced, "nombre": this.firstname, "apellido": this.lastname, "valor": this.discount}
    }
}

class VipClient extends Client{
    constructor(firstname='Cliente', lastname='Final', ced='9999999999'){
        super(firstname, lastname, ced)
        this._limit = 1000
    }

    get limit(){
        return this._limit
    }

    set limit(value){
        this._limit = (value < 1000 || value > 2000) ? 1000 : value
    }

    getJson(){
        return {"cedula": this.ced, "nombre": this.firstname, "apellido": this.lastname, "valor": this.limit}
    }
}

export {RegularClient, VipClient}