module.exports={

    FindMax:function(array){
        const max = array.reduce(function (prev, current) {
            if (+current.id > +prev.id) {
              return current;
            } else {
              return prev;
            }
          });
          let value = max.id + 1;
          return value
    },
    filterArray:function(Array,id){

        let filtered = Array.filter(function (el) {
            return el.id === id;
        });
        return filtered[0];
    }


}