'use strict;'
//Include crypto to generate the starship id
var crypto = require('crypto');

module.exports = function() {
    return {
        starshipList : [],
        /*
         * Save the starship inside the "db".
         */
        save(starship) {
            starship.id = crypto.randomBytes(20).toString('hex'); // fast enough for our purpose
            this.starshipList.push(starship);
            return 1;           
        },
        /*
         * Retrieve a starship with a given id or return all the starships if the id is undefined.
         */
        find(id) {
            if(id) {
                return this.starshipList.find(element => {
                        return element.id === id;
                    }); 
            }else {
                return this.starshipList;
            }
        },
        /*
         * Delete a starship with the given id.
         */
        remove(id) {
            var found = 0;
            this.starshipList = this.starshipList.filter(element => {
                    if(element.id === id) {
                        found = 1;
                    }else {
                        return element.id !== id;
                    }
                });
            return found;           
        },
        /*
         * Update a starship with the given id
         */
        update(id, starship) {
            var starshipIndex = this.starshipList.findIndex(element => {
                return element.id === id;
            });
            if(starshipIndex !== -1) {
                this.starshipList[starshipIndex].title = starship.title;
                this.starshipList[starshipIndex].year = starship.year;
                return 1;
            }else {
                return 0;
            }
        }       
    }
};  