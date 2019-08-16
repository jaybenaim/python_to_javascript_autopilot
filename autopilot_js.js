
var cars = []

const get_new_car = () => { 
    return { 
        'city': 'Toronto', 
        'passengers': 0, 
        'gas': 100,
    }
}
// console.log(get_new_car() )

const add_car = (cars, new_car) => { 
    cars.push(new_car); 
    return `Adding new car to fleet. Fleet size is now ${cars.length}`; 
}
// add_car(cars, 'beetle')
// console.log(add_car([], 'beetle'))
// console.log(cars)

const pick_up_passenger = (car) => { 
    car.passengers += 1; 
    car.gas -= 10; 
    return `Picked up passenger. Car now has ${car.passengers} passengers`
}

// console.log(pick_up_passenger('beetle'))


const get_destination = (car) => { 
    if (car.city == 'Toronto') { 
        return 'Mississauga'; 
    } else if (car.city == "Mississauga") { 
        return "London"; 
    } else if (car.city == "London") {  
        return "Toronto"; 
    }
}

const fill_up_gas = (car) => { 
    let old_gas = car.gas; 
    car.gas = 100; 
    let get_new_gas = get_gas_display(car.gas); 
    let get_old_gas = get_gas_display(old_gas)
  
    return `Filled up to ${get_new_gas} on gas from ${get_old_gas}`; 
}

const get_gas_display = (gas_amount) => { 
    return gas_amount + '%'
}
// console.log(get_gas_display(82))

const drive = (car, city_distance) => { 
    if (car.gas < city_distance) { 
        return fill_up_gas(car)
    } 
    
    car.city = get_destination(car); 
    car.gas -= city_distance; 

    return `Drove to ${car.city}. Remaining gas: ${get_gas_display(car.gas)}`
}

const drop_off_passengers = (car) => { 
    let previous_passengers = car.passengers; 
    car.passengers = 0; 
    return `Dropped off ${previous_passengers} passengers.`
}

const act = (car) => {
    let distance_between_cities = 50; 
    
    if (car.gas < 20) { 
        return fill_up_gas(car);
    } else if (car.passengers < 3) { 
        return pick_up_passenger(car); 
    } else { 
        if (car.gas < distance_between_cities) { 
            return fill_up_gas(car);
        }
        let drove_to = drive(car, distance_between_cities); 
        let passengers_dropped = drop_off_passengers(car); 
        return `${drove_to} ${passengers_dropped}`
    }
}

const command_fleet = (cars) => {
    let count = 1; 
    for (let i = 0; i < cars.length; i++) { 
        let action = act(cars[i]); 
        console.log(`Car ${count}, ${action}`); 
        count += 1 
    }
    console.log("---")
}


const add_one_car_per_day = (cars, num_days) => { 
    for (let i = 0; i < num_days;i++) { 
        new_car = get_new_car(); 
        console.log(add_car(cars, new_car)); 
        command_fleet(cars)
    }
}


add_one_car_per_day(cars, 10)


