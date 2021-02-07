class User {
    constructor(name = undefined, money = NaN) {
        this.name = name
        if (money > 0) {
            this.money = money
        }
    }

    takeMoney(money) {
        if (this.money >= money) {
            this.money = this.money - money
        }
        return money
    }

    putMoney(money) {
        this.money += money
    }

    play(money, machine) {
        this.takeMoney(money)
        let win = machine.play(money)
        this.putMoney(win)
        return win
    }
}

class Casino {

    constructor(name) {
        this.name = name
        this.machines = []
    }

    get getMoney() {
        // return this.machines.reduce((sum, item) => { return sum.getMoney + item.getMoney }) коли один елемент не працює коректно!
        let sum = 0
        for (let i = 0; i < this.machines.length; i++) {
            sum += this.machines[i].getMoney
        }
        return sum
    }

    get getMachineCount() {
        return this.machines.length
    }
}

class GameMachine {

    constructor(money) {
        this._money = money
    }

    get getMoney() {
        return this._money
    }

    takeMoney(number) {
        if (this._money >= number) {
            this._money -= number
        }
        return number
    }

    putMoney(number) {
        if (number >= 0) {
            this._money += number
        }
    }

    play(money) {
        this.putMoney(money)

        let combination = Math.floor(Math.random() * (999 - 100 + 1) + 100)
        let comb = combination.toString().split("")
        let sum = money

        if (comb[0] == comb[1] && comb[1] == comb[2]) {
            sum *= 3
        }

        else if (comb[0] != comb[1] && comb[1] != comb[2] && comb[0] != comb[2]) {
            sum = 0
        }

        else {
            sum *= 2
        }
        this.takeMoney(sum)

        return sum
    }
}

class SuperAdmin extends User {

    constructor(name, money) {
        super(name, money)
    }

    createCasino(name) {
        this.casino = new Casino(name)
    }

    putMoneyCasinoGM(numberOfMachine, number) {
        if (this.casino != null) {
            this.takeMoney(number)
            this.casino.machines[numberOfMachine].putMoney(number)
        }
    }

    addMachine(startValue) {
        if (this.casino != null) {
            let machine = new GameMachine(startValue)
            this.casino.machines.push(machine)
            this.takeMoney(startValue)
        }
    }

    deleteMachine(i) {
        if (this.casino.machines.length != 0 && i < this.casino.machines.length && i >= 0) {
            let cash = Math.floor((this.casino.machines[i].getMoney) / (this.casino.machines.length - 1))
            this.casino.machines.splice(i, 1)
            this.casino.machines.forEach(element => element.putMoney(cash))
        }
    }

    takeMoneyFromCasino(number) {
        if (number <= this.casino.getMoney) {
            let tempNum = number
            this.casino.machines.sort((a, b) => b.getMoney - a.getMoney)

            for (let i = 0; i < this.casino.machines.length; i++) {
                if (tempNum >= this.casino.machines[i].getMoney) {
                    tempNum = tempnum - this.casino.machines[i].getMoney
                    this.casino.machines[i].takeMoney(this.casino.machines[i].getMoney)
                }
                else {
                    this.casino.machines[i].takeMoney(tempNum)
                    break
                }
            }
            this.putMoney(number)
            return number
        }
    }

}


const admin = new SuperAdmin("Bodya", 1500)
const client = new User("Someone", 120)
admin.createCasino("777")
admin.addMachine(200)
admin.addMachine(150)
//створено адміна та клієнта(адмін має казино 777 та дві ігрові машини)