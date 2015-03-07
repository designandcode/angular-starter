app.service('sneakerService', function($_, $fuse){
  var t = this;
  // sneakerpedia.com (Powered by Foot Locker)
  this.sneakers = [
    {id: 1, name: 'Yeezy 750 x Kanye West', brand: 'Adidas', series: ['750']},
    {id: 2, name: 'Air Max 90', brand: 'Nike', series: ['Air Max', 'Air Max 90']},
    {id: 3, name: 'Nike Kyrie 1 "All-Star"', brand: 'Nike', series: ['Nike Kyrie 1', 'Nike Kyrie 1']},
    {id: 4, name: 'ZX Flux', brand: 'Adidas', series: ['ZX', 'ZX Flux']},
    {id: 5, name: 'Air Foamposite One', brand: 'Nike', series: ['Air Foamposite', 'Air Foamposite One']},
    {id: 6, name: 'AIR JORDAN 4 RETRO LS', brand: 'Jordan', series: ['Air Jordan', 'Air Jordan 4', 'Air Jordan Retro']},
    {id: 7, name: 'Air Jordan 1 Retro Low OG "Bred"', brand: 'Jordan', series: ['Air Jordan', 'Air Jordan 1', 'Air Jordan 1 Low', 'Air Jordan Retro', 'Air Jordan OG']},
    {id: 8, name: 'Air Jordan 4 Retro "Oreo"', brand: 'Jordan', series: ['']},
    {id: 9, name: 'Kobe 9 High EXT QT', brand: 'Nike', series: ['Kobe 9']},
    {id: 10, name: 'Air Jordan 20 "Laser"', brand: 'Jordan', series: ['Air Jordan', 'Air Jordan 20', 'Air Jordan Laser']},
    {id: 11, name: 'Air Jordan 10 Retro "Lady Liberty"', brand: 'Jordan', series: ['Air Jordan', 'Air Jordan 10', 'Air Jordan Retro']},
    {id: 12, name: '4 retro "Oreo"', brand: 'Air Jordan', series: ['Air Jordan', 'Air Jordan 4', 'Air Jordan Retro', 'Air Jordan Oreo']},
    {id: 13, name: 'BREAKPOINT OX "SOLEBOX"', brand: 'Converse', series: ['']},
    {id: 14, name: 'GEL LYTE V "TAILOR PACK"', brand: 'Asics', series: ['Asics Gel Lyte', 'Asics Gel Lyte V']}
  ]
  this.getSneakers = function(){
    return t.sneakers;
  }
  this.getSneaker = function(id){
    var sneakers = t.getSneakers();
    for(var i=0; i<sneakers.length; i++){
      if(sneakers[i].id == id){
        t.sneaker = sneakers[i];
        return t.sneaker;
      }
    }
  }
  this.findSneakers = function(phrase){
    var sneakers = t.getSneakers();
    var sneakersCount = sneakers.length;
    var phrase = phrase.split(" ");
    var matchAgainstCount = phrase.length;
    var matches = [];
    for(var i=0; i<sneakersCount; i++){
      sneakers[i]['match'] = true;
      for(var j=0; j<matchAgainstCount; j++){
        if(!JSON.stringify(sneakers[i]).toLowerCase().match(phrase[j].toLowerCase().replace(/s$/,""))){
          sneakers[i]['match'] = false;
        }
      }
    }
    var matches = $_.where(sneakers, {'match': true});
    return matches;
  }
});
